import Address from '../models/AddressModel.js';
import CustomError from '../utils/ErrorClass.js';

// Controller function to create a new address
export const createAddress = async (req, res,next) => {
  try {
    // Assuming req.user is populated with user data by authMiddleware
    const { userId } = req.user;
    const { firstName, lastName, email, streetAddress, city, state,stateCode,zip } = req.body;

    if (!firstName || !lastName || !email || !streetAddress || !city || !state ||!stateCode ||!zip ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already has an address
    let address = await Address.findOne({ user: userId }).select('email firstname lastname streetAddress state stateCode city zip');

    if (address) {
      // Update existing address
      address.firstName = firstName;
      address.lastName = lastName;
      address.email = email;
      address.streetAddress = streetAddress;
      address.city = city;
      address.stateCode=stateCode;
      address.state = state;
      address.zip=zip;
     
    } else {
      // Create new address
      address = new Address({
        user: userId,
        firstName,
        lastName,
        email,
        streetAddress,
        city,
        stateCode,
        state,
        zip
       
      });
    }

    const savedAddress = await address.save();
    const addressObject = savedAddress.toObject();
      // Delete the 'user' property
      delete addressObject.user;


    res.status(201).json(addressObject);
  } catch (err) {
   
   
      next(new CustomError(err.message, 500));
    
  }
};

  
   

// Controller function to delete a user's address
export const deleteAddress = async (req, res,next) => {
  try {
    // Assuming req.user is populated with user data by authMiddleware
    const { userId } = req.user;
   

    // Check if the user is trying to delete their own address
    if (!userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Delete the address associated with the userId
    const deletedAddress = await Address.findOneAndDelete({ user: userId });

    if (!deletedAddress) {
      return res.status(404).json({ error: 'Address not found for deletion' });
    }

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (err) {
    
      next(new CustomError(err.message, 500));
    
  }
};






  export const getUserAddresses = async (req, res,next) => {
    try {
      // Assuming req.user is populated with user data by authMiddleware
      const { userId } = req.user;
  
      // Find all addresses for the user
      const addresses = await Address.findOne({ user: userId }).select('email firstName lastName streetAddress state stateCode city zip');
      
      if (!addresses || addresses.length === 0) {
        return res.status(404).json({ error: 'No addresses found for user' });
      }
  
      res.status(200).json(addresses);
    } catch (err) {
     
      
        next(new CustomError(err.message, 500));
      
    }
  };









  
  export const GetAdminUserAddresses = async (req, res,next) => {
    try {
      // Extract filter, range, and sort parameters from the query
      const filter = JSON.parse(req.query.filter || '{}');
      const range = JSON.parse(req.query.range || '[0, 10]');
      const sort = JSON.parse(req.query.sort || '["createdAt", "ASC"]');
      
      // Convert the sort array to an object for MongoDB
      const sortObject = {};
      sortObject[sort[0]] = sort[1] === 'DESC' ? -1 : 1;
  
      // Extract pagination parameters
      const skip = range[0];
      const limit = range[1] - range[0] + 1;
  
      // Build the query based on filter
      const query = {};
      if (filter) {
        for (const key in filter) {
          if (filter.hasOwnProperty(key)) {
            // Check if the value is a number or a string
            if (!isNaN(filter[key])) {
              query[key] = filter[key]; // Direct match for numeric fields
            } else {
              query[key] = { $regex: new RegExp(filter[key], 'i') }; // Case-insensitive search for string fields
            }
          }
        }
      }
  
      
      const addresses = await Address.find(query).sort(sortObject).skip(skip).limit(limit);
      const totalAddresses = await Address.countDocuments(query);
  
      
      const modifiedAddresses = addresses.map(address => {
        const addressObject = address.toObject(); // Convert Mongoose document to plain JavaScript object
        addressObject.id = addressObject._id;
        delete addressObject._id;
        return addressObject;
      });
  
      res.set({
        'Content-Range': `orders ${range[0]}-${range[1]}/${totalAddresses}`,
        'X-Total-Count': totalAddresses,
      });
  
      res.status(200).json(modifiedAddresses);
    } catch (err) {
     
    
        next(new CustomError(err.message, 500));
      
    }
  };
