import { useState } from "react";

export const useUploadImage = ({ formData, setFormData }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const [coverImageFile, setCoverImage] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validateType = ["image/png", "image/jpeg", "image/jpg"];

    if (!validateType.includes(file.type)) {
      setUploadError("Only, PNG, JPEG, JPG are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File must be under 5MB");
      return;
    }

    setUploadError(null);
    setCoverImage(file);

    const previewUrl = URL.createObjectURL(file);
    setFormData({ ...formData, coverImageUrl: previewUrl });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange({ target: { files: [file] } });
    }
  };

  return {
    isDragActive,
    uploading,
    uploadError,
    coverImageFile,
    handleFileChange,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
};
