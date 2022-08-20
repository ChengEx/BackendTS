import StudentController from './resources/student/student.controller';
import ProductController from './resources/product/product.controller';
import CategoryController from './resources/category/category.controller';
import CollectionController from './resources/collection/collection.controller';
import AnnouncementController from './resources/announcement/announcement.controller';
import MessageController from './resources/message/message.controller';
import OrderController from './resources/order/order.controller';
import dotenv from 'dotenv';
import { Router, Request, Response, NextFunction } from 'express';

import App from './app';
dotenv.config();
console.log(process.env.apiID)
const app = new App(
    [new StudentController(), new ProductController(), new CategoryController(), new CollectionController(), new AnnouncementController(), new MessageController(), new OrderController()],
    <any>process.env.apiID || 4000
)


// let http = require('http').Server(app);
// http.listen(<any>process.env.apiID || 4000,()=> {
//     console.log('connect')
// });
app.listen();



// let server = require('http').createServer(app);
// const port = <any>process.env.apiID || 4000;
// server.listen(port, function() {
//   console.log(`Listening on port ${port}`);
// });