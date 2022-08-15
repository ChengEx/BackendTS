import ChatroomModel from './chatroom.model';
import MessageModel from './message.model';

class MessageService {
    private chatroomModel = ChatroomModel;
    private messageModel = MessageModel;

    public async getChatRoomById(
        _id: string
    ): Promise<object | Error> {
        try {
            const chatroomlist = await this.chatroomModel.findOne({_id}).populate('user1Id').populate('user2Id').populate('productId');
            let returnChatroom = {}
            if(chatroomlist !== null){
                returnChatroom = chatroomlist.toObject();
            } 
            return returnChatroom;
        }catch(error: any){
            return new Error(error.message);
        }
    };
    public async addChatRoom(
        user1Id: string,
        user2Id: string,
        productId: string
    ): Promise<object | Error> {
        try {
            const chatroomCheck = await this.chatroomModel.findOne({ user1Id, user2Id, productId });
            //console.log(chatroomCheck);
            let returnObj = {};          
            if(!chatroomCheck) {
                const addchatroom = await this.chatroomModel.create({
                    user1Id,
                    user2Id,
                    productId
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
    };
    public async addMessageByRoomId(
        _id: string,
        userId: string,
        content: string,
        time: string
    ): Promise<object | Error> {
        try {
            const addMessageByRoomId = await this.chatroomModel.findByIdAndUpdate(
                _id, {
                    $push: { 
                        message: {
                            userId,
                            content,
                            time
                        } 
                    }
                }
            )

            const chatroomlist = await this.chatroomModel.findOne({_id}).populate('user1Id').populate('user2Id').populate('productId');
            let returnChatroom = {}
            if(chatroomlist !== null){
                returnChatroom = chatroomlist.toObject();
            } 
            return returnChatroom;
        }catch(error: any) {
            return new Error(error.message);
        }
    }
}

export default MessageService;