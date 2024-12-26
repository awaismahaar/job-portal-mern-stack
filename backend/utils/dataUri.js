const path = require("path");
const DatauriParser = require("datauri/parser");

function getDataUri(file){
    const parser = new DatauriParser();
    // Convert file buffer to a Data URI
    const extname = path.extname(file.originalname).toString();
    return parser.format(extname,file.buffer);
}
module.exports = getDataUri;