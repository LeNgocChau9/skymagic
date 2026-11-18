export function readAndResizeImageFile(
  file: File,
  options: { maxWidth: number; maxHeight: number; preserveTransparency?: boolean }
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Không thể đọc tệp hình ảnh.'));
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        reject(new Error('Dữ liệu hình ảnh không hợp lệ.'));
        return;
      }

      const img = new Image();
      img.onerror = () => reject(new Error('Tệp không phải là định dạng ảnh hợp lệ.'));
      img.onload = () => {
        const ratio = Math.min(
          options.maxWidth / img.width,
          options.maxHeight / img.height,
          1
        );
        const width = Math.max(1, Math.round(img.width * ratio));
        const height = Math.max(1, Math.round(img.height * ratio));

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(result);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const mimeType = options.preserveTransparency ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, options.preserveTransparency ? undefined : 0.88);
        resolve(dataUrl);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  });
}
