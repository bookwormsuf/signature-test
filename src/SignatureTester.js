import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./signature.css"; // Optional styling

export default function SignatureTester() {
  const sigCanvas = useRef(null);

  const clear = () => sigCanvas.current.clear();
  const save = () => {
    const dataURL = sigCanvas.current.toDataURL();
    console.log("Signature image:", dataURL);
    alert("Signature saved to console");
  };

  return (
    <div>
      <h2>Try signing below</h2>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ width: 500, height: 200, className: "signature-canvas" }}
        minWidth={1}
        maxWidth={3}
        throttle={16}
        backgroundColor="#f0f0f0"
      />
      <br />
      <button onClick={clear}>Clear</button>
      <button onClick={save}>Save</button>
    </div>
  );
}
