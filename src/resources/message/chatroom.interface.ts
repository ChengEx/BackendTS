import { Document, ObjectId } from 'mongoose';

export default interface IChatroom extends Document {
    roomId: string,
    user1Id: ObjectId,
    user2Id: ObjectId
}