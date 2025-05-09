import express from "express";
import {CategoriesService} from "../services/categories-service";
var router = express.Router()


// add category
router.post('/add', async (req, res) => {
    const { name } = req.body
    const categoryService = new CategoriesService()
    try {
       const newCat = await categoryService.addCategory(name)
        if(newCat) {
            res.status(200).json({ message : "New category added !!!" })
        }
    } catch (e) {
          res.status(500).json({ message : "Internal server error !!!" })
    }
})

// get category list

router.get('/list' , async (req, res) => {
    const categoryService = new CategoriesService()
    try {
        const list = await categoryService.getCategoryList()
        res.status(200).json({data : list})
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }

} )


export default router
