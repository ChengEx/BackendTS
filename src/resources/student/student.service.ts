import StudentModel from '../../resources/student/student.model';
import token from '../../utils/token';
import bcrypt from 'bcryptjs';

class StudentService {
    private studentModel = StudentModel;

    public async login(
        username: string,
        password: string
    ): Promise<Object | Error> {
        try {
            const oldUser = await this.studentModel.findOne({username});
            if(!oldUser) throw new Error("Student doesn't exist");

            const comparePassword = await bcrypt.compare(password, oldUser.password);
            if(!comparePassword) throw new Error("wrong password!");

            const accessToken = token.createToken(oldUser);

            let returnStudentObj = oldUser.toObject();
            returnStudentObj.token = accessToken;
            return returnStudentObj;
        }catch(error: any){
            console.log("hi");
            return new Error(error.message);
        }
        
    };

    public async register(
        username: string,
        password: string,
        name: string,
        email:string,
        gender: string,
        phone: number
    ): Promise<object | Error> {
        try {
            const oldUser = await this.studentModel.findOne({username});
            if(oldUser) throw new Error("Username exist");

            const hashedPassword = await bcrypt.hash(password, 12)
            console.log("hashedPassword",hashedPassword);
            const authority = "0";
            const user = await this.studentModel.create({
                username,
                password: hashedPassword,
                name,
                email,
                gender,
                phone,
                authority
            });

            const accessToken = token.createToken(user);
            
            let returnStudentObj = user.toObject();
            returnStudentObj.token = accessToken;

            return returnStudentObj;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async getPersonalInformation(
        _id: string
    ): Promise<object | Error>{
        try {
            const studentObj = await this.studentModel.findById(_id);
            let returnStudent = {}
            if(studentObj !== null){
                returnStudent = studentObj.toObject();
            } 
            return returnStudent;
        }catch(error: any){
            throw new Error(error.message);
        }
    }

    public async updateInformation(
        _id: string,
        photo: string,
        name: string,
        email: string,
        phone: string,
        description: string
    ): Promise<object | Error> {
        try {
            await this.studentModel.findByIdAndUpdate(
                _id,{
                    photo,
                    name,
                    email,
                    phone,
                    description
                }
            )
            const beforeUpdateObj = await this.studentModel.findById(_id);

            let returnObj = {}
            if(beforeUpdateObj !== null){
                returnObj = beforeUpdateObj.toObject();
            } 
            return returnObj;
        }catch(error: any) {
            throw new Error(error.message);
        }
    }

    public async changePassword(
        _id: string,
        oldPassword: string,
        newPassword: string
    ):Promise<object | Error> {
        try {
            const changePasswordUser = await this.studentModel.findById({ _id });
            if(!changePasswordUser) throw new Error("User doesn't exist");

            const comparePassword = await bcrypt.compare(oldPassword, changePasswordUser?.password);
            if(!comparePassword) throw new Error("Your password is not correct !");
            
            const hashedPassword = await bcrypt.hash(newPassword, 12)
            const newPasswordObj = await this.studentModel.findByIdAndUpdate(
                _id,{
                    password: hashedPassword
                }
            )
            let returnObj = {};
            if(newPasswordObj !== null) {
                returnObj = newPasswordObj.toObject();
                //console.log(returnObj)
            }
            return returnObj;
        }catch(error: any) {
            throw new Error(error.message);
        }
    }
    public async getCollectionById(
        userId: string
    ): Promise<object | Error> {
        try{
            const userCollection = await this.studentModel.findById({ _id: userId })
                .select('collectionProductId')
                .populate('collectionProductId');
            console.log(userCollection);
            let returnObj = {};
            if(userCollection !== null) {
                returnObj = userCollection.toObject();
            }
            return returnObj;
        }
        catch(error: any) {
            return Error(error.message);
        }
        
    }


}

export default StudentService;