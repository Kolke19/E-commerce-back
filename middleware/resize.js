const sharp = require ('sharp');

exports.resizeUserPhoto = async (req , res, next) =>{
try
{
  if(!req.file) return next();
  req.file.filename =  `user-${req.user._id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
  .resize(500,500)
  .toFormat('jpeg')
  .jpeg({quality:90})
  .toFile(`public/img/users/${req.file.filename}`);
  next();
}catch (error)
{
console.log(error)
}
};


exports.resizeProductsPhotos = async (req, res, next) =>{
if(!req.files.imagesCover && !req.files.images)return next();
req.body.imageCover = `product-${Date.now()}-cover.jpeg`;
await sharp(req.files.imageCover[0].buffer)
.resize(2000,1333)
.toFormat('jpeg')
.jpeg({ quality:90})
.toFile(`public/img/products/${req.body.imageCover}`);
req.body.images=[]
await Promise.all( req.files.images.map(async (file,index)=>{
  const filename = `product-${Date.now()}-${index + 1}.jpeg`;
  await sharp(file.buffer)
.resize(2000,1333)
.toFormat('jpeg')
.jpeg({ quality:90})
.toFile(`public/img/products/${filename}`)
req.body.images.push(filename);
}));
next();
}