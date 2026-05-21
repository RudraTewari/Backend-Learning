import multer from "multer"

//Find from github/expressjs/multer

// Configure storage settings
// diskStorage means files are temporarily stored on server disk
const storage = multer.diskStorage({

    // destination determines where uploaded files will be stored
    destination: function (req, file, cb) {

        // cb = callback function
        // first argument -> error (null means no error)
        // second argument -> folder path where file will be saved
        cb(null, "./public/temp")
    },
    // filename determines what name file will be saved as
    filename: function (req, file, cb) {
        /*
        Improvement:
        Do NOT use original filename directly.

        Reason:
        1. Prevent duplicate file overwrite
        2. Avoid weird filenames with spaces/special chars
        3. Better uniqueness
        

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);

        // Extract extension (.png, .jpg)
        const ext = path.extname(file.originalname);

        // Example: 171223344-avatar.png
        cb(null, uniqueSuffix + ext);
        */

        cb(null, file.originalname)
    }
})

// Create multer middleware using above storage config
export const upload = multer({ storage: storage })