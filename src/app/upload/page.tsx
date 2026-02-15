"use client";

import { useState, useCallback } from "react";

const CLOUD_NAME = "dfv2us40f";
const UPLOAD_PRESET = "acmjl-preset";

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const uploadToCloudinary = async (file: File) => {
    setUploading(true);
    setError(null);
    setImageUrl(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || "Erreur d'upload");
      }

      const data = await response.json();
      setImageUrl(data.secure_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur d'upload");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      uploadToCloudinary(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadToCloudinary(file);
    }
  };

  const copyToClipboard = () => {
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F5F0] p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Upload Image</h1>
        <p className="text-[#F5F5F0]/60 mb-8">
          Uploadez une image et copiez l'URL pour Sveltia CMS
        </p>

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragOver
              ? "border-[#E11D48] bg-[#E11D48]/10"
              : "border-[#F5F5F0]/20 hover:border-[#F5F5F0]/40"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-[#E11D48] border-t-transparent rounded-full animate-spin" />
              <p>Upload en cours...</p>
            </div>
          ) : (
            <>
              <p className="mb-4">Glissez une image ici</p>
              <p className="text-[#F5F5F0]/40 mb-4">ou</p>
              <label className="inline-block px-6 py-2 bg-[#E11D48] rounded cursor-pointer hover:bg-[#E11D48]/80 transition-colors">
                Choisir un fichier
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded text-red-400">
            {error}
          </div>
        )}

        {/* Result */}
        {imageUrl && (
          <div className="mt-8">
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-full max-h-64 object-contain rounded mb-4"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrl}
                readOnly
                className="flex-1 px-4 py-2 bg-[#1a1a1a] border border-[#F5F5F0]/20 rounded text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-[#E11D48] rounded hover:bg-[#E11D48]/80 transition-colors"
              >
                Copier
              </button>
            </div>
            <p className="mt-2 text-[#F5F5F0]/40 text-sm">
              Collez cette URL dans le champ image de Sveltia CMS
            </p>
          </div>
        )}

        {/* Back link */}
        <a
          href="/admin"
          className="inline-block mt-8 text-[#E11D48] hover:underline"
        >
          ← Retour à l'admin
        </a>
      </div>
    </div>
  );
}
