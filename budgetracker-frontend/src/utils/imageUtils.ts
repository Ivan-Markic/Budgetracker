// Function to convert a Base64 string to a Uint8Array
function base64ToUint8Array(base64: string) {
  const binaryString = atob(base64);
  const uint8Array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  return uint8Array;
}

export function createimageUrl(profilePictureData: string): string {
  // Assume profilePictureData contains the Base64-encoded byte array
  const profilePictureArray = base64ToUint8Array(profilePictureData);

  // Create a blob from the byte array
  const blob = new Blob([profilePictureArray], { type: "image/png" });

  // Create an Object URL from the blob
  return URL.createObjectURL(blob);
}
