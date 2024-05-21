import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext(); 

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, {
        id: action.id,
        name: action.name,
        price: action.price,
        qty: action.qty,
        size: action.size,
        img: action.img // Assuming you intend to pass an image URL as well
      }];
    case "REMOVE":
      return state.filter((_, index) => index !== action.index);
    case "DROP":
      return [];
    case "UPDATE":
      const item = state.find((item) => item.id === action.id);
      if (item) {
        item.qty = parseInt(action.qty) + item.qty;
        item.price = action.price + item.price;
      }
      return state;
    default:
      console.log("error in reducer");
      return state;
  }
};

export const CartProvider = ({ children }) => { 
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}> 
      <CartStateContext.Provider value={state}> 
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
