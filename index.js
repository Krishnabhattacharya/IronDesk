import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import db from "./src/db/mognodb.js";
import colors from "colors";

dotenv.config();
const app = express();


app.use(express.json());


app.use(morgan("dev"));
db();



const port = process.env.PORT || 3000;


app.use('/', (req, res) => {
    res.send("Hello World!")
})






app.listen(port, () => {
    console.log(`server running on port === ${port}`.bgCyan);
});