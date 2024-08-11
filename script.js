let cartItems = []; // Holds the items in the cart

function addToCart(name, price, image, clickedElement) {
    // Add product to cart
    const product = { name, price, image };
    cartItems.push(product);

    // Save cart items to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Trigger animation on the specific cart icon
    if (clickedElement) {
        clickedElement.classList.add('cart-animation');

        // Remove animation class after animation ends
        clickedElement.addEventListener('animationend', () => {
            clickedElement.classList.remove('cart-animation');
        }, { once: true });
    }

    // Update the cart quantity badge in the navbar
    updateCartQuantity();
}


function removeFromCart(index) {
    // Remove the item from the cart
    cartItems.splice(index, 1);

    // Save the updated cart items to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update the cart UI
    updateCartUI();
}

function updateCartQuantity() {
    // Update the cart quantity badge in the navbar
    const cartQuantity = document.getElementById('cart-quantity');
    cartQuantity.textContent = cartItems.length;

    // Show or hide the badge based on the quantity
    if (cartItems.length > 0) {
        cartQuantity.style.display = 'inline';
    } else {
        cartQuantity.style.display = 'none';
    }
}

function updateCartUI() {
    const cartTableBody = document.querySelector('#cart-items-table tbody');
    const cartQuantity = document.getElementById('cart-quantity');
    const cartTotal = document.getElementById('cart-total');

    // Clear the current cart items
    cartTableBody.innerHTML = '';

    // Populate the cart items
    let total = 0;
    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" onclick="removeFromCart(${index}); return false;"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><input type="number" value="1" min="1" onchange="updateQuantity(${index}, this.value)"></td>
            <td>$${item.price}</td>
        `;
        cartTableBody.appendChild(row);
        total += item.price;
    });

    // Update the cart quantity badge
    cartQuantity.textContent = cartItems.length;
    cartQuantity.style.display = cartItems.length > 0 ? 'inline' : 'none';

    // Update the cart total
    cartTotal.innerHTML = `<strong>$${total.toFixed(2)}</strong>`;
}

function updateQuantity(index, quantity) {
    const price = cartItems[index].price;
    const subtotalCell = document.querySelector(`#cart-items-table tbody tr:nth-child(${index + 1}) td:last-child`);
    subtotalCell.textContent = `$${(price * quantity).toFixed(2)}`;
    updateCartTotal();
}

function updateCartTotal() {
    const subtotalCells = document.querySelectorAll('#cart-items-table tbody td:last-child');
    let total = 0;
    subtotalCells.forEach(cell => {
        total += parseFloat(cell.textContent.replace('$', ''));
    });
    document.getElementById('cart-total').innerHTML = `<strong>$${total.toFixed(2)}</strong>`;
}

// On page load, update cart UI from localStorage
document.addEventListener('DOMContentLoaded', function () {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = savedCartItems;
    updateCartUI();
});
