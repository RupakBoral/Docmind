import { Router } from "express";
import { fileRouter } from "./router/file";
import { retrievalRouter } from "./router/query";


export const router = Router();

router.use('/', fileRouter);
router.use('', retrievalRouter);