const multer  = require('multer')
const storage = multer.memoryStorage();

singleUpload = multer({storage}).single('file');
module.exports = singleUpload;