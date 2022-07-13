import { Document } from 'mongoose';

export default interface IMessage extends Document{
    message: string,
    otherStudents: [string],
    sender: string
}