import { Request, Response, NextFunction } from "express";

export const limitParams = (maxCharacters: number, ...allowedParams: string[]) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: string[] = [];

  allowedParams.forEach(param => {
    const paramValue = req.params[param];
    const paramLength = paramValue ? paramValue.length : 0;

    if (paramLength > maxCharacters) {
      errors.push(`The ${param} exceeds ${maxCharacters} characters.`);
    }
  });

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(" ") });
  }

  next();
};
