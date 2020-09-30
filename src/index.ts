import express from 'express';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import UpLoadImageRouter from './routes/upLoadImage'
import * as dotenv from 'dotenv';
dotenv.config();
// Initializations
const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
}})

// Routes


app.use('/upLoadImage',UpLoadImageRouter);
// // Static files
// app.use(express.static(path.join(__dirname, 'public')));

// Starting the Server
app.listen(app.get('port'), () => {
    console.log(`Server on port`, app.get('port'));
});