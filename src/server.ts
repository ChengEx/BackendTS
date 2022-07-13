import StudentController from './resources/student/student.controller';
import ProductController from './resources/product/product.controller';
import CategoryController from './resources/category/category.controller';
import App from './app';

const app = new App(
    [new StudentController(), new ProductController(), new CategoryController()],
    4000
)
app.listen();