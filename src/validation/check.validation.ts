import Joi from "joi";

export const createCheck = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required().domain().trim(""),
  protocol: Joi.string().required(),
  path: Joi.string(),
  webhook: Joi.string(),
  timeout: Joi.number(),
  interval: Joi.number(),
  threshold: Joi.number(),
  authentication: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  httpHeaders: Joi.object({}),
  assert: Joi.object({
    statusCode: Joi.number(),
  }),
  tags: Joi.array().items(Joi.string()),
  ignoreSSL: Joi.boolean(),
});

export const updateCheck = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required().domain().trim(""),
  protocol: Joi.string().required(),
  path: Joi.string(),
  webhook: Joi.string(),
  timeout: Joi.number(),
  interval: Joi.number(),
  threshold: Joi.number(),
  authentication: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  httpHeaders: Joi.object({}),
  assert: Joi.object({
    statusCode: Joi.number(),
  }),
  tags: Joi.array().items(Joi.string()),
  ignoreSSL: Joi.boolean(),
});
