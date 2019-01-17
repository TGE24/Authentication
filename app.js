const express = require("express");
const app = express();

app.use("/api", require("./routes/AuthController"));

//listen to the selected port
app.listen(3000);
console.log(`Server is running on port 3000`);
