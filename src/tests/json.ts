import type { NextFunction, Request, Response } from "express";

function walkBody(body: any): void {
    if (typeof body === "object") {
        for (const [key, value] of Object.entries(body)) {
            if (typeof value === "object") {
                walkBody(value);
            } else if (typeof value === "number") {
                body[key] = value + 1;
            }
        }
    }
}

export function json(req: Request, res: Response, next: NextFunction) {
    walkBody(req.body);
}
