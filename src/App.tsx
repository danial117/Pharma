import { Admin, Resource,CustomRoutes} from "react-admin";
import customDataProvider from "./dataProvider";
import { authProvider } from "./authProvider";
import ProductsList from "./Data Lists/Products/ProductsList";
import ProductEdit  from "./Data Lists/Products/ProductsEdit";
import './main.css'
import AddressList from "./Data Lists/Addresses/AddressList";
import CustomRecordList from "./Data Lists/Users/UsersList";
import ProductCreate from "./Data Lists/Products/ProductsCreate";
import OrdersList from "./Data Lists/orders/OrdersList";
import CartsList from "./Data Lists/Carts/CartsList";
import { OrderShow } from "./Data Lists/orders/OrdersShow";
import DomList from "./Data Lists/DOM/DOMList";
import { DOM_Show } from "./Data Lists/DOM/DOM_Show";
import DomEdit from "./Data Lists/DOM/DOM_Edit";
import BrandsCreate from "./Data Lists/Brands/BrandsCreate";
import BrandsList from "./Data Lists/Brands/BrandsList";
import OrderEdit from "./Data Lists/orders/OrderEdit";
import MyLoginPage from "./Login/loginPage";
import  SearchData  from "./componenets/searchData";
import { BrowserRouter as Router, useLocation, Route, Routes } from 'react-router-dom';
import { useFetch } from "./context/SearchQueryContext";
import NewsList from "./Data Lists/News/NewsList";
import NewsCreate from "./Data Lists/News/NewsCreate";
import { NewsShow } from "./Data Lists/News/NewsShow";
import NewsEdit from "./Data Lists/News/NewsEdit";
import BrandEdit from "./Data Lists/Brands/BrandsEdit";
import { BrandShow } from "./Data Lists/Brands/BrandShow";
import OtpPage from "./componenets/OTP_Validation";
import ContactList from "./Data Lists/contact/ContactList";
import { ContactShow } from "./Data Lists/contact/ContactShow";
import ProtectedLayout from "./componenets/ProtectedLayout";



const AppContent = () => {
  const location = useLocation();
  const showSearchData = location.pathname !== '/login' ;
  
  const { isFetching } = useFetch();

  return (
    <>
      {showSearchData && <SearchData />}
     {!isFetching &&<div className={`${showSearchData && 'mt-28'} `}>  <Admin  dataProvider={customDataProvider} loginPage={<MyLoginPage />} authProvider={authProvider}>
        <Resource name="users" list={<CustomRecordList resource="user" />} />
        <Resource name="news" list={<NewsList/>} show={NewsShow} create={NewsCreate} edit={NewsEdit} hasCreate hasEdit hasShow/>
        <Resource name="address" list={<AddressList />} />
        <Resource name="order" show={OrderShow} list={<OrdersList />} edit={OrderEdit} hasShow />
        <Resource name="cart" list={<CartsList />} />
        <Resource name="products" list={ProductsList} edit={ProductEdit} create={ProductCreate} hasCreate />
        <Resource name="brands" show={BrandShow} edit={BrandEdit} list={BrandsList} create={BrandsCreate} hasShow hasCreate />
        {/* <Resource name="content" list={DomList} show={DOM_Show} edit={DomEdit} hasEdit hasShow /> */}
        <Resource name="contact"  list={ContactList} show={ContactShow} hasEdit hasShow />
        
      </Admin>
      
      </div>

      }
    </>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="*" element={<AppContent />} />
     
     
    </Routes>
  </Router>
);


 export default App;
