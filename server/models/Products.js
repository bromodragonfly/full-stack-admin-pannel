import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
    {
        name: String,
        prise: Number,
        desription: String,
        category: String,
        reating: Number,
        supply: Number,
    },
    { timestamps: true }
)

const Product = mongoose.model('Product', ProductSchema)
export default Product
