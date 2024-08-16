

import { padding } from '@mui/system';
import React from 'react';
import { useMediaQuery } from '@mui/material';




const UserData = ({ user, order, cart, address,product }) => {

  const isMobile = useMediaQuery('(max-width:768px)');

  const styles = {
    container: {
      width: isMobile?'100%':'80%',
      margin: '0 auto',
      marginTop:isMobile?'40px':'',
      height:'auto',
      padding: isMobile?'2px':'20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    userSection: {
      
      backgroundColor: '#f4f4f4',
      margin:'15px',
      overflowY:'scroll',
      height:'500px',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    profileImage: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      display: 'block',
      margin: '0 auto',
    },
    orderSection: {
      
      backgroundColor: '#e8f5e9',
      margin: '15px',
      overflowY:'scroll',
      height:'500px',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    cartSection: {
      
      backgroundColor: '#fff3e0',
      padding: '15px',
      overflowY:'scroll',
      height:'500px',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    addressSection: {
      
      backgroundColor: '#e3f2fd',
      padding: isMobile?'4px':'15px',
      overflowY:'scroll',
      height:'500px',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    productSection: {
      backgroundColor: '#f3e5f5',
      padding: '15px',
      overflowY: 'scroll',
      height: 'auto',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    productImage: {
      width: '150px',
      height: '150px',
      borderRadius: '8px',
      display: 'block',
      margin: '0 auto',
    },
  };




  return (
    <div  className='relative ' style={styles.container}>
    
    
    {user && (
  <div className='' style={styles.userSection}>
    <h2 className='font-Abel text-[2rem] text-center'>User Information</h2>
    <img src={user.picturePath ? user.picturePath : `${process.env.VITE_API_URL}/assets/products/404.jpeg`}  alt={user.name || 'No name'} style={styles.profileImage} />
    <p className='font-Lexend ml-2'><strong>User ID:</strong> {user._id || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Name:</strong> {user.name || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Email:</strong> {user.email || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Google ID:</strong> {user.googleId || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Authentication Method:</strong> {user.authenticationMethod || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Created At:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Updated At:</strong> {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
    <p className='font-Lexend ml-2'><strong>Password:</strong> {user.password || 'N/A'}</p>
  </div>
)}

      {order && (
  <div className='' style={styles.orderSection}>
    <h2 className='font-Abel text-[2rem] text-center'>Order Information</h2>
    <p className='font-Lexend ml-2'>
      <strong>Order Number:</strong> {order.orderNumber || 'N/A'}
    </p>
    <p className='font-Lexend ml-2'>
      <strong>User ID:</strong> {order.user || 'N/A'}
    </p>
    <p className='font-Lexend ml-2'>
      <strong>Items:</strong> {order.items?.length ? order.items.join(', ') : 'No items'}
    </p>
    <p className='font-Lexend ml-2'>
      <strong>Tax:</strong> ${order.tax?.toFixed(2) || '0.00'}
    </p>
    <p className='font-Lexend ml-2'>
      <strong>Payment Method:</strong> {order.paymentMethod || 'N/A'}
    </p>
    <p className='font-Lexend ml-2'>
      <strong>Payment Status:</strong> {order.paymentStatus || 'N/A'}
    </p>
    <p className='font-Lexend ml-2'>
      <strong>Order Status:</strong> {order.orderStatus || 'N/A'}
    </p>
    <p className='font-Lexend ml-2'>
      <strong>Total Amount:</strong> ${order.totalAmount?.toFixed(2) || '0.00'}
    </p>
    <p className='font-Lexend ml-2'>
      <strong>Items Amount:</strong> ${order.itemsAmount?.toFixed(2) || '0.00'}
    </p>
    <p className='font-Lexend ml-2'>
      <strong>Created At:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
    </p>
    <p className='font-Lexend ml-2'>
      <strong>Updated At:</strong> {order.updatedAt ? new Date(order.updatedAt).toLocaleDateString() : 'N/A'}
    </p>
  </div>
)}

{cart && (
  <div className="cart-section" style={styles.cartSection}>
    <h2 className="font-Abel text-[2rem] text-center">Cart Information</h2>
    <p><strong>User ID:</strong> {cart.user || 'N/A'}</p>
    <div>
      <strong>Items:</strong>
      <ul>
        {cart.items && cart.items.length > 0 ? (
          cart.items.map((item) => (
            <li key={item._id} className="py-2">
              <p><strong>Product Name:</strong> {item.product.name || 'No name'}</p>
              <p><strong>Price:</strong> ${item.product.price?.toFixed(2) || '0.00'}</p>
              <p><strong>Quantity:</strong> {item.quantity || '0'}</p>
            </li>
          ))
        ) : (
          <p>No items in the cart</p>
        )}
      </ul>
    </div>
  </div>
)}


    {address && (
  <div className='' style={styles.addressSection}>
    <h2 className='font-Abel text-[2rem] text-center'>Address Information</h2>
    <p className='font-Lexend ml-2'><strong>User ID:</strong> {address.user || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Email:</strong> {address.email || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>First Name:</strong> {address.firstName || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Last Name:</strong> {address.lastName || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Street Address:</strong> {address.streetAddress || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>City:</strong> {address.city || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>State:</strong> {address.state || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>State Code:</strong> {address.stateCode || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Zip:</strong> {address.zip || 'N/A'}</p>
  </div>
)}

{product && (
  <div style={styles.productSection}>
    <h2 className='font-Abel text-[2rem] text-center'>Product Information</h2>
    <img src={`${process.env.VITE_API_URL}/assets/products/${product.productImage || '404.jpeg'}`} alt={product.name || 'No name'} style={styles.productImage} />
    <p className='font-Lexend ml-2'><strong>Product ID:</strong> {product._id || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Name:</strong> {product.name || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Brand:</strong> {product.brand || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Options:</strong> {product.options || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Categories:</strong> {product.category?.join(', ') || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Dietary Restrictions:</strong> {product.details?.DietaryRestrictions?.join(', ') || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Certificates:</strong> {product.details?.Certifications?.join(', ') || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Price:</strong> ${product.price || '0.00'}</p>
    <p className='font-Lexend ml-2'><strong>Description:</strong> {product.details?.Description || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>Warnings:</strong> {product.details?.Warnings || 'N/A'}</p>
    <p className='font-Lexend ml-2'><strong>More:</strong> {product.details?.More || 'N/A'}</p>
  </div>
)}



    </div>
  );
};



export default UserData;
