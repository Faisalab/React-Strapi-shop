
export const setCartItems = (items) => {
    if(localStorage){
        localStorage.setItem('cartItems', JSON.stringify(items));
    }
}

export const getCartItems = (key) => {
    let items
    if (localStorage.getItem(key)){
        items = JSON.parse(localStorage.getItem(key)) 
    } else {
        items = []
    }
}

export const calculateTotalPrice = (quantity, price) => {
    return (quantity * price).toFixed(2);
  }


