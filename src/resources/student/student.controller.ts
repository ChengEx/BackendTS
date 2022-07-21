import { Router, Request, Response, NextFunction } from 'express';
import IController from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exception/http.exception';
import StudentService from './student.service';
import validationMiddleware from '../../middleware/validation.middleware';
import validate from './student.validation';
class StudentController implements IController {
    public path = '/student';
    public router = Router();
    private studentService = new StudentService();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );
        this.router.post(
            `${this.path}/changePassword`,
            this.changePassword
        );
        this.router.post(
            `${this.path}/getPersonalInformation`,
            validationMiddleware(validate.getPersonalInformation),
            this.getPersonalInformation
        );
        this.router.post(
            `${this.path}/updateInformation`,
            this.updateInformation
        );
        
        
    }
    private login = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { username, password } = req.body;
            const studentObj = await this.studentService.login(
                username,
                password
            );     
            if(studentObj instanceof Error){
                throw new Error(studentObj.message);
            }
            res.status(200).json({ studentObj }); 
        }catch(error: any){
            next(new HttpException(400, error.message));
        }
    }
    private register = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { username, password, name, email, gender, phone } = req.body;

            const studentObj = await this.studentService.register(
                username,
                password,
                name,
                email,
                gender,
                phone
            );
            if(studentObj instanceof Error){
                throw new Error(studentObj.message);
            }

            res.status(201).json({ studentObj });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
    private changePassword = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { _id, oldPassword, newPassword } = req.body;
            const returnObj = await this.studentService.changePassword(
                _id,
                oldPassword,
                newPassword
            )
            if(returnObj instanceof Error){
                throw new Error(returnObj.message);
            }
            res.status(201).json({ returnObj });
        }catch(error: any){
            next(new HttpException(400, error.message));
        }
    }

    private getPersonalInformation = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { _id }  = req.body;
            const studentObj = await this.studentService.getPersonalInformation(_id);
            if(studentObj instanceof Error) {
                throw new Error(studentObj.message);
            }
            res.status(201).json({ studentObj });
        }catch(error: any){
            next(new HttpException(400, error.message));
        }
    }

    private updateInformation = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            //console.log(req.body);
            const { _id, photo, name, email, phone, description } = req.body;
            const beforeUpdateObj = await this.studentService.updateInformation(
                _id,
                photo,
                name,
                email,
                phone,
                description
            )
            if(beforeUpdateObj instanceof Error){
                throw new Error(beforeUpdateObj.message);
            }
            res.status(201).json({ beforeUpdateObj });
        }catch(error: any) {
            next(new HttpException(400, error.message));
        }
    }
}
export default StudentController;