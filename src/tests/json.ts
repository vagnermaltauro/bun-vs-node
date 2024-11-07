import type { Request } from "express";

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

export async function json(req: Request): Promise<string> {
    return JSON.stringify(walkBody(req.body));
}
