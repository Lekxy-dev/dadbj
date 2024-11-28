"use client";

import { useCart } from "@/hooks/useCart";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

const CheckoutClient = () => {
  const { cartPs, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
 const [error, setError] = useState(false)
  const router = useRouter();
  console.log("payint",paymentIntent)
  console.log("clientsec",clientSecret)
  useEffect(() => {
    if (cartPs && paymentIntent) {
      setLoading(true);

      fetch("/api/payint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartPs,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if(res.status === 401){
             router.push('/login')
          }
          return res.json()
        }).then((data) =>{
            setClientSecret(data.paymentIntent.client_secret);
            handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error) => {
          setError(true);
          console.log("Error", error)
          toast.error("something went wrong")
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [cartPs, paymentIntent, handleSetPaymentIntent]);
       const options: StripeElementsOptions = {
                 clientSecret,
                 appearance:{
                 theme: "stripe",
                 labels:'floating'
                 }
       }
  return (
    <div>
      <h1>Checkout</h1>
    </div>
  );
};

export default CheckoutClient;
