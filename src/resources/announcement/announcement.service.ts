import AnnouncementModel from "./announcement.model";

class AnnouncementService {
    private announcementModel = AnnouncementModel;
    public async getAll(): Promise<object | Error> {
        try {
            const announcementArray = await this.announcementModel.find().populate('createdBy');
            return announcementArray;
        }catch(error: any){
            return new Error(error.message);
        }
    };
    public async addAnnouncement(
        userId: string,
        title: string,
        content: string
    ): Promise<object | Error> {
        try {
            const announcement = await this.announcementModel.create({
                title,
                content,
                createdBy: userId
            })
            return announcement;
        }catch(error: any) {
            return new Error(error.message);
        }
    }
}

export default AnnouncementService;