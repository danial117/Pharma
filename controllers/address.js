import Address from '../models/AddressModel.js';

// Controller function to create a new address
export const createAddress = async (req, res) => {
  try {
    // Assuming req.user is populated with user data by authMiddleware
    const { userId } = req.user;
    const { firstName, lastName, email, streetAddress, city, state,stateCode,zip } = req.body;

    if (!firstName || !lastName || !email || !streetAddress || !city || !state ||!stateCode ||!zip ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already has an address
    let address = await Address.findOne({ user: userId });

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

    res.status(201).json(savedAddress);
  } catch (error) {
    console.error('Error creating or updating address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

  
   

// Controller function to delete a user's address
export const deleteAddress = async (req, res) => {
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
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};






  export const getUserAddresses = async (req, res) => {
    try {
      // Assuming req.user is populated with user data by authMiddleware
      const { userId } = req.user;
  
      // Find all addresses for the user
      const addresses = await Address.findOne({ user: userId });
       console.log(userId, addresses)
      if (!addresses || addresses.length === 0) {
        return res.status(404).json({ error: 'No addresses found for user' });
      }
  
      res.status(200).json(addresses);
    } catch (error) {
      console.error('Error retrieving addresses:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };





  export const GetAdminUserAddresses=async(req,res)=>{

    try{

      const addresses=await Address.find({});
      const modifiedAddresses = addresses.map(address => {
        const addressObject = address.toObject(); // Convert Mongoose document to plain JavaScript object
        addressObject.id = addressObject._id;
        delete addressObject._id;
        return addressObject;
      });
      res.set({
        'X-Content-Header': 'application/json',
        'X-Total-Count': modifiedAddresses.length,
      });
      console.log(modifiedAddresses)
  
      res.status(200).json(modifiedAddresses);
  
  
  
    }catch(error){
      console.log(error)
      res.status(500).json('Internal Server Error')
  
    }


  }