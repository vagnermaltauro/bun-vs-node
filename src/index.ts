import express from "express";
import type { Request } from "express";
import * as methods from "./tests";
import bodyParser from "body-parser";

const app = express();
const port = 45001;

type Method = (req: Request) => Promise<Buffer | ArrayBuffer | Uint8Array | string | undefined>;
const methodList: Record<string, Method> = methods as any;

app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const method = req.headers["x-method"];
    const found = methodList[method as string];

    if (!found) {
        res.status(404).send("Method not found");
        return;
    }

    const out = await found(req);
    res.status(200).send(out);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
