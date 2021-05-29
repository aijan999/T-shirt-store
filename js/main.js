const saveToCartBtn = (id) => `<button onclick="saveProductToCart(this)" class="btn btn-success" data-id="${id}">
    <img src="./assets/icons/cart.png" alt="cart-icon">
    </button>`;

const rmvFromCartBtn = (id) => `<button onclick="rmvProductFromCart(this)" class="btn btn-danger" data-id="${id}">
<img src="./assets/icons/cart.png" alt="cart-icon">
</button>`;


function handleProductDetailClick(item){
    const id = $(item).data('id');

    localStorage.setItem('productDetailPageId', id);

    const pathname = window.location.pathname.split('/');
    pathname[pathname.length-1] = 'product_detail.html';

    const productDetailPath = pathname.join('/');
    window.location.pathname = productDetailPath;
}

function saveProductToCart(btn){
    
    const id = $(btn).data('id');

    if(!localStorage.getItem('cart')){
        localStorage.setItem('cart', JSON.stringify([]))
    }

    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.push({id, quantity: 1});
    localStorage.setItem('cart', JSON.stringify(cart));

    $(btn).replaceWith(rmvFromCartBtn(id));

}

function rmvProductFromCart(btn){
    const id = $(btn).data('id');
    const cart = JSON.parse(localStorage.getItem('cart'));
    const updatedCart = cart.filter(product => product.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    $(btn).replaceWith(saveToCartBtn(id));
}

function isProductInCart(id){
    try {
        const cart = JSON.parse(localStorage.getItem('cart'));
        return cart.find(product => product.id === id);
    } catch (error) {
        return false;
    }
}

getProducts().then(products => {

    products.map(({id, title, description, image, price}) => {
        $('.products').append(`
        <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 product-list-item">
            <a href="#!"><img class="card-img-top" src="${image}" alt="..." /></a>
            <div class="card-body">
                <h4 class="card-title"><a data-id="${id}" onclick="handleProductDetailClick(this)">${title}</a></h4>
                <h5>${price}</h5>
                <p class="card-text">${description}</p>
            </div>
            <div class="card-footer"><small class="text-muted">
                ${isProductInCart(id) ? rmvFromCartBtn(id) : saveToCartBtn(id)}
            </small></div>
        </div>
        </div>
        `)
    })    
})

