"use client";

import { useCart } from "@/hooks/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm from "./CheckoutForm"; 
import Button from "../Component/Button";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutClient = () => {
  const { cartPs, paymentIntent, handleSetPaymentIntent } = useCart(); 
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false); 
  const router = useRouter();

  console.log("paymentIntent", paymentIntent);
  console.log("clientSecret", clientSecret);

  useEffect(() => {
    if (cartPs) {
      setLoading(true);

      fetch('api/payint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartPs,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            router.push("/login");
          }
          return res.json();
        })
        .then((data) => {
            setClientSecret(data.paymentIntent.client_secret);
            handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error) => {
          setError(true);
          toast.error("Something went wrongs");
          console.error("Error:", error);
        })
    }
  }, [cartPs, paymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: "stripe", labels: "floating" },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div>

{clientSecret && cartPs && !paymentSuccess && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} handleSetPaymentSuccess={handleSetPaymentSuccess} />
        </Elements>
      )}
      
      {loading && <div className="text-center">Loading Checkout...</div>}
      
      
      {error && <div className="text-center text-red-500">Something went wrong</div>}
      
      
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-teal-500 text-center">Payment Success</div>
          <div className="max-w-[220px] w-full">
            <Button label="View Your Orders" onclick={() => router.push("/order")} />
          </div>
        </div>
      )}
      
    
      
    </div>
  );
};

export default CheckoutClient;
