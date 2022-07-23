import mongoose, { Schema } from 'mongoose';
import IAnnouncement from './announcement.interface';

const AnnouncementSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'students' },
},
{
    timestamps: true
})

export default mongoose.model<IAnnouncement>('announcements', AnnouncementSchema);