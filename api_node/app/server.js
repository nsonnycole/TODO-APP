const express    = require('express'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    morgan     = require('morgan'),
    config     = require('config'),
    app        = express();


const exportDB = require('./utilities/export');
// API Services
const serviceGet  = require('./services/get');
const serviceUpdate  = require('./services/update');
const servicePost = require('./services/post');
const serviceDelete = require('./services/delete');
/* *** *** IMPORTS *** *** */

const API_CONFIG = config.api;

// set our port
const PORT = process.env.PORT || API_CONFIG.port;

// create our router
const router = express.Router();

// Handle the connection event
const db = mongoose.connection;
// DATABASE SETUP
const HOST = `${config.db.host}${config.db.port}`;
mongoose.connect(HOST);

// Mangoose Event Emitter
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('DB Connected'));


// cli option

if (process.argv[2] == 'export')
    return exportDB(process.argv[3]);

// configure app
// log requests to the console
app.use(morgan('dev'));

app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware to use for all requests
router.use((req, res, next) => {
    // do login
    console.log('API called');
next()
});

console.log(serviceGet.init);
// API Routes
router.get('/', serviceGet.init);

router.route('/todos')
   // .post(servicePost)
    .get(serviceGet.getTodos);


router.route('/todo/add/:name/:description/:priority')
    .post(servicePost);


router.route('/todo/:id')
    .get(serviceGet.getTodo)
    .put(serviceUpdate.updateTodo)
    .delete (serviceDelete.deleteTodo);

router.route('todo/status/:id')
    .put(serviceUpdate.updateTodo)



app.use(`${API_CONFIG.path}${API_CONFIG.version}`, router);

// START server
app.listen(PORT);

console.log(`running on: ${API_CONFIG.host}:${PORT}`);
