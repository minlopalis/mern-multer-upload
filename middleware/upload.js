const multer = require("multer");
const path = require("path");

// set storage => file name and destination
const storage = multer.diskStorage({
  // first our destination uploads 
  destination: function(req, res, cb) {
    cb(null,  "./uploads")
  },
  filename: function (req, file, cb) {
    console.log(file)
    // generate a unique name for each image
    cb(null, `img-${Date.now()}${path.extname(file.originalname)}`)
  }
})

// file filter
const fileFilter = (req, file, cb) => {
  cb(null, true)
}

let upload = multer({
  storage: storage,
  fileFilter: fileFilter
});


// export upload as single file
module.exports = upload.single(`categoryImage`) // This (categoryImage) is the KEY name to use!!