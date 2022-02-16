import express from 'express';
import path from 'path';
import http from 'http';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';



if (process.env.ENV === undefined || process.env.ENV === 'dev') {
    dotenv.config();
}

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// db
import cassandra from './infrastructure/db/cassandra';
const query = 'SELECT name, email FROM users WHERE key = ?';
cassandra.execute(query, [ '123' ])
  .then(result => console.log('User with email %s', result.rows[0].email));

server.listen(port, () => {
    console.log('Server is listening on port %d', port);
})

// handle uncaught rejections
process.on('unhandledRejection', (reason, _promise) => {
    console.log('Unhandled Rejection at:', reason);
});

// handle uncaught exceptions
process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err)
    // process.exit(1) //mandatory (as per the Node.js docs)
})