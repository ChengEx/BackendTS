import ChatroomModel from './chatroom.model';
import MessageModel from './message.model';

class MessageService {
    private chatroomModel = ChatroomModel;
    private messageModel = MessageModel;

    public async getChatRoomById(
        userId: string
    ): Promise<object | Error> {
        try {
            const chatroomlist = await this.chatroomModel.find({userId});
            return chatroomlist;
        }catch(error: any){
            return new Error(error.message);
        }
    };
    public async addChatRoom(
        user1Id: string,
        user2Id: string
    ): Promise<object | Error> {
        try {
            const chatroomCheck = await this.chatroomModel.findOne({ user1Id, user2Id });
            console.log(chatroomCheck);
            let returnObj = {};          
            if(!chatroomCheck) {
                const addchatroom = await this.chatroomModel.create({
                    user1Id,
                    user2Id
                })
                console.log('hi');
                if(addchatroom !== null) {
                    returnObj = addchatroom.toObject();
                }
            }else{
                returnObj = chatroomCheck.toObject();
            }

            return returnObj;
        }catch(error: any) {
            return new Error(error.message);
        }
    }
}

export default MessageService;