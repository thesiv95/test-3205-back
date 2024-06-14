import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const numberRegex = new RegExp(/^\d{6}$/);

const validationSchema = Joi.object({
  email: Joi.string().email().required(),
  number: Joi.string().regex(numberRegex).optional(),
});

const validator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validationSchema.validate(req.query);
  const errorPayload = {
    message: error?.details[0].message,
    name: error?.details[0].type ?? "",
    stack: error?.details[0].context ?? "",
  };
  if (error) {
    return res.status(422).send({ validationError: errorPayload });
  }

  return next();
};

export default validator;
