/**
 * Helper Transformasi URL Gambar untuk Cloudinary & next/image
 */

interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: "auto" | number;
  crop?: "fill" | "limit" | "scale" | "thumb";
  format?: "auto" | "webp" | "avif" | "jpg";
}

/**
 * Mengubah URL Cloudinary mentah menjadi URL dengan transformasi optimal
 */
export function getOptimizedImageUrl(
  url: string,
  options: CloudinaryTransformOptions = {}
): string {
  if (!url) return "/logo.webp";

  // Jika bukan Cloudinary, kembalikan URL apa adanya
  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  const {
    width,
    height,
    quality = "auto",
    crop = "fill",
    format = "auto",
  } = options;

  const transforms: string[] = [`f_${format}`, `q_${quality}`];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop && (width || height)) transforms.push(`c_${crop}`);

  const transformString = transforms.join(",");

  // Cari posisi '/upload/' pada URL Cloudinary
  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return url;

  const beforeUpload = url.slice(0, uploadIndex + 8);
  const afterUpload = url.slice(uploadIndex + 8);

  // Hindari duplikasi jika sudah ada parameter transformasi
  if (afterUpload.startsWith("f_") || afterUpload.startsWith("q_") || afterUpload.startsWith("w_")) {
    return url;
  }

  return `${beforeUpload}${transformString}/${afterUpload}`;
}

/**
 * Base64 blur placeholder untuk efek blur-up yang mulus
 */
export const SHIMMER_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAgMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWExYSIvPjwvc3ZnPg==";
