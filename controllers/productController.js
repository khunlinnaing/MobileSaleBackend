const Product = require('../models/Products');
getAllProduct = async (req, res, next) =>{
    let Products;
    try{
        Products = await Product.find();
    }catch(error){
        return res.json({message: error.message, status: 0})
    }
    if(!Products){
        return res.json({ message: "No Product", status: 0});
    }
    return res.json({ data: Products, status: 1 })
}

CrateProcut = async (req, res, next) =>{
    const { UserId, CategoryId, Name, Type, Price, Photo, Amout, Description } = req.body
    try{
        const checkProductType =await Product.findOne({ Type: Type.toUpperCase() });
        if (checkProductType) {
            return res.json({ message: `${Name} type(${Type}) is already exit`, status: 0 });
        }
        const newProduct = new Product({ UserId:UserId, CategoryId:CategoryId,Name: Name.toUpperCase(), Type:Type.toUpperCase(), Price: Price, Photo: Photo, Amout: Amout, Description: Description });
        await newProduct.save();
        return res.json({ message: "Create New Product is Successfully!.", status: 1});
        
    }catch(error){
        return res.json({ message: error.message , status: 0});
    }
}

UpdateProduct= async (req, res, next) => {
    const id = req.params.id;
    const updateData = req.body;
    const exitingProduct = await Product.findById(id);
    if (!exitingProduct) {
        return res.json({ error: 'This Product  is not found', ststus: 0 });
    }
    if(req.body.Type){
        const checkCategoryName = await Product.findOne({ Type: (req.body.Type).toUpperCase()});
        if (checkCategoryName){
            return res.json({ error: `${req.body.Name}(type ${req.body.Type}) is already exit!`, status: 0 });
        }
        updateData.Name = (req.body.Name).toUpperCase()
    }
    const updateProduct = await Product.findByIdAndUpdate(
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
        return resjson({
            message: "SomeThing is error",
            status: 0
        })
    })
};
DeleteProduct=async( req, res, next) =>{
    const id= req.params.id
    const deleteval = await Product.deleteOne({ _id: id });
    if(deleteval.deletedCount == 1){
        return res.json({ message: "Delete is Successfully.", status: 1})
    }else{
        return res.json({ message: "Delete is not Successfully.", status: 0})
    }
};
module.exports = {
    getAllProduct,
    CrateProcut,
    UpdateProduct,
    DeleteProduct
}