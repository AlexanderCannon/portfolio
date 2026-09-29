"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Button from "~/app/_components/ui/button";

const CookiePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get("cookie_consent");
    if (!cookieConsent) setIsVisible(true);
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie_consent", "true", { expires: 365 });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/95 px-5 py-4 backdrop-blur-md sm:px-8">
      <div className="mx-auto flex max-w-shell flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
          This site uses cookies for analytics. By continuing you agree — see
          the{" "}
          <a href="/privacy-policy" className="text-accent hover:underline">
            privacy policy
          </a>
          .
        </p>
        <Button onClick={handleAccept} className="shrink-0">
          Accept
        </Button>
      </div>
    </div>
  );
};

export default CookiePopup;
