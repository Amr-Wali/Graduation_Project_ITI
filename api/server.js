const port = 3000;
let express = require("express"),
    path = require("path"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost:27017/toDo",
    { useNewUrlParser: true },
    error => {
        if (error) {
            console.log("DB Connection Error " + error);
        }
    }
);

let server = express();
server.use(morgan("short"));
server.use(cors({ origin: true }));
server.use(bodyParser.json());

server.get('/', (req, res) => res.send('Hello World!'));

server.listen(port, () => {
    console.log(`I am Listening on port ${port}`);
});