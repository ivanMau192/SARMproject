import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import profilesRoutes from './routes/profiles.routes';
import usersRoutes from './routes/users.routes';
import loginRoutes from './routes/login.routes';
import lista_profRoutes from './routes/lista_profiles.routes';
import lista_usrRoutes from './routes/lista_users.routes';
import lista_permRoutes from './routes/lista_permissions.routes';
import { createConnection } from "typeorm";

import "reflect-metadata";

const app = express();
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

const sessionPool = require('pg').Pool
const randomstring = require("randomstring");
const sessionDBaccess = new sessionPool({
  user: "sarm",
  password: "12345678aA!",
  host: "40.88.145.158",
  port: "5432",
  database: "sarm"})

const sessionConfig = {
  store: new pgSession({
      pool: sessionDBaccess,
      tableName: 'session'
  }),
  name: 'SID',
  secret: randomstring.generate({
      length: 14,
      charset: 'alphanumeric'
  }),
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false // ENABLE ONLY ON HTTPS
  }}


app.use(express.json());
app.use(express.json());
app.use(morgan('dev'));
app.use(session(sessionConfig))
const allowedDomains = ['http://localhost:4200'];

var corsOptions = {
  origin: function (origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);
   
      if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  preflightContinue: true,
}
//app.options('*', cors(/* corsOptions */))
app.use(cors(corsOptions));
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
app.get('/', (req, res) => {
  res.send('Hello World');
  req.session.test = 1
  req.session.var = "HOLA"
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

createConnection().then(async connection => {
  console.log('DB conection OK');
  app.use(profilesRoutes);
  app.use(usersRoutes);
  app.use(loginRoutes)
  app.use(lista_profRoutes)
  app.use(lista_usrRoutes)
  app.use(lista_permRoutes)
})