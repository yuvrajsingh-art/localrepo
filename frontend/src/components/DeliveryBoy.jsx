import React, { useState } from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect } from "react";

function DeliveryBoy() {
    const {userData}=useSelector(state=>state.user)
    const [availableAssignments,setAvailableAssignments]=useState(null)  
    const getAssignments=async()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/order/get-assignments`,{withCredentials:true})
            setAvailableAssignments(result.data)
           
            
        } catch (error) {
            
        }
    }
       const acceptOrder=async (assignmentId)=>{
        try {
            const result=await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`,{withCredentials:true})
            console.log(result.data);
            
        } catch (error) {
            console.log(error);
            
        }
       }

    useEffect(()=>{
        getAssignments()
    },[userData])
    return (
        <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-auto">
            <Nav/>
            <div className="w-full max-w-[800px] flex flex-col gap-5 items-center">
                <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-start text-center gap-2 items-center w-[90%] border border-orange-100">
                    <h1 className="text-xl font-bold text-[#ff4d2d]">Welcome, {userData.fullName}</h1>
                    <p className="text-[#ff4d2d]"><span className="font-semibold">latitude:</span> {userData.location.coordinates[1]},<span className="font-semibold">longitude:</span > {userData.location.coordinates[0]}</p>

                </div>
                 <div className="bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100">
                    <h1 className="text-lg font-bold mb-4 flex items-center gap-2">Available Orders</h1>
                    <div className="space-y-4">
                       {availableAssignments?.length>0
                       ?
                    (
                        availableAssignments.map((a,index)=>(
                            <div className="border rounded-lg p-4 flex justify-between items-center" key={index}>
                                    <div>
                                        <p className="text-sm font-semibold">{a?.shopName}</p>
                                        <p className="text-sm text-gray-500"><span className="font-semibold">Delivery Address:</span>{a?.deliveryAddress.text}</p>
                                        <p className="text-sm text-gray-400">{a.items.length} items | {a.subtotal}</p>
                                    </div>
                                    <button className="bg-orange-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-600" onClick={()=>acceptOrder(a.assignmentId)}>Accept</button>
                            </div>
                        ))
                    ):<p className="text-gray-400 text-sm">No Available Orders</p>}
                    </div>

                 </div>
            </div>
           
        </div>
    )
}
export default DeliveryBoy;