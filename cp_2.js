let allProducts = [];
let currentIndex = 0;
const pageSize = 5;    

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
    // Save all products and reset state
    allProducts = products;
    currentIndex = 0;

    // Clear the container and show first batch
    document.getElementById('product-container').innerHTML = '';
    loadMoreProducts();

    // Wire up the Load More button
    const btn = document.getElementById('load-more-btn');
    btn.addEventListener('click', loadMoreProducts);

    // Wire up the Reset button
    const resetBtn = document.getElementById('reset-btn');
    resetBtn.addEventListener('click', resetProducts);
}
function resetProducts() {
    // Reset index and clear container
    currentIndex = 0;
    document.getElementById('product-container').innerHTML = '';

    // Show Load More button again
    const btn = document.getElementById('load-more-btn');
    btn.style.display = 'block';

    // Load the first batch
    loadMoreProducts();

    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
}

function loadMoreProducts() {
const container = document.getElementById('product-container');
const btn = document.getElementById('load-more-btn');
// Slice the next 5 products
    const nextBatch = allProducts.slice(currentIndex, currentIndex + PAGE_SIZE);

    nextBatch.forEach(product => {
        const { name, price, image } = product.fields;

        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${image[0].url}" alt="${name}">
            <div class="card-body">
                <h3>${name}</h3>
                <p class="price">$${(price / 100).toFixed(2)}</p>
            </div>
        `;
        container.appendChild(productCard);
    });

    currentIndex += pageSize;

    // Hide button when all products are loaded
    if (currentIndex >= allProducts.length) {
        btn.style.display = 'none';
    }
}
function handleError(error) {
    console.log(`An error occurred: ${error.message}`);
}
fetchProductsThen();
fetchProductsAsync();


