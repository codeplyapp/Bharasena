"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface UploadDropzoneProps {
  onSuccess?: (photo: unknown) => void;
  defaultDay?: number;
}

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function UploadDropzone({
  onSuccess,
  defaultDay = 1,
}: UploadDropzoneProps) {
  const [selectedDay, setSelectedDay] = useState<number>(defaultDay);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (selectedFile: File) => {
    setError(null);
    setSuccessMsg(null);

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError("Format file tidak didukung. Harap pilih file JPG, PNG, atau WEBP.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Ukuran file melebihi batas maksimal ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setError(null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Silakan pilih file foto terlebih dahulu.");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("day", String(selectedDay));
      formData.append("caption", caption);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal mengunggah foto.");
      }

      setSuccessMsg("Foto berhasil diunggah ke Cloudinary & tersimpan!");
      clearFile();
      setCaption("");

      if (onSuccess) {
        onSuccess(data.photo);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan saat upload.";
      setError(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="p-6 rounded-3xl bg-charcoal-800/90 border border-stone-800 space-y-6 shadow-xl"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h3 className="font-display text-lg font-bold text-stone-100">
            Unggah Foto Dokumentasi Baru
          </h3>
          <p className="text-xs text-stone-400">
            Maks. 10MB per foto (JPG, PNG, atau WEBP)
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex items-center gap-1.5 bg-charcoal-900 p-1 rounded-xl border border-stone-800">
          {[1, 2, 3].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setSelectedDay(d)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedDay === d
                  ? "bg-crimson-600 text-white"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Day {d}
            </button>
          ))}
        </div>
      </div>

      {/* Dropzone Area */}
      {!previewUrl ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            isDragOver
              ? "border-gold-400 bg-gold-400/5"
              : "border-stone-700 bg-charcoal-850/60 hover:border-gold-400/50 hover:bg-charcoal-850"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-charcoal-800 flex items-center justify-center text-gold-400 mb-3 border border-stone-700">
            <Upload className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-stone-200">
            Tarik & lepas foto di sini, atau klik untuk memilih
          </p>
          <p className="text-xs text-stone-500 mt-1">
            Format file: JPG, PNG, WEBP (Maksimal 10MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative aspect-video max-h-72 w-full rounded-2xl overflow-hidden bg-charcoal-900 border border-stone-700 flex items-center justify-center">
          <Image
            src={previewUrl}
            alt="Preview Foto"
            fill
            className="object-contain"
          />
          <button
            type="button"
            onClick={clearFile}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-charcoal-900/80 text-stone-300 hover:text-crimson-400 hover:bg-charcoal-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Caption Input */}
      <div className="space-y-1.5">
        <label
          htmlFor="caption"
          className="text-xs font-semibold text-stone-300 uppercase tracking-wider block"
        >
          Keterangan / Caption Foto
        </label>
        <input
          id="caption"
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Contoh: Sambutan Kepala Sekolah pada Pembukaan Day 1"
          className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-stone-700 text-stone-100 text-sm placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-gold-400"
        />
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-crimson-600/15 border border-crimson-500/30 text-crimson-400 text-xs font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-600/15 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="gold"
        disabled={!file || uploading}
        className="w-full justify-center"
      >
        {uploading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            <span>Mengunggah ke Cloudinary...</span>
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            <span>Unggah Foto ke Day {selectedDay}</span>
          </>
        )}
      </Button>
    </form>
  );
}
