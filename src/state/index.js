import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import {store} from '../index'
import api from '../utils/api';
const initialState = {
    user:{},
    cartItems:[],
    ItemsQuantity:0,
    accessToken: null, 
}; 

 export const addItemToCartAsync = createAsyncThunk(
  'auth/addItemToCartAsync',
  async ({ product, quantity }, { getState,dispatch }) => {
   
    const state = getState();

    if (state.accessToken) {
       api.get(`/cart/create/${product._id}`)
      .then((response)=>{
        if (response.status === 201) {
          console.log(response)
          dispatch(addItemToCart({product:product,quantity:1}))
        }
      })
     
    } else {
         dispatch(addItemToCart({product:product,quantity:1}))
    }
  }
);





export const removeItemFromCartAsync = createAsyncThunk(
  'auth/removeItemToCartAsync',
  async ({ itemId }, { getState,dispatch }) => {
   
    const state = getState();

    if (state.accessToken) {
       api.delete(`/cart/item/${itemId}`)
      .then((response)=>{
        if (response.status === 200) {
          console.log(response)
          dispatch(removeItemFromCart({itemId:itemId}))
        }
      })
     
    } else {
         dispatch(removeItemFromCart({itemId:itemId}))
    }
  }
);










export const setLogoutAsync = createAsyncThunk(
  'auth/setLogoutAsync',
  async ({}, { getState,dispatch }) => {
   
    const state = getState();
    console.log(state.accessToken)
    if (state.accessToken) {
       api.get(`/user/logout`,{
        withCredentials:true
       })
      .then((response)=>{
        if (response.status === 200) {
          console.log(response)
          dispatch(setLogout())
         
          
        }

        
      })
     
    } else {
     dispatch(setLogout())
    }
  }
);




export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        setUser:(state,action)=>{ 
            state.user=action.payload.user
          },
          setLogout:(state)=>{
            state.user=null;
            state.accessToken = null;
            state.cartItems=[]
          },
      decrementItemQuantity: (state, action) => {
        const { itemId } = action.payload;
        console.log(itemId)
        const itemToDecrement = state.cartItems.find((item) => item._id === itemId);
  
        if (itemToDecrement && itemToDecrement.quantity > 1) {
          itemToDecrement.quantity -= 1;
          state.ItemsQuantity -= 1;
        }
      },
      removeItemFromCart: (state, action) => {
        const { itemId } = action.payload;
        
        const indexToRemove = state.cartItems.findIndex((item) => item._id === itemId);
        
        if (indexToRemove !== -1) {
          state.ItemsQuantity -= state.cartItems[indexToRemove].quantity;
          state.cartItems.splice(indexToRemove, 1);
        }
      },
      incrementItemQuantity: (state, action) => {
        const { itemId } = action.payload;
        
        const itemToDecrement = state.cartItems.find((item) => item._id === itemId);
  
        if (itemToDecrement && itemToDecrement.quantity >= 1) {
          itemToDecrement.quantity += 1;
          state.ItemsQuantity += 1;
        }
      },
      setAccessToken: (state, action) => {
          state.accessToken = action.payload.accessToken;
      },
      clearAccessToken: (state) => {
          state.accessToken = null;
      },
       addItemToCart: (state, action) => {
      const { product, quantity } = action.payload;
     
      const existingItem = state.cartItems.find((cartItem) => cartItem._id === product._id);
     
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ ...product, quantity });
      }
      state.ItemsQuantity += quantity;
    }
  }







    
  });

    
  export const {incrementItemQuantity,decrementItemQuantity,removeItemFromCart,setUser,setLogout,setAccessToken,clearAccessToken,addItemToCart} =
  authSlice.actions;

export default authSlice.reducer;