export interface ImageUploadRequest {
  file: File;
  fileName: string;
  fileDescription: string;
}

export interface ImageUpdateRequest {
  productId: string;
  imageId: string;
  file?: File;
  fileName: string;
  fileDescription: string;
}
