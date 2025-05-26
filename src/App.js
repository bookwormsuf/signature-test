import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function App() {
  const sigRef = useRef();

  const clear = () => {
    sigRef.current.clear();
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Simple Form with Signature</h2>

      <label>
        Full Name:
        <br />
        <input type="text" style={{ width: "100%", marginBottom: "1rem" }} />
      </label>
      <br />

      <label>
        Email:
        <br />
        <input type="email" style={{ width: "100%", marginBottom: "1rem" }} />
      </label>
      <br />

      <label>
        Phone:
        <br />
        <input type="tel" style={{ width: "100%", marginBottom: "1rem" }} />
      </label>
      <br />

      <label>
        Signature:
        <br />
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          backgroundColor="white"
          clearOnResize={false}
          canvasProps={{
            width: 500,
            height: 200,
            className: "sigCanvas",
            style: {
              border: "1px solid #000",
              borderRadius: "4px",
              width: "100%",
            },
          }}
        />
      </label>
      <br />
      <br />

      <button type="button" onClick={clear} style={{ marginRight: "1rem" }}>
        Clear Signature
      </button>
      <button type="submit">Submit</button>
    </div>
  );
}
