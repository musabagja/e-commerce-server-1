const { Category, Product } = require('../models/index');

class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll({order: [['name', 'ASC']]});
      res.status(200).json(categories);
    } catch(err) {
      next(err);
    }
  }

  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      const newCategory = await Category.create({ name });
      res.status(201).json(newCategory);
    } catch(err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const product = await Product.findOne({
        where: {
          CategoryId: req.params.id
        }
      })
      if(product) {
        throw {name: 'CategoryHaveProductsInit'}
      }
      const destroyed = await Category.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({message: 'Success delete category'});
    } catch(err) {
      next(err);
    }
  }
}

module.exports = CategoryController;