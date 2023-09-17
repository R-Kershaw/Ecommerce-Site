//export restful functions to be used elsewhere
//use the fakeStoreAPI for now but replace the code when the custom backend is completed

/*** products ***/
//GET
export async function getAllProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

//GET
export async function getSingleProduct() {
    try {

    } catch (error) {

    }
}

//GET
export async function getAllCategories() {
    try {

    } catch (error) {

    }
}

//GET
export async function getProductsInCategory(category) {
    try {

    } catch (error) {

    }
}

/*** cart ***/
//GET
export async function getCartItems() {
    try {

    } catch (error) {

    }
}

//POST
export async function addCartItem(item) {
    try {

    } catch (error) {

    }
}

//PATCH
export async function editCartItem(item) {
    try {

    } catch (error) {

    }
}

//DELETE
export async function deleteCartItem(item) {
    try {

    } catch (error) {

    }
}

/*** orders ***/
//GET
export async function getAllOrders() {
    try {

    } catch (error) {

    }
}

//GET
export async function getOrder(order) {
    try {

    } catch (error) {

    }
}

/*** users ***/
//POST
export async function registerUser(username, password) {
    try {

    } catch (error) {

    }
}

//POST
export async function signInUser(username, password) {
    try {

    } catch (error) {

    }
}

//GET
export async function getCurrentUser() {
    try {

    } catch (error) {

    }
}