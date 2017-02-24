import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'graphql-server-express';
import schema from './data/schema';

const PORT = 3000;

var app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use(express.static('src/static'))
app.use(express.static('dist/client'))

app.listen(PORT);
