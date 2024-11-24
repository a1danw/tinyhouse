"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
const express_1 = __importDefault(require("express")); // ts compiles code to valid es6 code node recognises - we can take advantage of new js features
const app = (0, express_1.default)();
const port = 9000;
app.get("/", (_req, res) => res.send("Hello World"));
app.listen(port);
console.log(`[app]: http://localhost:${port}`);
