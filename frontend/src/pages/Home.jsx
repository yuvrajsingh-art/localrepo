import React  from "react";
import {useSelector} from "react-redux"
import UserDashboard from "../components/userDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliveryBoy from "../components/DeliveryBoy";
import Nev from "../components/Nav";

function Home(){
    const {userData}=useSelector(state=>state.user);
    // const initialUserData = JSON.parse(localStorage.getItem("userData")) || null;
    // const userData=initialUserData.user
    console.log("userdata",userData)
    return (

        <div className="w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]">
            <Nev/>
            {userData?.role=="user"&& <UserDashboard/>}
            {userData?.role=="owner"&& <OwnerDashboard/>}
            {userData?.role=="deliveryBoy"&& <DeliveryBoy/>} 
            {!userData?.role && <div>no role found or not logged in.</div>} 
        </div>
    )
}

export default Home;