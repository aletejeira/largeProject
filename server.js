const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// const url =
// 'mongodb+srv://RickLeinecker:COP4331Rocks@cluster0.ehunp00.mongodb.net/?retryWrites=true&w=majority';

// Connects to the Mongo DB
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://root:COP4331iscool@cluster0.f9xcqli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);
client.connect();

app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.post('/api/login', async (req, res, next) =>
{
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
    var error = '';
    const { login, password } = req.body;
    const db = client.db('COP4331Cards');
    const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
    
    var id = -1;
    var fn = '';
    var ln = '';

    if( results.length > 0 )
    {
        id = results[0].UserId;
        fn = results[0].FirstName;
        ln = results[0].LastName;
    }

    var ret = { id:id, firstName:fn, lastName:ln, error:''};
    res.status(200).json(ret);
});
    

app.listen(5000); // start Node + Express server on port 5000