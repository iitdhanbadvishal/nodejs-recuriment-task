const app = require("./app")
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");


const PORT = 3001;
const MONGO_URI="mongodb+srv://vishal:vishal@cluster0.tuv3n.mongodb.net/nodeJsTask?retryWrites=true&w=majority"
// db
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("***DB CONNECTED***"))
  .catch((err) => console.log("DB CONNECTION ERR => ", err));

app.use(bodyParser.json());
app.use(cors());



app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});