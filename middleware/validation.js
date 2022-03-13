const fs = require("fs");

module.exports = (req, res, next) => {
  // Save category name and image
  //valid req.body or req.file not get undefined

  if(typeof(req.file) === "undefined" || typeof(req.body) === "undefined")
  {
    // if error
    return res.status(400).json({
      error: "Problem sending data"
    })
  }


  // get image and name
  console.log(req.file)
  let name = req.body.name;
  let image = req.file.path;

  // only accept png || jpg || jpeg
  if(!(req.file.mimetype).includes("png") && !(req.file.mimetype).includes("jpg") && !(req.file.mimetype).includes("jpeg")) {
    // remove file
    fs.unlinkSync(image)
    return res.status(400).json({
      error: "file not supported"
    })
  }

  // check file size. 2MB max
  if(req.file.size > (1024 * 1024) * 2){
    fs.unlinkSync(image);
    return res.status(400).json({
      error: "File is too large"
    })
  }

  // check if fields is empty
  if(!name || !image){
    return res.status(400).json({
      error: "all fields are required"
    })
  }

  next()

}