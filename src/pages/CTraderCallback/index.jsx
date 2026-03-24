import LoadingIndicator from "@/components/LoadingIndicator";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const CTraderCallback = () => {
  const [searchParams] = useSearchParams();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const code = searchParams.get("code");

    if (window.opener) {
      // Running inside a popup — send code back to parent and close
      window.opener.postMessage(
        { type: "CTRADER_CALLBACK", code: code || null },
        window.location.origin,
      );
      window.close();
    }
  }, [searchParams]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "#94a3b8",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <LoadingIndicator />
        <p style={{ marginTop: "1rem" }}>Connecting to CTrader...</p>
      </div>
    </div>
  );
};

export default CTraderCallback;
