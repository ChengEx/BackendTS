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
                productId,
                userId
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
        productId: string,
        userId: string
    ):Promise<object | Error> {
        try {
            await this.collectionModel.findByIdAndDelete({ _id: userId });
            await this.studentModel.updateOne({ _id: userId },
                {
                    $pull:{
                        collectionProductId:{
                            $in: [ productId ] 
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