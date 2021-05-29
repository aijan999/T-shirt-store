
const getProducts = async () => {
    const response = await fetch('http://localhost:3000/products');

    const data = await response.json();
    return data;
}

const getProduct = async (id) => {
    const response = await fetch(`http://localhost:3000/products/${id}`);

    const data = await response.json();
    return data;
}

