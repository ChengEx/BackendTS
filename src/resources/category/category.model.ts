import mongoose, { Schema } from 'mongoose';
import ICategory from './category.interface';

const CategorySchema: Schema = new Schema({
    categoryName: { type: String, required: true },
    categoryNameEN: { type: String, required: true },
    subCategory: [
        {
            subCategoryName: { type: String },
            subCategoryNameEN: { type: String }
        }
    ]
})

export default mongoose.model<ICategory>('categories', CategorySchema); 