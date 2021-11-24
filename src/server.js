const  express =  require("express");
const  path =  require("path");
const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use("/", express.static(path.join(__dirname, "../dist/")));

server.get("/*", (req, res) => {
    res.sendFile('dist/index.html', { root: '.' });
});

server.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});