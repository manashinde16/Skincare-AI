// TypeScript types for the submission function
export interface FormSubmissionResponse {
  ok: boolean;
  result: unknown;
}

export interface FormSubmissionError extends Error {
  status?: number;
  details?: string;
}

// Helper function to convert base64/dataURL to File object
export function dataURLToFile(dataURL: string, filename: string): File {
  // Split the data URL to get the base64 data and mime type
  const arr = dataURL.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

// Main submission function
export async function submitAnalysisForm(
  formValues: Record<string, unknown>,
  leftFile: File | string | null,
  frontFile: File | string | null,
  rightFile: File | string | null
): Promise<FormSubmissionResponse> {
  try {
    const formData = new FormData();

    // Append all text fields exactly as they are
    Object.keys(formValues).forEach((key) => {
      const value = formValues[key];

      // Handle arrays (like concerns)
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      }
      // Handle boolean values
      else if (typeof value === "boolean") {
        formData.append(key, value.toString());
      }
      // Handle null values
      else if (value === null) {
        formData.append(key, "");
      }
      // Handle regular string/number values
      else if (value !== undefined && value !== "") {
        formData.append(key, value.toString());
      }
    });

    // Convert and append images as File objects
    const imageFiles: (File | null)[] = [];

    // Process left image
    if (leftFile) {
      if (typeof leftFile === "string") {
        imageFiles.push(dataURLToFile(leftFile, "left-face.jpg"));
      } else {
        imageFiles.push(leftFile);
      }
    } else {
      imageFiles.push(null);
    }

    // Process front image
    if (frontFile) {
      if (typeof frontFile === "string") {
        imageFiles.push(dataURLToFile(frontFile, "front-face.jpg"));
      } else {
        imageFiles.push(frontFile);
      }
    } else {
      imageFiles.push(null);
    }

    // Process right image
    if (rightFile) {
      if (typeof rightFile === "string") {
        imageFiles.push(dataURLToFile(rightFile, "right-face.jpg"));
      } else {
        imageFiles.push(rightFile);
      }
    } else {
      imageFiles.push(null);
    }

    // Append all images to the same field name "images"
    imageFiles.forEach((file) => {
      if (file) {
        formData.append("images", file);
      }
    });

    // Make the request to the backend
    const response = await fetch("http://localhost:3000/api/generate", {
      method: "POST",
      body: formData,
      // Important: Do NOT set Content-Type header - let browser set multipart boundary
    });

    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(
        `HTTP ${response.status}: ${response.statusText}`
      ) as FormSubmissionError;
      error.status = response.status;
      error.details = errorText;
      throw error;
    }

    const jsonResponse = await response.json();

    // Validate response structure
    if (typeof jsonResponse.ok !== "boolean") {
      throw new Error("Invalid response format from server");
    }

    return jsonResponse as FormSubmissionResponse;
  } catch (error) {
    console.error("Form submission error:", error);

    if (error instanceof Error) {
      const submissionError = error as FormSubmissionError;
      throw submissionError;
    } else {
      throw new Error("Unknown error occurred during form submission");
    }
  }
}
