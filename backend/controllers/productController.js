import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import slugify  from "slugify"


// @desc    Fetch all products 
// @route   GET /api/products
// @access  Public

function createCategories(products, parentId = null) {
    const categorys = [];
    let category;
    if (parentId == null) {
        category = products.filter((cat) => cat.parentId == undefined);
    } else {
        category = products.filter((cat) => cat.parentId == parentId);
    }

    for (let cate of category) {
        categorys.push({
            _id: cate._id,
            name: cate.name,
            image: cate.image,
            description: cate.description,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(products, cate._id),
        });
    }

    return categorys;
}


const getProducts = asyncHandler( async (req, res) => { 
    const products = await Product.find({});

    if (products) {
        //const product = createCategories(products);
        res.status(200).json({ products });
    } else {
        throw new Error('category not found')
    }



})


const getTree = asyncHandler( async (req, res) => { 
    const products = await Product.find({}).sort({ createdAt: -1 });

    if (products) {

        const product = createCategories(products);
        
        res.status(200).json({ product });
    } else {
        throw new Error('category not found')
    }



})

// @desc    Fetch single product
// @route  GET /api/products/:id 
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product is not found')  
    }
 
   
})


// @desc    Create a product
// @route   POST /api/products 
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    descriptionDetail,
    description,
    parentId,
    type
  } = req.body 


  const product = new Product({
    name,
    slug: slugify(name),
    image,
    description,
    descriptionDetail,
    parentId,
    type
    
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})


const getProductsFilter = asyncHandler(async (req, res) => { 

  const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {}
    console.log("ahla");
  const products = await Product.find({ ...keyword })

  res.json( products )
})



/*
// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {

  
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => { 
  const {
    name,
    remise,
    price,
    description,
    image, 
    brand,
    category,
    subCategoryId,
    subCategoryId2,
    countInStock,
    recommander
  } = req.body 

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.remise = remise
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.subCategoryId = subCategoryId
    product.subCategoryId2 = subCategoryId2
    product.countInStock = countInStock 
    product.recommander = recommander

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})




// @desc    Get new products
// @route   GET /api/products/nouveaux
// @access  Public

const getNouveaxProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 })

  res.json(products)
})



// @desc    Get the product by the category
// @route   GET /api/products/category/:category
// @access  Public

const category = asyncHandler(async (req, res) => {
  const pageSize = 50
  const page = Number(req.query.pageNumber) || 1

  
  const products = await Product.find({ category: req.params.category }).limit(pageSize)
    .skip(pageSize * (page - 1)).sort({createdAt: -1})

  const count = await Product.countDocuments({ category: req.params.category })

  if (products) {
    
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
    
  } else { 
    res.status(404)
    throw new Error('Product not found') 
  }
})
 
const SubCategory = asyncHandler(async (req, res) => {
  const pageSize = 50
  const page = Number(req.query.pageNumber) || 1


  const products = await Product.find({ subCategoryId: req.params.category }).limit(pageSize)
    .skip(pageSize * (page - 1)).sort({ createdAt: -1 })

  const count = await Product.countDocuments({ subCategoryId: req.params.category })

  if (products) {

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
  } else { 
    res.status(404)
    throw new Error('Product not found') 
  }
}) 

const SubCategory2 = asyncHandler(async (req, res) => {
  const pageSize = 50
  const page = Number(req.query.pageNumber) || 1


  const products = await Product.find({ subCategoryId2: req.params.category }).limit(pageSize)
    .skip(pageSize * (page - 1)).sort({ createdAt: -1 })

  const count = await Product.countDocuments({ subCategoryId2: req.params.category })

  if (products) {

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
  } else { 
    res.status(404)
    throw new Error('Product not found') 
  }
})
*/

export {
    createProduct,
    getProducts,
    getProductById,
    getProductsFilter,
    /*
    deleteProduct,
    updateProduct,
    createProductReview,
    getTopProducts,
    category,
    SubCategory,
    SubCategory2,
  
  getNouveaxProducts*/
}