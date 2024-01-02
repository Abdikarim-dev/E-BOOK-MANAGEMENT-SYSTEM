import fs from 'fs';

function deleteFile(file,folder){
    try {
        fs.unlinkSync(".//..//uploads//"+folder+"//"+file);
        console.log('File successfully deleted');
    } catch (err) {
        console.error('Error occurred while trying to delete file:', err);
    }
}
export default deleteFile;