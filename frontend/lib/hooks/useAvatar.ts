import { useEffect, useRef, useState } from "react";
import { createAvatarPreview, revokeAvatarPreview } from "@/lib/utils/avatar";

export function useAvatar() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);

    const url = createAvatarPreview(selected);
    setPreview(url);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      revokeAvatarPreview(preview);
    };
  }, [preview]);

  return {
    file,
    preview,
    fileInputRef,
    onFileChange,
    openFilePicker,
  };
}