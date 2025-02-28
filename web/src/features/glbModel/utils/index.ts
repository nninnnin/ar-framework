export const isGLBFile = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const bytes = new Uint8Array(
        event.target?.result as ArrayBuffer
      );
      const signature = new TextDecoder().decode(
        bytes.slice(0, 4)
      );

      resolve(signature === "glTF");
    };

    reader.readAsArrayBuffer(file.slice(0, 4));
  });
};
