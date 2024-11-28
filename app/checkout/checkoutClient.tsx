"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CheckoutClient = () => {
  const { cartPs, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

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
          // Check if response is OK (status 200-299)
          if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
          }

          return res.text(); // First, get the response as text to inspect it
        })
        .then((text) => {
          if (!text) {
            throw new Error("Empty response body from API.");
          }

          // Try parsing the response as JSON
          const data = JSON.parse(text);

          // Handle the client secret if it's returned
          if (data.paymentIntent?.client_secret) {
            setClientSecret(data.paymentIntent.client_secret);
            handleSetPaymentIntent(data.paymentIntent.id);
          } else {
            throw new Error("Invalid response structure. Missing client_secret.");
          }
        })
        .catch((error) => {
          console.error("Error in checkout process:", error);
          // Optionally, show a toast or alert to the user
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [cartPs, paymentIntent, handleSetPaymentIntent]);

  return (
    <div>
      <h1>Checkout</h1>
    </div>
  );
};

export default CheckoutClient;
