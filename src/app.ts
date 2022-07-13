import express, { Application, NextFunction } from 'express';
import mongoose from 'mongoose';
//import compression from 'compression';
import cors from 'cors';
import Controller from './utils/interfaces/controller.interface';
import ErrorMiddleware from './middleware/error.middleware';
import helmet from 'helmet';
import Logging from './library/logging'
import bodyParser from 'body-parser';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
        this.test();
    }
    public test(): void {
        this.express.get('/', (req,res) =>res.send(`openning api in: ${this.port}`)); 
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        //this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
        this.express.use(bodyParser.json({ limit:'50mb' }));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        //this.express.use(compression());
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initialiseErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private initialiseDatabaseConnection(): void {
        //const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

        mongoose.connect(
            "mongodb+srv://denoriaaa:SQ3No7zNIIwTmSBI@cluster0.hnuu7.mongodb.net/SecondHandMarket?retryWrites=true&w=majority"
        ).then(()=>{
            Logging.info('Connected to mongoDB');
        })
        .catch((error)=> {
            Logging.error('Connected Error');
            Logging.error(error);
        })
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
