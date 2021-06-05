import express from "express";
import compression from "compression";
import index from "./routes/index";
import path from "path";
import fs from "fs";
import ReactDOMServer from "react-dom/server";
import {hydrate} from "react-dom";
import React from "react";
import Home from "./components/pages/home"
import Index from "./components/pages"
import Dashboard from "./components/pages/dashboard"
import * as Dasboard from "~templates/dashboard";

// Server var
// const app = express();

// // View engine setup
// app.set("views", path.join(__dirname,"views"));
// app.set("view engine", "ejs");

// // Middleware
// app.use(compression());
// console.log(__dirname);
// // app.use(express.static(__dirname + "/public"));
// app.use(express.static('public'));

// //Routes
// app.use("/", index);

// const port = process.env.PORT || 3000;

// app.listen(port, function listenHandler() {
//     console.info(`Running on ${port}`)
// });

const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use("/", express.static(path.join(__dirname, "")));

const manifest = fs.readFileSync(
    path.join(__dirname, "manifest.json"),
    "utf-8"
);
const assets = JSON.parse(manifest);

server.get("/", (req, res) => {
    
    // res.send(hydrate(<Dasboard.Element />, document.getElementById("root")));
    // res.send(hydrate(<Dashboard />, document.getElementById("root")));
//     const component = ReactDOMServer.renderToNodeStream(React.createElement(Index));
    res.render("pages/index", { assets });
});

// server.get("/index", (req, res) => {
//     const component = ReactDOMServer.renderToNodeStream(React.createElement(Index));
//     res.render("pages/index", { assets, component });
// });

// server.get("/home", (req, res) => {
//     const component = ReactDOMServer.renderToNodeStream(React.createElement(Home));
//     res.render("pages/home", { assets, component });
// });

server.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});