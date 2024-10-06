// Store details
const storeName = "TECH PINS";
const storeLocation = "Metro Manila, Las Pinas City";
const storeCapacity = 300; // Maximum number of products that can be held
 

// Product inventory
let products = [
  { name: "Laptop", price: 18999, quantity: 50 },
  { name: "Smartphone", price: 9999, quantity: 100 },
  { name: "Tablet", price: 12999, quantity: 80 }
];


// func for checking the capacity of the inventory 
// if total products is greater than the store capacity 

function checkInventoryCapacity() { 
  const totalProducts = products.reduce((sum, product) => sum + product.quantity, 0);
  if (totalProducts > storeCapacity) { 
    console.log("Store is at full capacity, cannot add new products.");
  }
  return totalProducts;
}

// func to add products to inventory 

function addProduct(productName, price, quantity){
	const totalProducts = checkInventoryCapacity(); 

	if (totalProducts + quantity > storeCapacity){

		console.log('Store is at full capacity, cannot add new products');
		return totalProducts

	} 

	const productIndex = products.findIndex(product => product.name === productName);
	if (productIndex > -1){
		products[productIndex].quantity += quantity;  

	} else{ 
		products.push({name: productName, price, quantity}); 

	}

	return checkInventoryCapacity();


}

function removeProduct(productName, quantity) {
  const productIndex = products.findIndex(product => product.name === productName);
  if (productIndex > -1) {
    if (products[productIndex].quantity >= quantity) {
      products[productIndex].quantity -= quantity;
    } else {
      console.log("Error: Cannot remove more than available quantity.");
    }
  } else {
    console.log("Error: Product not found in inventory.");
  }
} 

function getMostExpensiveProduct() {
  let mostExpensive = products[0];
  
  products.forEach(product => {
    if (product.price > mostExpensive.price) {
      mostExpensive = product;
    }
  });

  return mostExpensive;
}
 

function calculateTotalInventoryValue() {
  return products.reduce((totalValue, product) => totalValue + (product.price * product.quantity), 0);
}



function userInteraction() { 
  // add a product 

  const productName = prompt("Enter the product name to add in the ventory: "); 
  const price = parseFloat(prompt("Enter the product price: "));
  const quantity = parseInt(prompt("Enter the product quantity: " )); 

  addProduct(productName, price, quantity);
  console.log("updated the inventory value: ", calculateTotalInventoryValue()); 

// remove a product 
const removeProductName = prompt("Enter the product name to be removed: ");
const removeQuantity = parseInt(prompt("Enter the quantity to remove: ")); 

removeProduct(removeProductName, removeQuantity); 

//userInteraction(); 
}

// Automatically restock a product if the quantity falls below a specified threshold
function restockProduct(productName, threshold) {
  const productIndex = products.findIndex(product => product.name === productName);
  
  if (productIndex > -1) {
    if (products[productIndex].quantity < threshold) {
      products[productIndex].quantity += 20; // Automatically add 20 units if the quantity is below the threshold
      console.log(`Restocked ${productName} by 20 units. New quantity: ${products[productIndex].quantity}`);
    } else {
      console.log(`${productName} has sufficient quantity, no restocking needed.`);
    }
  } else {
    console.log("Error: Product not found in inventory.");
  }
}


userInteraction(); 
console.log("Store Name:", storeName);
console.log("Store Location:", storeLocation);
console.log("Total Number of Products:", checkInventoryCapacity());
console.log("Total Inventory Value:", calculateTotalInventoryValue());
console.log("Most Expensive Product:", getMostExpensiveProduct().name);
restockProduct("Laptop", 60); // Checks if "Laptop" needs restocking and adds 20 units if necessary
restockProduct("Smartphone", 50); // Checks if "Smartphone" needs restocking and adds 20 units if necessary




