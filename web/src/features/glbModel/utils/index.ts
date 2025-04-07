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

export const loadGlbFileFromPath = async (
  name: string,
  path: string
) => {
  const res = await fetch(path);

  const blob = await res.blob();
  const file = new File([blob], name, {
    type: blob.type,
  });

  return file;
};
