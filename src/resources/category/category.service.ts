import CategoryModel from './category.model';

class CategoryService {
    private categoryModel = CategoryModel;

    public async getAllCategory(): Promise<object | Error> {
        try{
            const categoryArray = await this.categoryModel.find();
            return categoryArray;    
        }catch(error: any){
            return new Error(error.message);
        }
    }
    public async getCategoryByPath(
        path: string
    ): Promise<object | Error> {
        try {
            const categoryObj = await this.categoryModel.findOne({'categoryNameEN':path});
            let returnObj = {};
            if(categoryObj !== null) {
                returnObj = categoryObj.toObject();
            }
            return returnObj;
        }catch(error: any) {
            throw new Error(error.message);
        }
    }
}

export default CategoryService;