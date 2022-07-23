import { Document } from 'mongoose';

export default interface IAnnounceent extends Document {
    title: string,
    content: string,
    createdBy: string
}