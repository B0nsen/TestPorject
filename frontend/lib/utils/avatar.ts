export const createAvatarPreview = (file: File): string => {
  return URL.createObjectURL(file);
};

export const revokeAvatarPreview = (url: string | null) => {
  if (url) URL.revokeObjectURL(url);
};