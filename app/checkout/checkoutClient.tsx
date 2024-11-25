"use client"

import { useCart } from "@/hooks/useCart";
import { useEffect } from "react";

const CheckoutClient = () => {
    const {cartPs,paymentIntent,handleSetPaymentIntent} = useCart()

    useEffect(() =>{
     
    },[cartPs,paymentIntent])
    return  <>
 Checkout
    </>
}
 
export default CheckoutClient;