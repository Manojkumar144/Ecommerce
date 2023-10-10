var sellingPrice = document.getElementById('sellingprice');
var productName = document.getElementById('productname');
var category = document.getElementById('category');
var electronicsItems = document.getElementById('electronicItems'); 
var skinCareItems = document.getElementById('skincareItems');
var foodItems = document.getElementById('foodItems');

document.getElementById('button').addEventListener('click', addItems);

// Add items to the Ecommerce application
function addItems() {
  const obj = {
    sellingPrice: sellingPrice.value,
    category: category.value,
    productName: productName.value,
  };

  axios
    .post('https://crudcrud.com/api/4d8ddecddea24f9db53dff397a578756/products', obj)
    .then((res) => {
      console.log(res);
      // After adding an item, call display function to refresh the product list
      display();
    })
    .catch((err) => console.log(err));
}

// Get the products details
function display() {
  axios
    .get('https://crudcrud.com/api/4d8ddecddea24f9db53dff397a578756/products')
    .then((res) => showOutput(res))
    .catch((error) => console.error(error));
}

// Display the details
function showOutput(res) {
    // Clear the existing content in the containers
    electronicsItems.innerHTML = '';
    skinCareItems.innerHTML = '';
    foodItems.innerHTML = '';
  
    // Loop through the array of products in the response
    for (const product of res.data) {
      // Create a list item to hold the product details
      const itemli = document.createElement('li');
  
      // Set the text content of the list item directly
      itemli.textContent = `${product.sellingPrice} - ${product.category} - ${product.productName}`;
  
      // Create a delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.style.marginLeft = '5px';
      deleteButton.style.marginTop = '5px';
  
      deleteButton.addEventListener('click', () => {
        deleteItem(product._id);
      });
  
      // Append the delete button to the list item
      itemli.appendChild(deleteButton);

      if (product.category === 'Electronics') {
        electronicsItems.appendChild(itemli);
      } else if (product.category === 'Skincare') {
        skinCareItems.appendChild(itemli);
      } else {
        foodItems.appendChild(itemli);
      }
    }
  }
  

// Initial display
display();

// Delete Item
function deleteItem(itemId) {
    // Remove the deleted item from the UI
    axios
      .delete(`https://crudcrud.com/api/4d8ddecddea24f9db53dff397a578756/products/${itemId}`)
      .then((res) => {
        console.log('Item deleted successfully:', res);

        // Fetch and display the updated list of products
        display();
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  }
