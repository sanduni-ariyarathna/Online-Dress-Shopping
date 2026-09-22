// ====== CART SYSTEM - FIXED VERSION ======
let cart = JSON.parse(localStorage.getItem('cart')) || [];


cart = cart.map(item => {
    if(!item.id) { 
        item.id = item.name + "-" + (item.size || "M");
    }
    if(!item.size) { 
        item.size = "M";
    }
    return item;
});
saveCart();


function loadCart() {
    const cartItems = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    if(!cartItems) return;

    cartItems.innerHTML = "";
    let subtotal = 0;

    if(cart.length === 0){
        cartItems.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:40px;">Your cart is empty 😔 <br><a href="shop.html" style="color:var(--pink);">Continue Shopping</a></td></tr>`;
    } else {
        cart.forEach((item, index) => {
            subtotal += item.price * item.qty;
            cartItems.innerHTML += `
            <tr>
                <td><a href="#" onclick="removeItem(${index})"><i class="far fa-times-circle" style="color:red; font-size:18px;"></i></a></td>
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td><b>${item.size}</b></td>
                <td>Rs. ${item.price.toFixed(2)}</td>
                <td><input type="number" value="${item.qty}" min="1" onchange="updateQty(${index}, this.value)"></td>
                <td>Rs. ${(item.price * item.qty).toFixed(2)}</td>
            </tr>
            `;
        });
    }
    if(subtotalEl) subtotalEl.innerText = `Rs. ${subtotal.toFixed(2)}`;
    if(totalEl) totalEl.innerText = `Rs. ${subtotal.toFixed(2)}`;
    updateCartCount();
}

function removeItem(index){
    cart.splice(index, 1);
    saveCart();
    loadCart();
}

function updateQty(index, qty){
    cart[index].qty = parseInt(qty);
    if(cart[index].qty < 1) cart[index].qty = 1;
    saveCart();
    loadCart();
}


function addToCartFromProduct(){
    let name = document.getElementById('product-name').innerText;
    let priceText = document.getElementById('product-price').innerText;
    let price = parseFloat(priceText.replace('Rs. ', '').replace(',', ''));
    let image = document.getElementById('MainImg').src;
    let qty = parseInt(document.getElementById('product-qty').value);
    let size = document.getElementById('product-size').value;

    if(size === "Select Size"){
        alert("⚠️ Please Select a Size First!");
        return;
    }

    let cartItemId = name + "-" + size; 
    let existingIndex = cart.findIndex(item => item.id === cartItemId);

    if(existingIndex > -1){
        cart[existingIndex].qty += qty; 
    } else {
        cart.push({id: cartItemId, name, price, image, qty, size}); 
    }
    saveCart();
    alert(`✅ ${name} - Size: ${size} x ${qty} added to cart!`);
}

function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount(){
    let countEl = document.getElementById('cart-count');
    if(countEl) {
        let totalQty = cart.reduce((total, item) => total + item.qty, 0);
        countEl.innerText = totalQty;
    }
}

function checkout(){
    if(cart.length === 0){
        alert("Your cart is empty!");
    } else {
        let message = "Hi YOUR CHOICE OUR DRESS,%0A I want to place an order:%0A%0A";
        cart.forEach(item => {
            message += `*${item.name}*%0A Size: ${item.size} x ${item.qty} = Rs.${(item.price * item.qty).toFixed(2)}%0A%0A`;
        });
        message += `*Total: ${document.getElementById('cart-total').innerText}*%0A%0AName: %0AAddress: %0APhone: `;
        window.open(`https://wa.me/94765468943?text=${message}`, '_blank');
    }
}

document.addEventListener('DOMContentLoaded', function(){
    loadCart();
    updateCartCount();
});


/*checkout*/

function loadCheckout() {
    const orderItems = document.getElementById('order-items');
    const subtotalEl = document.getElementById('order-subtotal');
    const totalEl = document.getElementById('order-total');
    if(!orderItems) return; 

    if(cart.length === 0){
        window.location.href = "cart.html"; 
        return;
    }

    orderItems.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        orderItems.innerHTML += `
            <div class="order-item">
                <span>${item.name} - ${item.size} x ${item.qty}</span>
                <span>Rs. ${(item.price * item.qty).toFixed(2)}</span>
            </div>
        `;
    });

    subtotalEl.innerText = `Rs. ${subtotal.toFixed(2)}`;
    totalEl.innerText = `Rs. ${subtotal.toFixed(2)}`;
}


function placeOrder(){

    
    
   
    
    localStorage.clear(); 
    alert("Order sent to WhatsApp! We will contact you soon.");
    window.location.href = "index.html";
}

// DOM LOAD EKE
document.addEventListener('DOMContentLoaded', function(){
    loadCart();
    loadCheckout(); 
    updateCartCount();
});