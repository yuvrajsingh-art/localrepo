import React from "react";
import scooter from "../assets/scooter.png"
import home from "../assets/home.png"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
const deliveryBoyIcon = new L.Icon({
    iconUrl: scooter,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})
const customerIcon = new L.Icon({
    iconUrl: home,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})
function DeliveryBoyTracking({ data }) {

    const deliveryBoylat = data.deliveryBoyLocation.lat
    const deliveryBoylon = data.deliveryBoyLocation.lon
    const customerLat = data.customerLocation.lat
    const customerlon = data.customerLocation.lon

    const path = [
        [deliveryBoylat, deliveryBoylon],
        [customerLat, customerlon]
    ]

    const center = [deliveryBoylat, deliveryBoylon]

    return (
        <div className="w-full h-[400px] mt-3 rounded-xl overflow-hidden shadow-md">
            <MapContainer className={"w-full h-full"} center={center} zoom={16}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
              <Marker position={[deliveryBoylat,deliveryBoylon]} icon={deliveryBoyIcon}>
               <Popup>Delivery Boy</Popup>
              </Marker>
               <Marker position={[customerLat,customerlon]} icon={customerIcon}>
               <Popup>Delivery Boy</Popup>
              </Marker>
      
              <Polyline positions={path} color="blue" weight={4}/>

            </MapContainer>
        </div>
    )
}

export default DeliveryBoyTracking