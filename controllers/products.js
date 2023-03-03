const Product = require('../models/Product')

// testing
const getAllProducts = async (req, res) => {

    // featured: filter based on true or false, eg: featured=true gives all featured products
    // company: filter specific company, eg: company=ikea gives all ikea products
    // search: find product containing name, eg:name=aa gives products containing letter aa
    // sort: sort based on any field eg: sort=name for a-z, eg: sort=-name for z-a, sort=name,-price for a-z with higher to lower price
    // fields: get only required fields in response, eg: fields=name, price
    // limit: number of products per request, eg: limit=100
    // page: get the products of a page, eg: if products.length=23, limit=7, pages = 7-7-7-2, page=2 gives the second 7 products
    const { featured, company, search, sort, fields, limit, page, numericFilters } = req.query;

    // db search queries - empty fetches all products
    const queryObject = {}

    // filter featured
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    // filter specific company
    if (company) {
        queryObject.company = company;
    }

    // filter products containing name
    if (search) {
        queryObject.name = { $regex: search, $options: 'i' };
    }

    // numeric filter for price and rating
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(>|<|>=|=|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach(item => {

            const [field, operator, value] = item.split('-')

            if (options.includes(field)) {
                queryObject[field] = {
                    [operator]: Number(value)
                }
            }
        });
    }

    // items per request : pagination(default = 1) and limit(default = 10)
    const pagination = Number(page) || 1;
    const paginationLimit = Number(limit) || 10;
    const skip = (pagination - 1) * paginationLimit;

    const products = await Product
        .find(queryObject)
        .sort(sort ? sort.split(',').join(' ') : 'createdAt')
        .select(fields ? fields.split(',').join(' ') : null)
        .limit(limit ? limit : null)
        .skip(skip)
        .limit(paginationLimit);

    res.status(200).json({ nbHits: products.length, products });
};

// const getAllProductsAlternate = async (req, res) => {

//     const { featured, company, name, sort, fields, page, limit } = req.query;

//     // db search queries - empty fetches all products
//     const queryObject = {}

//     // get featured products
//     if (featured) {
//         queryObject.featured = featured === 'true' ? true : false;
//     }

//     // get specific company
//     if (company) {
//         queryObject.company = company;
//     }

//     // get containing name
//     if (name) {
//         queryObject.name = { $regex: name, $options: 'i' };
//     }

//     if()

//     // assigning to variable to avoid 'await' and inline callback chaining.
//     let result = Product.find(queryObject);

//     // sort || default (latest)
//     if (sort) {
//         const sortList = sort.split(',').join(' ');
//         result = result.sort(sortList);
//     } else {
//         result = result.sort('createdAt')
//     }

//     // get certain fields
//     if (fields) {
//         const fieldsList = fields.split(',').join('');
//         result = result.select(fieldsList);
//     }

//     // pagination and limit
//     const pagination = Number(page) || 1;
//     const paginationLimit = Number(limit) || 10;
//     const skip = (pagination - 1) * paginationLimit;

//     result = result.skip(skip).limit(paginationLimit);

//     const products = await result;
//     res.status(200).json({ products, nbHits: products.length });
// };

const getAllProductsTesting = async (req, res) => {
    const products = await Product.find({ price: { $gt: 40 } })
        .sort('price').select('name price');
    res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
    getAllProducts,
    getAllProductsTesting
};
