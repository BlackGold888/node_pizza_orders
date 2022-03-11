import { Product } from '../models/product.js';
/**
 * Save product
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const saveProduct = async (req, res) => {
    let ingredients = [];
    for (let i = 0; i < req.body.ingredientName.length; i++) {
        if (req.body.ingredientName[i].length === 0)
            continue;
        ingredients.push({
            name: req.body.ingredientName[i],
            price: req.body.ingredientPrice[i],
            isChecked: false
        });
    }
    try {
        const product = await Product.create({
            name: req.body.name,
            ingredients
        })
      res.redirect('/');
    } catch (e) {
        console.log(e)
    }
}

/**
 * Return all products
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(200).send(products);
}

/**
 * Show product by ID
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const showProduct = async (req, res) => {
    try {
        const {id} = req.query;
        const product = await Product.findById(req.query.id).exec();

        if (!product) {
            res.status(200).send('Product not found');
        }

        res.status(200).send(product);
    } catch (e) {
        res.status(500).send(`${e.message}`);
    }
}

export {
    saveProduct,
    getAllProducts,
    showProduct,
}
