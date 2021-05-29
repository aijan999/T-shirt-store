

$(document).ready(() => {
    const id = +localStorage.getItem('productDetailPageId')
    
    getProduct(id).then(product => {
        $('main').append(`
        <div class="card mb-3 product_detail">
        <img src="${product.image}" class="card-img-top" alt="${product.title} image">
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
        </div>`)
    })
})

