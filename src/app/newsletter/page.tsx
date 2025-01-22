


"use client";

import { useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import validator from "validator";
import { RingLoader } from "react-spinners"; 

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubscribe = async () => {
    if (!validator.isEmail(email)) {
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(""); 

    try {
      
      const response = await fetch("https://6781dc5bc51d092c3dcd84fb.mockapi.io/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatusMessage("Thank you for subscribing!");
        setEmail(""); 
      } else {
        throw new Error("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setStatusMessage(error.message);
      } else {
        setStatusMessage("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black rounded-2xl mx-3 lg:mx-20 my-10 p-6 lg:p-10 flex flex-col lg:flex-row items-center lg:justify-between space-y-6 lg:space-y-0">
 
      <h5 className="text-white text-2xl lg:text-4xl font-bold leading-tight lg:leading-[45px] text-center lg:text-left">
        STAY UP TO DATE ABOUT OUR LATEST OFFERS
      </h5>
      <div className="flex flex-col items-center lg:items-end space-y-3 lg:space-y-4 w-full lg:w-auto">
      
        <div className="flex items-center w-full lg:w-[350px] bg-white rounded-full px-4 py-2 shadow-md">
          <TfiEmail className="text-gray-500 mr-3" />
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-grow bg-transparent focus:outline-none text-sm text-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
          />
        </div>

     
        <button
          onClick={handleSubscribe}
          className="w-full lg:w-[350px] bg-white text-black font-semibold rounded-full py-2 text-center shadow-md hover:bg-gray-100 transition"
          disabled={isSubmitting}
          aria-label={isSubmitting ? "Subscribing to newsletter..." : "Subscribe to newsletter"}
        >
          {isSubmitting ? <RingLoader size={24} color="#000" /> : "Subscribe to Newsletter"}
        </button>

       
        {statusMessage && (
          <p className="text-sm text-center mt-2 text-white">{statusMessage}</p>
        )}
      </div>
    </div>
  );
}
