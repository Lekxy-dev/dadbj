'use client';

import { useCart } from "@/hooks/useCart";
import { formatprice } from "@/Utils/FormatPrice";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../Component/Heading";
import Button from "../Component/Button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret, handleSetPaymentSuccess }) => {
  const { cartTotalAmount,handleCartClear,handleSetPaymentIntent } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatprice(cartTotalAmount);

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

     stripe.confirmPayment({
      elements, redirect: 'if_required'
      
    }).then(result =>{
        if(!result.error){
            toast.success('Checkout Success')

            handleCartClear()
            handleSetPaymentSuccess(true)
            handleSetPaymentIntent(null)
        }
    });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading title="Enter your payment details to complete checkout" />
      </div>
      <h2 className="font-semibold mb-2">Address Information</h2>
      <AddressElement options={{ mode: "shipping", allowedCountries: ["US","NG"] }} />
      <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="py-4 text-center text-slate-700 text-xl font-bold">
        Total: {formattedPrice}
      </div>
     <Button  label={isLoading ? "processing" : "pay now"} disabled={isLoading || !stripe || !elements} onclick={() => {}}/>
    </form>
  );
};

export default CheckoutForm;
