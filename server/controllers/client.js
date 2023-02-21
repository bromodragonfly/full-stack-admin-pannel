import Product from '../models/Products.js'
import ProductStat from '../models/ProductStats.js'
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()

        const productsWithStats = Promise.all(
            products.map(async (item) => {
                const stat = ProductStat.find({ productId: item._id })
                return {
                    ...item._doc,
                    stat,
                }
            })
        )

        res.status(200).json(productsWithStats)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
