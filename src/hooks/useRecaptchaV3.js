import { useCallback, useEffect, useState } from "react";
import { RECAPTCHA_SITE_KEY } from "../utils/constants";

const getKeyError = () => {
  if (!RECAPTCHA_SITE_KEY) return "reCAPTCHA site key is not configured";
  if (!RECAPTCHA_SITE_KEY.startsWith("6L"))
    return 'Invalid reCAPTCHA v3 site key format. Keys should start with "6L"';
  return null;
};

/**
 * Custom hook for Google reCAPTCHA v3
 *
 * reCAPTCHA v3 runs in the background and doesn't show a checkbox.
 * It returns a score (0.0 to 1.0) and a token that should be verified on the backend.
 *
 * @param {{ action?: string }} [options]
 */
const useRecaptchaV3 = ({ action = "submit" } = {}) => {
  const keyError = getKeyError();
  const [isLoaded, setIsLoaded] = useState(
    () => !keyError && !!window.grecaptcha,
  );
  const [error, setError] = useState(/** @type {string | null} */ (keyError));

  useEffect(() => {
    if (keyError || isLoaded) return;

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsLoaded(true);
          setError(null);
        });
      } else {
        setError("Failed to load reCAPTCHA script");
      }
    };

    script.onerror = () => {
      setError(
        "Failed to load reCAPTCHA script. Please check your internet connection.",
      );
      setIsLoaded(false);
    };

    document.head.appendChild(script);

    return () => {};
  }, [keyError, isLoaded]);

  const executeRecaptcha = useCallback(async () => {
    if (!RECAPTCHA_SITE_KEY) {
      setError("reCAPTCHA site key is not configured");
      return null;
    }

    if (!isLoaded) {
      setError(
        "reCAPTCHA is not loaded yet. Please wait a moment and try again.",
      );
      return null;
    }

    if (!window.grecaptcha) {
      setError("reCAPTCHA is not available. Please refresh the page.");
      return null;
    }

    try {
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action,
      });
      setError(null);
      return token;
    } catch (err) {
      const errorMessage = err?.message || "Failed to execute reCAPTCHA";
      setError(errorMessage);
      console.error("reCAPTCHA execution error:", err);
      return null;
    }
  }, [action, isLoaded]);

  return { executeRecaptcha, isLoaded, error };
};

export default useRecaptchaV3;
