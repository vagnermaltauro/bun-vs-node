import type { NextFunction, Request, Response } from "express";

type BodyLeaf = Record<string, string | number>;
type Body = | Record<string, string | number | BodyLeaf>;

export function json(req: Request, res: Response, next: NextFunction) {
    const body = req.body as Body
}
