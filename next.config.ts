import type { NextConfig } from "next";
import fs from "fs";

// Fix for Windows exFAT/FAT32 drives where libuv returns EISDIR instead of EINVAL on non-symlinks
const normalizeReadlinkError = (err: any) => {
  if (err && (err.code === "EISDIR" || err.code === "UNKNOWN" || err.code === "EPERM")) {
    err.code = "EINVAL";
  }
  return err;
};

const origReadlinkSync = fs.readlinkSync;
fs.readlinkSync = function (this: any, ...args: any[]) {
  try {
    return origReadlinkSync.apply(this, args as any);
  } catch (err: any) {
    throw normalizeReadlinkError(err);
  }
} as any;

const origReadlink = fs.readlink;
fs.readlink = function (this: any, ...args: any[]) {
  const cb = args[args.length - 1];
  if (typeof cb === "function") {
    const wrappedCb = (err: any, ...res: any[]) => {
      cb(normalizeReadlinkError(err), ...res);
    };
    args[args.length - 1] = wrappedCb;
  }
  return origReadlink.apply(this, args as any);
} as any;

if (fs.promises && fs.promises.readlink) {
  const origPromisesReadlink = fs.promises.readlink;
  fs.promises.readlink = async function (this: any, ...args: any[]) {
    try {
      return await origPromisesReadlink.apply(this, args as any);
    } catch (err: any) {
      throw normalizeReadlinkError(err);
    }
  } as any;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config) => {
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
