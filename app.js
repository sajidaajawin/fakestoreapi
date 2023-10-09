function Product(id, title, price, image) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.image = image;
}

function Product2(id, title, price, image) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.image = image;
}

const products = [];
const products2 = [];

async function fetchAndCreateProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        data.slice(0, 20).forEach((item) => {
            const product = new Product(
                item.id,
                item.title,
                item.price,
                item.image
            );
            products.push(product);
        });

        renderProducts(products);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fetchAndCreateProducts2() {
    try {
 
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();

        data.slice(0, 20).forEach((item) => {
            const product = new Product2(
                item.id,
                item.title,
                item.price,
                item.image
            );
            products2.push(product);
        });

        renderProducts(products2);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderProducts(list) {
    const main = document.getElementById('product-container');

    list.forEach((product) => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <h2>${product.title}</h2>
            <p>Price: $${product.price}</p>
            <img src="${product.image}">
            <button onclick="deleteProduct(${product.id})">Delete</button>
            <button onclick="showUpdateForm(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Update</button>
        `;

        main.appendChild(card);
    });
}


fetchAndCreateProducts();
fetchAndCreateProducts2();

document.getElementById('add-product-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;

    if (title && price && image) {
        const newProduct = {
            id: Date.now(),
            title: title,
            price: parseFloat(price),
            image: image
        };

        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
        .then(response => response.json())
        .then(data => {
            console.log('تمت إضافة المنتج بنجاح:', data);
            location.reload();
        })
        .catch(error => console.error('حدث خطأ أثناء إرسال البيانات:', error));
    } else {
        alert('يرجى ملء جميع الحقول!');
    }
});

function deleteProduct(productId) {
    console.log(productId)
    fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('تم حذف المنتج بنجاح:', data);
    })
    .catch(error => console.error('حدث خطأ أثناء حذف المنتج:', error));
}

function showUpdateForm(id, title, price, image) {
    let popupFormContainer = document.getElementById('popup-form-container');

    if (!popupFormContainer) {
        // إذا لم يتم العثور على العنصر، يمكنك إنشاء العنصر وإضافته إلى الصفحة.
        const body = document.getElementsByTagName('body')[0];
        const newPopupFormContainer = document.createElement('div');
        newPopupFormContainer.id = 'popup-form-container';
        body.appendChild(newPopupFormContainer);

        // الآن يمكننا تعيين العنصر الجديد للمتغير.
        popupFormContainer = newPopupFormContainer;
    }
    const form = `
        <div class="popup-form">
            <form id="update-product-form">
                <input type="hidden" id="update-id" value="${id}">
                <label for="update-title">Title:</label>
                <input type="text" id="update-title" value="${title}" required><br>
                <label for="update-price">Price:</label>
                <input type="number" id="update-price" value="${price}" required><br>
                <label for="update-image">Image URL:</label>
                <input type="text" id="update-image" value="${image}" required><br>
                <button type="button" onclick="updateProduct()">Update Product</button>
                <button type="button" onclick="cancelUpdate()">Cancel</button>
            </form>
        </div>
    `;

    popupFormContainer.innerHTML = form;
}

function updateProduct() {
    const idElement = document.getElementById('update-id');
    const title = document.getElementById('update-title').value;
    const price = document.getElementById('update-price').value;
    const image = document.getElementById('update-image').value;

    // التحقق من أن جميع الحقول تملأ
    if (title && price && image && idElement && idElement.value) {
        const id = idElement.value;

        const updatedProduct = {
            title: title,
            price: parseFloat(price),
            image: image
        };

        fetch(`http://localhost:3000/products/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        })
        .then(response => response.json())
        .then(data => {
            console.log('تم تحديث المنتج بنجاح:', data);
            // إعادة تحميل الصفحة أو تحديث الواجهة بطريقة أخرى
            location.reload();
        })
        .catch(error => console.error('حدث خطأ أثناء تحديث المنتج:', error));
    } else {
        alert('يرجى تحديد المنتج الذي تريد تحديثه!');
    }
}



function cancelUpdate() {
    const popupFormContainer = document.getElementById('popup-form-container');
    popupFormContainer.innerHTML = '';
}