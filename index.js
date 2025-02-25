const express = require("express");
const dotenv = require("dotenv");
dotenv.config();


const app = express();
const port = process.env.PORT;

const {dbConnect}=require("./db/dbconnect")
dbConnect()
app.use(express.json());
const queryRouter=require("./routes/query")

app.use("/", queryRouter);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
