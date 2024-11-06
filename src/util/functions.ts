export const sizeConverter = (bytes: number | undefined) => {
  if (!bytes) return "";

  if (bytes / Math.pow(1024, 1) >= 1024)
    return `${(bytes / Math.pow(1024, 2)).toFixed(2)} MB`;
  else return `${(bytes / Math.pow(1024, 1)).toFixed(2)} KB`;
};
