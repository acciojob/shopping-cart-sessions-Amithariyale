// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];
let cart=JSON.parse(sessionStorage.getItem('cart')) ?? [];

// DOM elements
const productList = document.getElementById("product-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button onclick=addToCart(${product.id}) class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
const cartList=document.getElementById("cart-list");
function renderCart() {
	cartList.innerHTML="";
	cart.map((product)=>{
		cartList.innerHTML+=
			`
			<li>${product.name} - $${product.price} <button onclick=removeFromCart(${product.id}) class="remove-from-cart-btn" data-id="${product.id}">Remove from Cart</button></li>
			`
	})
}


// Add item to cart
function addToCart(productId) {
	console.log(productId)
	products.forEach((item)=>{
		if(item.id===productId){
			if(!cart.includes(item))cart.push(item);
			// break;
		}
	})
	console.log(cart);
	sessionStorage.setItem('cart',JSON.stringify(cart));
	renderCart();
}



// Remove item from cart
function removeFromCart(productId) {
	console.log(cart);
	cartList.querySelector(`[data-id="${productId}"`).parentNode.remove();
	cart.forEach((product,i)=>{
		if(product.id===productId){
			cart.splice(i,1);
		}
	})
	console.log(cart);
	sessionStorage.setItem('cart',JSON.stringify(cart));
}


// Clear cart
function clearCart() {
	cart=[];
	sessionStorage.removeItem('cart');
	renderCart()
}

document.getElementById('clear-cart-btn').addEventListener('click',clearCart);
// Initial render
renderProducts();
renderCart();
