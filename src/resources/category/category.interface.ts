import { Document } from 'mongoose';

export default interface ICategory extends Document {
    categoryName: string,
    categoryNameEN: string,
    subCategory: [
        {
            subCategoryName: string,
            subCategoryNameEN: string
        }
        
    ]
}