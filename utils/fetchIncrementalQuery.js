const API_URL = 'http://localhost:5000/api/v1/products';
const PRODUCTS_PER_PAGE = 7;

const getproductsPerPage = async (page) => {
    const response = await fetch(`${API_URL}?page=${page}&limit=${PRODUCTS_PER_PAGE}`);
    const data = await response.json();
    console.log({data})
    return data;
}

const getAllProducts = async () => {
    let page = 1;
    let products = [];
    let currentPageItems = await getproductsPerPage(page);

    while (currentPageItems.length > 0) {
        products = products.concat(currentPageItems);
        page++;
        currentPageItems = await getproductsPerPage(page);
    }

    return products;
}

getAllProducts().then(products => console.log(products));
