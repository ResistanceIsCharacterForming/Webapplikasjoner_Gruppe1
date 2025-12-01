
import * as z from "zod"


const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

export const validateImgFile = z
  .instanceof(File, { error: "not valid file" })
  .refine(
    (file) => acceptedFileTypes.includes(file.type),
    { error: "not valid file type expect jpeg , jpg or png" }
  );