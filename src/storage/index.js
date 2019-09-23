
export const setCartItems = (items) => {
    if(localStorage){
        localStorage.setItem('cartItems', JSON.stringify(items));
    }
}

export const calculateTotalPrice = (quantity, price) => {
    return (quantity * price).toFixed(2);
  }

export const calculateTotalAmount = items => {
return Number(items
    .reduce((acc,item) => acc + item.quantity * item.price,0)
    .toFixed(2))
}


