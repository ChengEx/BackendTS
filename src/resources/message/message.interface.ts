import { Document, ObjectId } from 'mongoose';

export default interface IMessage extends Document{
    userId: ObjectId,
    message: string
}