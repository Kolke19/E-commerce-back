const multer = require('multer');

//storage
// const multerStorage = multer.diskStorage({
//     destination: (req, file , cb )=>{
//         cb(null,'public/img/users');
//     },
//     filename: (req, file , cb )=>{
//         const  ext =  file.mimetype.split('/')[1];
//         cb(null ,`user-${req.user._id}-${Date.now()}.${ext}`);
//     }
// });
const multerStorage = multer.memoryStorage();

//filter
const multerFilter  = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb('Error',False)
    }
}

const  upload = multer ({
    storage: multerStorage,
    fileFilter: multerFilter    
});

exports.uploadUserPhoto= upload.single('photo');

//varios campo de fotos
exports.uploadProductImages = upload.fields([
    { name: 'imageCover' , maxCount: 1},
    { name: 'images', maxCount: 3}
])

// un solo campo de fotos
// upload.array('images',3)

