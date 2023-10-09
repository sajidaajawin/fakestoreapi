function Product(title, price,image) {
    this.title = title;
    this.price = price;
    this.image = image;
}


const products = [];


async function fetchAndCreateProducts() {
    try {
     
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

 
        data.slice(0, 20).forEach((item) => {
            const product = new Product(
                item.title,
                item.price,
                item.image
            );
            products.push(product);
        });

    
        renderProducts();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function renderProducts() {
    const main = document.getElementById('product-container');
    products.forEach((product) => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
            <h2>${product.title}</h2>
            <p>Price: $${product.price}</p>
            <img src="${product.image}" alt="${product.title}">
        `;

      
        main.appendChild(card);
    });
}


fetchAndCreateProducts();

