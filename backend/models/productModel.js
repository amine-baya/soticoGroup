import mongoose from 'mongoose'


const productSchema = mongoose.Schema({

   
    name: {
        type: String, 
        required: true
    },
   image: {
      type: Array,
      required: true,
    },
    description: {
        type: String,
        required: false 
    },
    descriptionDetail: {
        type: Array,
    
    },
    type: {
        type: String,
        default: 'category'
    },

    parentId: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },

}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product