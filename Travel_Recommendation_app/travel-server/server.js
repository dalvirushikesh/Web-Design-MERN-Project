
const multer = require("multer");
const path = require("path");
const postRoute = require("./app/routes/posts");

const places = require("./app/routes/places-routes");

let express = require('express'),
    app = express(),
    port = 5001,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

// mongoose instance connection url connection
mongoose.connect("mongodb://localhost:27017/travel-db", {
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log('Connected to Database')).catch((e)=>{
    console.log('Error: ',e);
})
mongoose.Promise = global.Promise;

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Enable CORS for all routes on port 5001
app.use(cors({
  origin: 'http://localhost:5001',
  optionsSuccessStatus: 200
}));
//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
//Code to upload image files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
}); 

app.use("/api/posts", postRoute);

const initApp = require('./app/app');
initApp(app);
places(app);

app.listen(port);
console.log('Server started on port: ' + port);
