import * as Yup from "yup";

export const imageDescriptionSchema = Yup.string().required(
  "A description of the image is required!"
);

export const imageSchema = Yup.mixed<File>()
  .test("fileSize", "File size is too large", (value) => {
    if (!value) return true; // Skip validation if no file is selected
    return value.size <= 10000000; // 5MB limit
  })
  .test("fileType", "Unsupported file format", (value) => {
    if (!value) return true; // Skip validation if no file is selected
    return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
  });
