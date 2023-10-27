export function arrayBufferToBase64(arrayBuffer: ArrayBuffer | null) {
  if (!arrayBuffer) {
    return "";
  }
  let binary = "";
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}
