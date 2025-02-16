"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Button from "~/app/_components/ui/button";

const CookiePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check if the cookie exists on initial load
  useEffect(() => {
    const cookieConsent = Cookies.get("cookie_consent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  // Handle acceptance of cookies
  const handleAccept = () => {
    Cookies.set("cookie_consent", "true", { expires: 365 }); // Set consent cookie for 1 year
    setIsVisible(false);
  };

  if (!isVisible) {
    return null; // Don't render the popup if consent is already given
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 shadow-lg">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* Popup Text */}
        <p className="text-sm">
          We use cookies to enhance your experience and analyze site traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies. Learn more in our{" "}
          <a
            href="/privacy-policy"
            className="text-accent underline hover:text-green-400"
          >
            Privacy Policy
          </a>.
        </p>

        {/* Accept Button */}
        <Button
          onClick={handleAccept}
          className="bg-accent hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300 ml-4"
        >
          Accept
        </Button>
      </div>
    </div>
  );
};

export default CookiePopup;
