import CollectionModel from './collection.model';
import StudentModel from '../student/student.model';

class CollectionService {
    private collectionModel = CollectionModel;
    private studentModel = StudentModel;
    public async addCollection(
        productId: string,
        userId: string
    ): Promise<object | Error> {
        try {
            const collctionObj = await this.collectionModel.create({
                userId,
                productId
            });
            const addStudentCollectionProductId = await this.studentModel.findByIdAndUpdate(
                userId, {
                    $push: { collectionProductId: productId  }
                }
            )
            return collctionObj;
        }catch(error: any) {
            return new Error(error.message);
        }
    }

    public async deleteCollection(
        collectionId: string,
        userId: string
    ):Promise<object | Error> {
        try {
            await this.collectionModel.findOneAndDelete({ userId: userId, productId: collectionId });

            await this.studentModel.updateOne({ _id: userId },
                {
                    $pull:{
                        collectionProductId:{
                            $in: [ collectionId ] 
                        }
                    }
                });

            const userCollection = await this.studentModel.findById({ _id: userId })
                .select('collectionProductId')
                .populate('collectionProductId');
            console.log(userCollection);
            let returnObj = {};
            if(userCollection !== null) {
                returnObj = userCollection.toObject();
            }
            return returnObj;
        }catch(error: any) {
            return new Error(error.message);
        }
    }
}

export default CollectionService;