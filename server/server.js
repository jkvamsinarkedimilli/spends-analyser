const express = require("express");
const userRouter = require("./routes/user");
const transactionRouter = require("./routes/transaction");
const connectToDB = require("./db/mongoose");

connectToDB();
const app = express();

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/transactions", transactionRouter);

app.listen(3001, () => console.log("Started"));
