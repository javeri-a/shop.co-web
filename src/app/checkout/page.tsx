

"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "./action";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    createPaymentIntent().then((res) => {
      setClientSecret(res.clientSecret);
    });
  }, []);

  if (!clientSecret) {
    return <div className="flex justify-center items-center min-h-screen text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({ elements, redirect: "if_required" });

    if (error) {
      setErrorMessage(error.message || "An unknown error occurred");
      setIsProcessing(false);
    } else {
      setErrorMessage(null);
      alert("Thanks for shopping! Payment successful!");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement className="border p-4 rounded-lg shadow-sm" />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {errorMessage && <div className="text-red-500 text-sm text-center">{errorMessage}</div>}
    </form>
  );
}
