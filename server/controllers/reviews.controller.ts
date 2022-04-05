import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import reviews from "../model/reviews.model";


export async function addReview(req: Request, res: Response) {
    await reviews.create(req.body);
    res.status(StatusCodes.CREATED).json({ status: "SUCCESS" });
}

export async function getAllReviews(req: Request, res: Response) {
    const { product_id } = req.body;

    if (!product_id) {
        throw new BadRequestError("Product id is required")
    }

    const doc = await reviews.find({ product_id });

    res.status(StatusCodes.OK).json({ data: doc, status: "SUCCESS" });
}

export async function getSingleReview(req: Request, res: Response) {
    const { product_id } = req.params;
    const { user_id } = req.body;
    const doc = await reviews.findOne({ user_id, product_id });
    if (!doc) {
        throw new NotFoundError(`Not found review for a user with id "${user_id}"`);
    }

    res.status(StatusCodes.OK).json({ data: doc, status: "SUCCESS" });
}

export async function updateReview(req: Request, res: Response) {
    const { user_id, product_id, comment, rate } = req.body;
    const doc = await reviews.findOne({ user_id, product_id });
    if (!doc) {
        throw new NotFoundError("Review is not found");
    }

    doc.comment = comment;
    doc.rate = rate;
    await doc.save();
    res.status(StatusCodes.OK).json({ data: doc, status: "SUCCESS" });
}

export async function destroyReview(req: Request, res: Response) {
    const { product_id } = req.params;
    const { user_id } = req.body;

    if (!user_id || !product_id) {
        throw new BadRequestError("Received invalid API request");
    }

    const doc = await reviews.findOne({ user_id, product_id });

    if (!doc) {
        throw new NotFoundError("Review is not found");
    }

    await doc.remove();
    res.status(StatusCodes.OK).json({ data: doc, status: "SUCCESS" });
}