import express, { urlencoded } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import multer from "multer";
import {PdfReader} from "pdfreader";




//config env
dotenv.config();

//databse connect via config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors()); 
app.use(express.json()); 
app.use(morgan("dev")); 


const storage = multer.diskStorage({
  destination: function(req, file, cb){
    return cb(null, "./assets");
  },
  filename: function(req, file, cb){
    return cb(null, `${Date.now()}_${file.originalname}`);
  }
})

const upload = multer({ storage })

const extractData = (path) => {
  return new Promise((resolve, reject) => {
    let text = "";
    new PdfReader().parseFileItems(path, (err, item) => {
      if (err) {
        console.log(err);
        reject(err);
      } else if (!item) {
        console.warn("end of file");
        resolve(text);
      } else if (item.text) {
        text += item.text;
      }
    });
  });
}

//routes
app.use("/api/v1/auth", authRoutes);
// upload file
app.post('/upload', upload.single('file'), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const text = await extractData(req.file.path);
  console.log(text);
});


//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to resume app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on port ${PORT}`
      
  );
});

