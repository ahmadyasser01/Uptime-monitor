import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export function validationMiddleware(
  BodySchema?: Joi.Schema,
  paramsSchema?: Joi.Schema,
  querySchema?: Joi.Schema
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: false,
    };
    const validationPromises: Promise<any>[] = [];
    if (BodySchema)
      validationPromises.push(
        BodySchema.validateAsync(req.body, validationOptions)
      );
    if (paramsSchema)
      validationPromises.push(
        paramsSchema.validateAsync(req.params, validationOptions)
      );
    if (querySchema)
      validationPromises.push(
        querySchema.validateAsync(req.query, validationOptions)
      );

    Promise.all(validationPromises)
      .then(() => {
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
}
