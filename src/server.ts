import StudentController from './resources/student/student.controller';
import ProductController from './resources/product/product.controller';
import CategoryController from './resources/category/category.controller';
import dotenv from 'dotenv';

import App from './app';
dotenv.config();
console.log(process.env.apiID)
const app = new App(
    [new StudentController(), new ProductController(), new CategoryController()],
    <any>process.env.apiID || 4000
)

app.listen();