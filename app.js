let allProducts = [];

async function loadProducts(){
    let res = await fetch("http://localhost:3000/products");
    allProducts = await res.json();
    show(allProducts);
}

function show(products){
    let container = document.getElementById("products");
    container.innerHTML="";

    products.forEach(p=>{
        container.innerHTML += `
        <div class="product">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>${p.price}</p>

            <a href="https://wa.me/93711817203?text=I want ${p.name}">
            WhatsApp
            </a>
        </div>
        `;
    });
}

function filter(cat){
    let f = allProducts.filter(p=>p.category===cat);
    show(f);
}

loadProducts();