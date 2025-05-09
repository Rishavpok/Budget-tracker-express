import category from "../Models/category-model";

export class CategoriesService {
    constructor() {
    }
    async addCategory(name : string) {
        const newCategory =  new category({name})
        await newCategory.save()
        return newCategory
    }


    async getCategoryList() {
        const categoryList = await category.find()
        return categoryList
    }
}
