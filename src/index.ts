import express from "express";
import type { NextFunction, Request, Response } from "express";
import * as methods from "./tests";
import bodyParser from "body-parser";

const app = express();
const port = 45001;

type Method = (req: Request, res: Response, next: NextFunction) => void;
const methodList: Record<string, Method> = methods

app.use(bodyParser.json());

app.post('/', (req, res, next) => {
    const method = req.headers["x-method"];
    const found = methodList[method as string];

    if (!found) {
        res.status(404).send("Method not found");
        return;
    }

    found(req, res, next);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
