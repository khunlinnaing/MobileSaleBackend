const Category = require('../models/Category');
getAllCategories = async (req, res, next) =>{
    let Categories;
    try{
        Categories = await Category.find();
    }catch(error){
        return res.json({message: error.message, status: 0})
    }
    if(!Categories){
        return res.json({ message: "No Category", status: 0});
    }
    return res.json({ data: Categories, status: 1 })
}
GetCategoryByID= async (req, res, next) => {
    const id = req.params.id;
    const exitingCategory = await Category.findById(id);
    if (!exitingCategory) {
        return res.json({ error: 'This main category  is not found', ststus: 0 });
    }
    return res.json({data: exitingCategory, status:1})
}

CrateCategory = async (req, res, next) =>{
    const { UserId, Name, Type, Quality, Photo, Amout, Description } = req.body
    try{
        const checkCategory =await Category.findOne({ Name: Name.toUpperCase() });
        if (checkCategory) {
            return res.json({ message: Name + " is already exit" , status: 0});
        }
        const newCategory = new Category({ UserId:UserId, Name: Name.toUpperCase(), Type:Type, Quality: Quality, Photo: Photo, Amout: Amout, Description: Description });
        await newCategory.save();
        return res.json({ message: "Create New User is Successfully!.", status: 1});
        
    }catch(error){
        return res.json({ message: error.message , status: 0});
    }
}

UpdateCategory= async (req, res, next) => {
    const id = req.params.id;
    const updateData = req.body;
    const exitingCategory = await Category.findById(id);
    if (!exitingCategory) {
        return res.json({ error: 'This main category  is not found', ststus: 0 });
    }
    if(req.body.Name){
        const checkCategoryName = await Category.findOne({ Name: (req.body.Name).toUpperCase()});
        if (checkCategoryName){
            return res.json({ error: req.body.Name +' is already exit!', status: 0 });
        }
        updateData.Name = (req.body.Name).toUpperCase()
    }
    const updateCategory = await Category.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    ).then( result => {
        return res.json({
            message: "update is success",
            status: 1,
            data: result
        });
    }).catch(err =>{
        return res.json({
            message: "SomeThing is error",
            status: 0
        })
    })
};
DeleteCategory=async( req, res, next) =>{
    const id= req.params.id
    const deleteval = await Category.deleteOne({ _id: id });
    if(deleteval.deletedCount == 1){
        return res.status(200).json({ message: "Delete is Successfully.", status: 1})
    }else{
        return res.status(404).json({ message: "Delete is not Successfully.", status: 0})
    }
};
module.exports = {
    getAllCategories,
    GetCategoryByID,
    CrateCategory,
    UpdateCategory,
    DeleteCategory
}