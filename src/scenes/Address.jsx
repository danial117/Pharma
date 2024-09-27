

import NavBar from "./NavBar";
import Footer from "./Footer";
import api from "../utils/api";
import { useEffect, useState } from "react";

import { useSelector,useDispatch } from "react-redux";
import { EditRounded } from "@mui/icons-material";
import { removeItemFromCart } from "../state";
import SpinnerRotating from "../skeleton/spinner";
import { useNavigate } from "react-router-dom";


const states = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' },
   
  ];


  const citiesByState = {
    AL: ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa', 'Hoover', 'Dothan', 'Auburn', 'Decatur', 'Madison'],
    AK: ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Ketchikan', 'Wasilla', 'Kenai', 'Kodiak', 'Bethel', 'Palmer'],
    AZ: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale', 'Glendale', 'Gilbert', 'Tempe', 'Peoria', 'Surprise'],
    AR: ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro', 'North Little Rock', 'Conway', 'Rogers', 'Pine Bluff', 'Bentonville'],
    CA: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'San Jose', 'Fresno', 'Long Beach', 'Oakland', 'Bakersfield', 'Anaheim'],
    CO: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood', 'Thornton', 'Arvada', 'Westminster', 'Pueblo', 'Centennial'],
    CT: ['Bridgeport', 'New Haven', 'Stamford', 'Hartford', 'Waterbury', 'Norwalk', 'Danbury', 'New Britain', 'Bristol', 'Meriden'],
    DE: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna', 'Milford', 'Seaford', 'Georgetown', 'Elsmere', 'New Castle'],
    FL: ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St. Petersburg', 'Hialeah', 'Tallahassee', 'Fort Lauderdale', 'Port St. Lucie', 'Cape Coral'],
    GA: ['Atlanta', 'Augusta', 'Columbus', 'Macon', 'Savannah', 'Athens', 'Sandy Springs', 'Roswell', 'Albany', 'Johns Creek'],
    HI: ['Honolulu', 'Hilo', 'Kailua', 'Kapolei', 'Waipahu', 'Kaneohe', 'Pearl City', 'Mililani', 'Kahului', 'Ewa Beach'],
    ID: ['Boise', 'Meridian', 'Nampa', 'Idaho Falls', 'Pocatello', 'Caldwell', 'Coeur d\'Alene', 'Twin Falls', 'Lewiston', 'Post Falls'],
    IL: ['Chicago', 'Aurora', 'Naperville', 'Joliet', 'Rockford', 'Springfield', 'Elgin', 'Peoria', 'Champaign', 'Waukegan'],
    IN: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel', 'Bloomington', 'Fishers', 'Hammond', 'Gary', 'Muncie'],
    IA: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City', 'Waterloo', 'Ames', 'West Des Moines', 'Council Bluffs', 'Ankeny'],
    KS: ['Wichita', 'Overland Park', 'Kansas City', 'Olathe', 'Topeka', 'Lawrence', 'Shawnee', 'Manhattan', 'Lenexa', 'Salina'],
    KY: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington', 'Richmond', 'Georgetown', 'Florence', 'Hopkinsville', 'Nicholasville'],
    LA: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles', 'Kenner', 'Bossier City', 'Monroe', 'Alexandria', 'Houma'],
    ME: ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn', 'Biddeford', 'Sanford', 'Saco', 'Westbrook', 'Augusta'],
    MD: ['Baltimore', 'Frederick', 'Rockville', 'Gaithersburg', 'Bowie', 'Hagerstown', 'Annapolis', 'College Park', 'Salisbury', 'Laurel'],
    MA: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford', 'Brockton', 'Quincy', 'Lynn', 'Fall River'],
    MI: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Lansing', 'Ann Arbor', 'Flint', 'Dearborn', 'Livonia', 'Troy'],
    MN: ['Minneapolis', 'St. Paul', 'Rochester', 'Duluth', 'Bloomington', 'Brooklyn Park', 'Plymouth', 'St. Cloud', 'Eagan', 'Woodbury'],
    MS: ['Jackson', 'Gulfport', 'Southaven', 'Hattiesburg', 'Biloxi', 'Meridian', 'Tupelo', 'Olive Branch', 'Greenville', 'Horn Lake'],
    MO: ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence', 'Lee\'s Summit', 'O\'Fallon', 'St. Joseph', 'St. Charles', 'St. Peters'],
    MT: ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte', 'Helena', 'Kalispell', 'Havre', 'Anaconda', 'Miles City'],
    NE: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney', 'Fremont', 'Hastings', 'Norfolk', 'North Platte', 'Columbus'],
    NV: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks', 'Carson City', 'Elko', 'Mesquite', 'Boulder City', 'Fallon'],
    NH: ['Manchester', 'Nashua', 'Concord', 'Derry', 'Rochester', 'Salem', 'Dover', 'Merrimack', 'Hudson', 'Londonderry'],
    NJ: ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Edison', 'Woodbridge', 'Lakewood', 'Toms River', 'Hamilton', 'Trenton'],
    NM: ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell', 'Farmington', 'Clovis', 'Hobbs', 'Alamogordo', 'Carlsbad'],
    NY: [
      "New York City", "Albany", "Buffalo", "Rochester", "Syracuse", "Yonkers", "Schenectady",
      "Mount Vernon", "Troy", "Niagara Falls", "Binghamton", "Utica", "White Plains", 
      "New Rochelle", "Ithaca", "Poughkeepsie", "Jamestown", "Rome", "Peekskill", 
      "Lockport", "Kingston", "Batavia", "Plattsburgh", "Glens Falls", "Auburn", "Elmira",
      
      // Smaller towns and villages
      "Amherst", "Huntington", "Hempstead", "Clarkstown", "Greenburgh", "Cheektowaga",
      "Ramapo", "Irondequoit", "Tonawanda", "North Hempstead", "Greece", "Perinton",
      "Babylon", "Union", "Smithtown", "Orangetown", "Hamburg", "Colonie", "Henrietta",
      
      // Even smaller locations and hamlets
      "Cortland", "Oneonta", "Ogdensburg", "Massena", "Fulton", "Gloversville", "Oswego",
      "Geneva", "Watertown", "Canandaigua", "Beacon", "Tarrytown", "Medina", "Endicott",
      "West Seneca", "Lackawanna", "Corning", "Malone", "Canton", "Fredonia",
      "Jamesville", // Adding Jamesville
      "Cazenovia", "Dansville", "Skaneateles", "Delhi", "Wappingers Falls"
    ],
    NC: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville', 'Cary', 'Wilmington', 'High Point', 'Asheville'],
    ND: ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo', 'Mandan', 'Dickinson', 'Jamestown', 'Williston', 'Wahpeton'],
    OH: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton', 'Parma', 'Canton', 'Youngstown', 'Lorain'],
    OK: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton', 'Edmond', 'Moore', 'Midwest City', 'Enid', 'Stillwater'],
    OR: ['Portland', 'Eugene', 'Salem', 'Gresham', 'Hillsboro', 'Beaverton', 'Bend', 'Medford', 'Springfield', 'Corvallis'],
    PA: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading', 'Scranton', 'Bethlehem', 'Lancaster', 'Harrisburg', 'Altoona'],
    RI: ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence', 'Woonsocket', 'Coventry', 'Cumberland', 'North Providence', 'West Warwick'],
    SC: ['Columbia', 'Charleston', 'North Charleston', 'Mount Pleasant', 'Rock Hill', 'Greenville', 'Summerville', 'Sumter', 'Hilton Head Island', 'Florence'],
    SD: ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown', 'Mitchell', 'Yankton', 'Pierre', 'Huron', 'Vermillion'],
    TN: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville', 'Murfreesboro', 'Franklin', 'Jackson', 'Johnson City', 'Bartlett'],
    TX: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Laredo'],
    UT: ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem', 'Sandy', 'Ogden', 'St. George', 'Layton', 'Taylorsville'],
    VT: ['Burlington', 'South Burlington', 'Rutland', 'Barre', 'Montpelier', 'Winooski', 'St. Albans', 'Newport', 'Vergennes', 'Essex Junction'],
    VA: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News', 'Alexandria', 'Hampton', 'Roanoke', 'Portsmouth', 'Suffolk'],
    WA: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue', 'Kent', 'Everett', 'Renton', 'Yakima', 'Federal Way'],
    WV: ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg', 'Wheeling', 'Weirton', 'Fairmont', 'Martinsburg', 'Beckley', 'Clarksburg'],
    WI: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine', 'Appleton', 'Waukesha', 'Eau Claire', 'Oshkosh', 'Janesville'],
    WY: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs', 'Sheridan', 'Green River', 'Evanston', 'Riverton', 'Jackson'],
};


