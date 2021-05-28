import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import profilesRoutes from './routes/profiles.routes';
import { createConnection } from "typeorm";
import "reflect-metadata";
const app = express();

app.use(express.json());
app.use(express.json());
app.use(morgan('dev'));
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
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

createConnection().then(async connection => {
  console.log('DB conection OK');
  app.use(profilesRoutes);
  
})