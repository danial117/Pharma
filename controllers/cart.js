import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";



// controllers/cartController.js

export const AddToCart = async (req, res) => {
  const { productId,quantity } = req.params;
  const {userId} =req.user;

  

  try {
    // Check if the user has an existing cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the product already exists in the cart items
    const existingItem = cart.items.find(
      item => item.product.toString() === productId.toString()
    );

    if (existingItem) {
      return res.status(400).json({ error: 'Product already exists in the cart' });
    }

    // Add the product to the cart items
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    cart.items.push({ product: productId, quantity: quantity });
    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const GetUserCart=async(req,res)=>{

  try{

    const {userId}=req.user;

    const cart=await Cart.findOne({user:userId}).populate('items.product')

    res.status(200).json(cart)


  }catch(error){
    console.log(error)
  }
}




export const DeleteCartItem=async(req,res)=>{
    const {userId} = req.user; // Assuming userId is available in req.user

    try {
      const cart = await Cart.findOne({ user: userId });
      console.log(cart)
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found for this user' });
      }
  
      // Remove the item from cart.items based on productId
      const updatedItems = cart.items.filter(item => item.product.toString() !== req.params.productId);
     console.log(updatedItems)
      // Update cart.items with the filtered items array
      cart.items = updatedItems;
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({ message: 'Item deleted successfully', cart: cart.items });
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}






export const  AdminGetUserCarts=async(req,res)=>{


  try{

    const carts=await Cart.find({});
    const modifiedCarts = carts.map(cart => {
      const cartObject = cart.toObject(); // Convert Mongoose document to plain JavaScript object
      cartObject.id = cartObject._id;
      delete cartObject._id;
      return cartObject;
    });
    res.set({
      'X-Content-Header': 'application/json',
      'X-Total-Count': modifiedCarts.length,
    });
   

    res.status(200).json(modifiedCarts);



  }catch(error){
    console.log(error)
    res.status(500).json('Internal Server Error')

  }


}








export const incrementDecrementCartItem = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming req.user is populated with user data by authMiddleware
    const { productId } = req.params;
    const { action } = req.body; // action should be either 'increment' or 'decrement'
   console.log(userId)
    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
       
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found for this user' });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
     
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    // Increment or decrement the quantity
    if (action === 'increment') {
      cart.items[itemIndex].quantity += 1;
    } else if (action === 'decrement') {
      cart.items[itemIndex].quantity -= 1;
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1); // Remove item if quantity is 0 or less
      }
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};