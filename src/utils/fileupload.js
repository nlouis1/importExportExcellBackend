import multer from 'multer'
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../work/src/documentfiles/');
     },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  });
const upload = multer({ storage: storage });
module.exports= upload;