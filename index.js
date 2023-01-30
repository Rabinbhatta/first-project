import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authroute from "./routes/auth.js"
import userroutes from "./routes/user.js"
import postroutes from "./routes/posts.js"
import {register} from "./controllers/auth.js";
import {createPost} from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js";



/* CONFIGURATIONS  */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());
app.use("/assests", express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function(res,file,cb){
         cb(null,'public/assets');
    },
    filename: function(res,file,cb){
        cb(null,file.originalname);
    }
});
const upload = multer({storage});
/* Register */

app.post("/auth/register",upload.single("picture"), register)
app.post("/post",upload.single("picture"),verifyToken, createPost)

/* routes */
 app.use("/auth", authroute)

 app.use("/user", userroutes)

 app.use("/post", postroutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', true)
mongoose
.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true

})
.then(()=>{
    app.listen(PORT, ()=>console.log(`server is listening in ${PORT}`));
})
.catch((error)=>{console.log(error)})


