
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UploadedFile } from "express-fileupload";
import product from "../model/product";
import { checkValidation } from "../utils/checkValidation";
import path from "path";


export async function addProduct( req: Request, res: Response ) {
    const result = await product.create( req.body );

    try {
        
        res.status( StatusCodes.CREATED ).json({ data: result, status: "SUCCESS"});

    } catch( error ) {

        console.log(error);
        res.status( StatusCodes.INTERNAL_SERVER_ERROR ).json({ status: "FIALD", error });
    }

}

export async function getAllProducts(req: Request, res: Response ) {

    const result = await product.find({});

    try {
        res.status( StatusCodes.OK ).json({ data: result, status: "SUCCESS"});

    } catch ( error ) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: "FAILD", error });
    }
}

export async function updateProduct( req: Request, res: Response ) {
    const { _id } = req.params;
    const singleProduct = await product.findOneAndUpdate({ _id }, req.body);

    try {
        res.status( StatusCodes.OK ).json({ data: singleProduct, status: "SUCCESS" });

    } catch ( error ) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: "FAILD", error});
    }
}

export async function uploadImage( req: Request, res: Response ) {
    
    if(!req.files) {
        
        res.status( StatusCodes.BAD_REQUEST ).json({ error: "images field is required" ,status: "FAILD" });
        return;
    }

    let imgs = req.files.imgs as UploadedFile[];

    if( !Array.isArray(imgs) ) {
        imgs = [imgs];
    }

    // check validation
    const isVlalid = checkValidation( imgs );
    if ( !isVlalid[0] ) {
        
        res.status( StatusCodes.BAD_REQUEST )
           .json({ errors: isVlalid[1], status: "FAILD"});
        return;
    }
     
    let paths = [];
    for(const img of imgs) {

        const imagePath = path.join(
            __dirname, 
            `../public/upload/img/${img.name}`
        );

        paths.push(`/upload/img/${ img.name }`);
        await img.mv(imagePath);
    }

    res.status( StatusCodes.OK )
       .json({ images_urls: paths , status: "SUCCESS" });
}

export async function destroyProduct(req: Request, res: Response ) {
    const { _id } = req.params;
    const result = await product.findOneAndDelete({ _id });

    try {

        res.status( StatusCodes.OK ).json({ data: result, status: "SUCCESS"});
    } catch (error) {
        
        res.status( StatusCodes.INTERNAL_SERVER_ERROR ).json({ status: "FAILD", error});
    }

}

export async function getSingleProduct(req: Request, res: Response ) {

    const { _id } = req.params;
    const result = await product.findById(_id);

    try {
        res.status(StatusCodes.OK).json({ data: result, status: "SUCCESS" });

    }catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: "FAILD",  error});

    }

}