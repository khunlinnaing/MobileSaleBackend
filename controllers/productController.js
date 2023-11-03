const Product = require('../models/Products');
getAllProduct = async (req, res, next) =>{
    if(!req.isAuth){
        return res.json({ message: "You Need to login or take token!", status: 0})
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Product.countDocuments({});
    let Products;
    try{
        Products = await Product.find();
    }catch(error){
        return res.json({message: error.message, status: 0})
    }
    if(!Products){
        return res.json({ message: "No Product", status: 0});
    }
    return res.json({ data: Products.slice(startIndex, endIndex), total: Math.ceil(total/limit), status: 1 })
}


getProductByID= async (req, res, next) => {
    if(!req.isAuth){
        return res.json({ message: "You Need to login or take token!", status: 0})
    }
    const id = req.params.id;
    const exitingProduct = await Product.findById(id);
    if (!exitingProduct) {
        return res.json({ error: 'This main category  is not found', ststus: 0 });
    }
    return res.json({data: exitingProduct, status:1})
}

CrateProcut = async (req, res, next) =>{
    if(!req.isAuth){
        return res.json({ message: "You Need to login or take token!", status: 0})
    }
    const { UserId, CategoryId, Name, Type, Price, Quantity,Photo, Description } = req.body
    try{
        const checkProductType =await Product.findOne({Name: Name.toUpperCase(), Type: Type.toUpperCase(), CategoryId: CategoryId });
        if (checkProductType) {
            return res.json({ message: `${Name} type(${Type}) is already exit`, status: 0 });
        }
        const newProduct = new Product({ UserId:UserId, CategoryId:CategoryId,Name: Name.toUpperCase(), Type:Type.toUpperCase(), Price: Price,Quantity: Quantity, Photo: Photo, Description: Description });
        await newProduct.save();
        return res.json({ message: "Create New Product is Successfully!.", status: 1});
        
    }catch(error){
        return res.json({ message: error.message , status: 0});
    }
}

UpdateProduct= async (req, res, next) => {
    if(!req.isAuth){
        return res.json({ message: "You Need to login or take token!", status: 0})
    }
    const id = req.params.id;
    const updateData = req.body;
    const exitingProduct = await Product.findById(id);
    if (!exitingProduct) {
        return res.json({ error: 'This Product  is not found', ststus: 0 });
    }
    if(req.body.Type){
        const checkCategoryName = await Product.findOne({ Name:  (req.body.Name).toUpperCase(),Type: (req.body.Type).toUpperCase()});
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
    if(!req.isAuth){
        return res.json({ message: "You Need to login or take token!", status: 0})
    }
    const id= req.params.id
    const deleteval = await Product.deleteOne({ _id: id });
    if(deleteval.deletedCount == 1){
        return res.json({ message: "Delete is Successfully.", status: 1})
    }else{
        return res.json({ message: "Delete is not Successfully.", status: 0})
    }
};

getProductByCategoryId= async (req, res, next) =>{
    if(!req.isAuth){
        return res.json({ message: "You Need to login or take token!", status: 0})
    }
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Product.countDocuments({});
    let Products;
    try{
        Products = await Product.find({CategoryId: id});
    }catch(error){
        return res.json({message: error.message, status: 0})
    }
    if(!Products){
        return res.json({ message: "No Product", status: 0});
    }
    return res.json({ data: Products.slice(startIndex, endIndex), total: Math.ceil(total/limit), status: 1 })
}

HomePageProduct = async (req, res, next) =>{
    const page =1;
    const limit =10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let Products;
    try{
        Products = await Product.find();
    }catch(error){
        return res.json({message: error.message, status: 0})
    }
    if(!Products){
        return res.json({ message: "No Product", status: 0});
    }
    return res.json({ data: Products.slice(startIndex, endIndex), status: 1 })
}
module.exports = {
    getAllProduct,
    getProductByID,
    CrateProcut,
    UpdateProduct,
    DeleteProduct,
    getProductByCategoryId,
    HomePageProduct
}