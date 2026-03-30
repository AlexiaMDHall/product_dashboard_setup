let getProducts = async () => {
    try {
        const response = await fetch('https://www.course-api.com/images/store/product-1.jpeg');
        const products = await response.json();
        console.log(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

function fetchProductsThen() {
    fetch('https://www.course-api.com/javascript-store-products')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok (${response.status})`);
            }
            return response.json();
        })
        .then(products => {
            products.forEach(product => {
                console.log(product.name);
            });
            return products;
        })
        .catch(error => {
            console.error('Error fetching products with fetchProductsThen:', error);
        });
    }
async function fetchProductsAsync() {
    try {
        const response = await fetch('https://www.course-api.com/javascript-store-products');
        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
        }
        const products = await response.json();
        displayProducts(products);
        return products;
    } catch (error) {
        handleError(error);
        throw error;
    }
}

function displayProducts(products) {
    const container = document.querySelector('#product-container');
    if (!container) {
        console.error('displayProducts: #product-container not found');
        return;
    }

    container.innerHTML = ''; // clear existing content

    const firstFive = products.slice(0, 5);
    firstFive.forEach(product => {
        const card = document.createElement('div');
        card.className = 'Product';

        const title = document.createElement('h2');
        title.textContent = product.name || 'Product';

        const img = document.createElement('img');
        img.src = product.image || product.images?.[0] || '';
        img.alt = product.name || 'Product image';
        img.loading = 'lazy';

        const price = document.createElement('p');
        const displayPrice = product.price ? `$${(product.price / 100).toFixed(2)}` : 'Price unavailable';
        price.textContent = `Price: ${displayPrice}`;

        card.appendChild(title);
        card.appendChild(img);
        card.appendChild(price);

        container.appendChild(card);
    });
}
fetchProductsThen();
fetchProductsAsync();


