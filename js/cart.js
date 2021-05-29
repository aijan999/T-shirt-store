let cartProducts = [];

const getCartProducts = async () => {

    const cart = JSON.parse(localStorage.getItem('cart'));
    const ids = cart.map(({id}) => id);
    const urls = ids.map(id => `http://localhost:3000/products/${id}`);
    const requests = urls.map(url => fetch(url));
    const responses = await Promise.all(requests);
    const fetchedProducts = await Promise.all(responses.map(response => response.json()));

    const data = fetchedProducts.map((product, index) => {
        return {
            ...product,
            quantity: cart[index].quantity
        }
    })
    cartProducts = data;
    return data;
}


function rmvProductFromCart(btn){
    const id = $(btn).data('id');
    const cart = JSON.parse(localStorage.getItem('cart'));
    const updatedCart = cart.filter((product) => product.id!==id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    $(btn).parent().remove();

    cartProducts = cartProducts.filter(product => product.id !== id);
    setCartTotalIntoDOM();
}

function calculateCartTotal(){
    return cartProducts.reduce((accum, product) => accum+product.price, 0);
}

function setCartTotalIntoDOM(){
    const total = calculateCartTotal();
    console.log(total);
    $('#cart-total').text(`${total} $`);
}

function updateQuantity(btn){

    const sign = $(btn).text();
    const quantity = +$(btn).parent().text();

    switch (sign) {
        case '+':
            $(btn).parent().text(quantity+1)
            break;
        case '-':
            $(btn).parent().text(quantity-1)
            break;
    }
}

$(document).ready(() => {
    getCartProducts().then(products => {

        products.forEach(({id, title, image, price, quantity}, index) => {
            $('#cart-body').append(`<tr>
                <th scope="row">${index+1}</th>
                <td style="display: flex; align-items: center;">
                    <p>
                    ${title}
                    </p>
                    <img src="${image}" alt="${title}-image">
                    </td>
                <td>${price} $</td>
                <td>
                <button>-</button>
                ${quantity}
                <button>+</button>
                </td>
                <td onclick="rmvProductFromCart(this)" class="cart-product-remove" data-id="${id}">
                    <img src="./assets/icons/cancel.svg" >
                </td>
            </tr>`)
        })
        setCartTotalIntoDOM()
    })
})

