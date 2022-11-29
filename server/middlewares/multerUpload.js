import multer from "multer";
import path from "path";

//! multer us to store temporary file/folder on user machine. here we use for uploading images
// first, image is stored in local temp folder, then the file object is passed to next function, then original name etc is extracted

const multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    //* ext from nodejs
    let extension = path.extname(file.originalname);
    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      cb(new Error("file type not permitted"), false);
      return;
    }
    cb(null, true);
  },
});

export default multerUpload;
