import CollectionModel from './collection.model';

class CollectionService {
    private collectionModel = CollectionModel;
    public async addCollection(
        productId: string,
        userId: string
    ): Promise<object | Error> {
        try {
            const collctionObj = await this.collectionModel.create({
                productId,
                userId
            });
            return collctionObj;
        }catch(error: any) {
            return new Error(error.message);
        }
    }
}

export default CollectionService;