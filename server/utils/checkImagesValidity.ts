import { UploadedFile } from "express-fileupload";

export function checkImagesValidity(imgs: UploadedFile[]) {
    const maxSize = 1024 * 1024 * 4; // 4MB
    const errors: Errors = {
        type_error: [],
        size_error: []
    };

    imgs.forEach(img => {

        // check file type
        if( img.mimetype.startsWith("image/jpeg") || img.mimetype.startsWith("image/png") ) {
            // Do Nothing
        } else {
            errors.type_error.push( img.name );
        }

        // check file size
        if( img.size > maxSize ) {
            errors.size_error.push(img.name);
        }
    });


   if(errors.size_error.length || errors.type_error.length) {
       return [false, errors];
   }

   return [true];
}


interface Errors {
    type_error: Array<string>
    size_error: Array<string>
}