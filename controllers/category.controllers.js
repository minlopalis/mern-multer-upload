const Category = require("../models/category.model")

exports.createCategory = (req, res) => {
  let name = req.body.name;
  let image = req.file.path;

  const category = new Category({
    name: name,
    image: image
  })

  category.save((err, category) => {
    if(err){
      return res.status(400).json({
        error: err.message
      })
    }
  })

  return res.json({
    message: "successfully added image to database",
    category
  })
}