const fs = require("fs");

const normalizeError = (err) => {
  if (err && (err.code === "EISDIR" || err.code === "UNKNOWN" || err.code === "EPERM")) {
    err.code = "EINVAL";
  }
  return err;
};

const origReadlinkSync = fs.readlinkSync;
fs.readlinkSync = function (...args) {
  try {
    return origReadlinkSync.apply(this, args);
  } catch (err) {
    throw normalizeError(err);
  }
};

const origReadlink = fs.readlink;
fs.readlink = function (...args) {
  const cb = args[args.length - 1];
  if (typeof cb === "function") {
    const wrappedCb = (err, ...res) => {
      cb(normalizeError(err), ...res);
    };
    args[args.length - 1] = wrappedCb;
  }
  return origReadlink.apply(this, args);
};

if (fs.promises && fs.promises.readlink) {
  const origPromisesReadlink = fs.promises.readlink;
  fs.promises.readlink = async function (...args) {
    try {
      return await origPromisesReadlink.apply(this, args);
    } catch (err) {
      throw normalizeError(err);
    }
  };
}

if (fs.realpathSync && fs.realpathSync.native) {
  // ensure realpath works smoothly
}
