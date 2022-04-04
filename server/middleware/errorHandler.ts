import { Request, Response, NextFunction } from "express";
import CustomAPIError from "../errors/custom-error";
import { StatusCodes } from "http-status-codes";

/** State Error */
function errorHandlerMiddleware(
    err: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
) {

    /** State Error */
    const customError = {
        error: {
            message: err.message || "Somthing went wrong",
            status: "FAILD"
        },
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }


    /** Custom Errors */
    if( err instanceof CustomAPIError ) {
        customError.error.message = err.message;
        customError.statusCode = err.statusCode;
    }

    /** Catch Mongoose Errors */
    if( err.name === "CastError" ) {
        customError.error.message = `Invalid ${ err.path }: ${ err.value }`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    if( err.errors ){
        const key = Object.keys(err.errors)[0];
        const errorAPI = err.errors[key];
        
        // set the cutomError
        customError.error.message = `Invalid ${ errorAPI.path }: ${ errorAPI.value }`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    if( err.type === "entity.parse.failed" ) {
        customError.error.message = "Invalid JSON is Received";
        customError.statusCode = StatusCodes.BAD_REQUEST;

    }

    return res.status(customError.statusCode).json(customError.error);
}

export default errorHandlerMiddleware;