const Address=()=>{

  const dispatch=useDispatch()
   const user=useSelector((state)=>state.user)
   const accessToken=useSelector((state)=>state.accessToken)
   const cartItems=useSelector((state)=>state.cartItems);
   const cartItemIds = cartItems.map(item =>
    { 
     const product={product:item._id,quantity:item.quantity}
     return product
 });




    const [formData, setFormData] = useState({
        email:'',
        firstName: '',
        lastName: '',
        streetAddress: '',
        state: '',
        stateCode:'',
        city:'',
        zip:'',
      });
      const [errors, setErrors] = useState({});
      const [address,setAddress]=useState({})
    const [search, setSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [cities, setCities] = useState([]);
    const [edit,setEdit]=useState(false);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate()

    useEffect(()=>{
      try{
        setLoading(true)
      api.get('/address/')
    .then((response)=>response.data).then((data)=>{setFormData(data);  });
      }catch(error){
        setLoading(false)

      }finally{
        setLoading(false)

      }
    
     
  },[])




    const validateForm = () => {
        const newErrors = {};
        // Name validation
        if (!formData.firstName) {
          newErrors.firstName = 'First Name is required.';
      }
        if (formData.firstName && formData.firstName.length < 3) {
          newErrors.firstName = 'Name should be at least 3 characters long.';
        }
       
        if (!formData.lastName) {
            newErrors.lastName = 'lastName is required.';
        }

        if (formData.lastName && formData.lastName.length < 3) {
            newErrors.lastName = 'Name should be at least 3 characters long.';
          }

          if (!formData.zip) {
            newErrors.zip = 'zip code is required.';
        }

        if (formData.zip && formData.zip.length !== 5) {
            newErrors.zip = 'zip code should be at least 5 characters long.';
          }
    

        // Email validation

        if (!formData.email) {
          newErrors.email = 'Email is required.';
      }

        if (formData.email && !formData.email.endsWith('@gmail.com')) {
          newErrors.email = 'Email should end with @gmail.com.';
        }
       
        if (!formData.state) {
            newErrors.state = 'State is required.';
        }
    
        if (!formData.streetAddress) {
            newErrors.streetAddress = 'Street Address is required.';
        }
    
        if (!formData.city && formData.city ==='') {
            newErrors.city = 'City is required.';
        }
       
        return newErrors;
      };


      

      const handleSelect = (name,code) => {
       
        formData.state=name
        formData.stateCode=code
        
        setSearch(name);
        if (citiesByState[code] && citiesByState[code].length > 0) {
          formData.city = citiesByState[code][0];
        } else {
          console.error(`No cities found for state code: ${code}`);
        }
        setCities(citiesByState[code] || []);

      };
    
      const filteredStates = states.filter((state) =>
        state.name.toLowerCase().includes(formData.state ?formData.state.toLowerCase():'')
      );

 

      const handleChange = (e) => {
        const { name, value } = e.target;
       
        setFormData({
          ...formData,
          [name]: value
        });
       
        if (name === 'state') {
          
          
          setShowDropdown(true);
        }
      };















      const handleSubmit = async(e) => {

        e.preventDefault();
        console.log(formData)
        const validationErrors = validateForm();

        if(!edit && user.email){
            formData.email=user.email;
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
          }
          else{
            setErrors({})
          }
        
      try{

      setLoading(true)
          
        // Process the form data (e.g., send it to the server)
       const response= await api.post('/address/create', JSON.stringify(formData), {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response)=>response.data).then((data)=>{

       
        
         

          setFormData({
            email:'',
        firstName: '',
        lastName: '',
        streetAddress: '',
        state: '',
        city:'',
        zip:''
          });
          return 201
        })

        if(response===201){

          api.get('/order/tax').then((response)=>{
            if(response.status === 200 || response.status=== 404 ){
               
              navigate('/order',{replace:true})
              window.location.reload()
            }
          }) }else{
              window.location.href='/createAccount'
        }

      }catch (error) {
        alert('An error occured')
        setLoading(false)
        // Handle error if needed
    } finally {
        setLoading(false);
        
    }

 
      


       
      };



























    return(
        <div>
          {loading && <SpinnerRotating />}
            <NavBar />

            <div className="w-[80%] py-16 mx-auto">

               <p className="font-Lexend text-[2rem]">Add Shipping Address</p>
               <div className="flex flex-col gap-y-4 py-12">


               <div>
               {  edit ? <input className="p-4 w-full border-2 border-gray-300 rounded-md" name='email' value={edit ? formData.email : user.email} onChange={handleChange}  type="text" placeholder="Enter Email Address *" /> :
                 <div className="border-gray-300 rounded-sm text-gray-300 flex flex-row justify-between   bg-gray-100 border-2 p-4"><p>{user.email}</p>  <div className="text-black"><EditRounded onClick={()=>setEdit(true)} style={{cursor:'pointer'}}/> </div>   </div>
                 }
                 {errors.email && <p className="text-red-500 ml-2 font-Lexend ">{errors.email}</p>}
                </div>






               
                <div className="grid grid-cols-2 xs:max-md:grid-cols-1 xs:max-md:gap-y-4 gap-x-6">
                <div>
                <div className="p-4 border-2 border-gray-300 rounded-md">
                <input type="text" value={formData.firstName} onChange={handleChange}
                 name="firstName" placeholder="First Name" className="focus:outline-none"/>
                
                </div>
                {errors.firstName && <p className="text-red-500 ml-2 font-Lexend ">{errors.firstName}</p>}
                </div>


                <div>
                <div className="p-4 border-2 border-gray-300 rounded-md">
                <input value={formData.lastName} onChange={handleChange} name="lastName" type="text" placeholder="Last Name" className="focus:outline-none"/>
                </div>
                {errors.lastName && <p className="text-red-500 font-Lexend ml-2">{errors.lastName}</p>}
                </div>


                </div>

                



                <div>
                <div className="p-4 border-2 w-full relative border-gray-300 rounded-md">
                <input type="text" 
                value={formData.state}
                onChange={handleChange}
                name="state"
                
                
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                placeholder="State" className="focus:outline-none"/>
                {showDropdown && (
        <div className="border border-gray-300 rounded-md mt-1 left-0 bg-white absolute z-10 w-full max-h-60 overflow-y-auto">
          {filteredStates.map((state,index) => (
            <div
              key={index}
              className="p-2 font-Lexend cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect( state.name,state.code)}
            >
              {state.name}
            </div>
          ))}
        </div>
      )}
                </div>
                {errors.state && <p className="text-red-500 font-Lexend ml-2">{errors.state}</p>}
                </div>




                <div>
                <div className="p-4 border-2 w-full relative border-gray-300 rounded-md">
                <input type="text" 
                value={formData.streetAddress}
                onChange={handleChange}
                name="streetAddress"
                placeholder="Street Address" className="focus:outline-none"/>
              
                </div>
                {errors.streetAddress && <p className="text-red-500 font-Lexend ml-2">{errors.streetAddress}</p>}
                </div>










            
         
                <div className="grid grid-cols-2 xs:max-md:grid-cols-1 xs:max-md:gap-y-4 gap-x-6">



                <div>
                <div className="p-4 border-2 border-gray-300 rounded-md">
              <select
                name="city"
                value={formData.city}
                
                onChange={handleChange}
                className="focus:outline-none  w-full"
              >
                <option className="font-Lexend" value={formData.city?formData.city:''}>{formData.city  ?formData.city:'Select City'}</option>
                {cities.map((city,index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
              </div>
              {errors.city && <p className="text-red-500 font-Lexend ml-2">{errors.city}</p>}
            </div>

                <div>
                <div className="p-4 border-2 border-gray-300 rounded-md">
                <input type="text" name="zip" value={formData.zip} onChange={handleChange}  placeholder="Zip Code" className="focus:outline-none"/>
                </div>
                {errors.zip && <p className="text-red-500 font-Lexend ml-2">{errors.zip}</p>}
                </div>



                </div>




                 


                    <button onClick={handleSubmit} type="submit" className="bg-emerald-500 text-white font-Lexend p-4 text-xl my-4">Save and Deliver here</button>

               </div>

            </div>








       <Footer />
        </div>
    )



}







export default Address;
















