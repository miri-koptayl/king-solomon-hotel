
import RoomList from '../pages/RoomList'
// import Signup from '../pages/Signup'
import Login from '../pages/LogIn';
import CartList from '../pages/CartList';
import RoomDescription from '../components/RoomDescription';
import OrderCompletion from "../pages/OrderCompletion";
import EditRoom from "../pages/Admin"
import UpdateRoom from "../pages/UpdateRoom"
import HomePage from "../pages/HomPage"
import ContactUs from "../components/ContactUs"
import AboutTheHotel from "../components/AboutTheHotel"
import InvitationList from "../pages/InvitationList"
import { Route, Routes } from 'react-router-dom';
const Router = () => {
    return (<Routes>

        <Route path="RoomList" element={<RoomList />} />
        <Route path="logIn" element={<Login />} />
        <Route path="CartList" element={<CartList />} />
        <Route path="RoomList" element={<RoomList />} />
        <Route path="*" element={<HomePage />} />
        <Route path="ContactUs" element={<ContactUs />} />
        <Route path="AboutTheHotel" element={<AboutTheHotel />} />
        <Route path='EditRoom' element={<EditRoom />} />
        <Route path='UpdateRoom' element={<UpdateRoom />} />
        <Route path='OrderCompletion' element={<OrderCompletion />} />
        <Route path='HomePage' element={<HomePage />} />
        <Route path='InvitationList' element={<InvitationList />} />
        <Route path='/RoomDescription/:_id' element={<RoomDescription />} />

       
     
    </Routes>);
}

export default Router;
