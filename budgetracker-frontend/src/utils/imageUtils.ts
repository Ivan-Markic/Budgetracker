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

export function createBase64Image(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = event.target ? (event.target.result as string) : "";
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

export async function convertImageUrlToBase64(
  imageUrl: string
): Promise<string> {
  const response = await new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64StringWithoutPrefix = base64String.substring(
          base64String.indexOf(",") + 1
        );
        resolve(base64StringWithoutPrefix);
      };
      reader.onerror = reject;
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = reject;
    xhr.open("GET", imageUrl);
    xhr.send();
  });
  return response;
}
