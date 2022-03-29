import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UploadedFile } from "express-fileupload";
import product, { ProductSchema } from "../model/product.model";
import { checkImagesValidity } from "../utils/checkImagesValidity";
import path from "path";
import { BadRequestError, NotFoundError } from "../errors";


export async function addProduct( req: Request, res: Response ) {
    const result = await product.create( req.body );
    res.status( StatusCodes.CREATED ).json({ data: result, status: "SUCCESS"});

}

export async function getAllProducts( req: Request, res: Response ) {
    const result = await product.find({});
    res.status( StatusCodes.OK ).json({ data: result, status: "SUCCESS" });

}

export async function updateProduct( req: Request, res: Response ) {
    const { _id } = req.params;
    const keys = Object.keys(req.body);


    if(!Object.keys(req.body).length) {
        throw new BadRequestError("No data received");
    }

    for(const key of keys) {
        if(!ProductSchema.hasOwnProperty(key)) 
            throw new BadRequestError("Invalid field: " + key);
    }

    const singleProduct = await product.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true
    });

    if( !singleProduct ) {
        throw new NotFoundError("Product is not found");
    }

    res.status( StatusCodes.OK ).json({ status: "SUCCESS" });
}

export async function destroyProduct(req: Request, res: Response ) {
    const { _id } = req.params;

    const deletedProduct = await product.findOneAndDelete({ _id });
    
    
    if(!deletedProduct) {
        throw new NotFoundError("The Product you are trying to delete is not found");
    }

    res.status( StatusCodes.OK ).json({ status: "SUCCESS" });

}

export async function getSingleProduct( req: Request, res: Response ) {

    const { _id } = req.params;

    const singleProduct = await product.findOne({ _id });
    
    if(!singleProduct) {
        throw new NotFoundError("Product is not found");
    }

    res.status(StatusCodes.OK).json({ data: singleProduct, status: "SUCCESS" });

}

export async function uploadImage( req: Request, res: Response ) {
    
    if(!req.files) {
        throw new BadRequestError("Please provide a product image(s)");
    }

    let imgs = req.files.imgs as UploadedFile[];

    if( !Array.isArray(imgs) ) {
        imgs = [imgs];
    }

    // check validation
    const isVlalid = checkImagesValidity( imgs );
    if ( !isVlalid[0] ) {
        
        throw new BadRequestError(JSON.stringify(isVlalid[1]));
    }
     
    let paths = [];
    for(const img of imgs) {

        const imagePath = path.join(
            __dirname, 
            `../public/upload/img/${img.name}`
        );

        const url = encodeURI(`/upload/img/${ img.name }`)
        paths.push(url);
        
        await img.mv(imagePath);
    }

    res.status( StatusCodes.OK )
       .json({ images_urls: paths , status: "SUCCESS" });
}