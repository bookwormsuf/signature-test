import React, { useEffect, useRef } from "react";
import SignaturePad from "signature_pad";

export default function SignatureField() {
  const canvasRef = useRef(null);
  const sigPadRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = canvas.offsetWidth;
      const height = 200;

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.getContext("2d").scale(ratio, ratio);

      sigPadRef.current = new SignaturePad(canvas, {
        penColor: "black",
        backgroundColor: "white",
      });
    };

    setTimeout(resizeCanvas, 0); // delay for layout
  }, []);

  const clearSignature = () => {
    sigPadRef.current?.clear();
  };

  return (
    <div className="signature-wrapper">
      <canvas
        ref={canvasRef}
        className="signature-canvas"
        style={{
          width: "100%",
          height: "200px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <button type="button" onClick={clearSignature} className="clear-button">
        Clear
      </button>
    </div>
  );
}
