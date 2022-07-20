import { Document } from 'mongoose';

export default interface ICollection extends Document{
    userId: string
}