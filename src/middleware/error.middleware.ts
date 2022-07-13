import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/exception/http.exception";

function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
):void {
    const status = error.status || 401;
    const message = error.message;

    res.status(status).send({
        status,
        message
    });
}

export default errorMiddleware;