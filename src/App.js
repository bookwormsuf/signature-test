import React, { useRef } from "react";
import getStroke from "perfect-freehand";

export default function App() {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const strokesRef = useRef([]);

  const drawAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    // Resize for high-DPI and clear
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    // Draw every stroke
    strokesRef.current.forEach((points) => {
      const stroke = getStroke(points, {
        size: 2,
        thinning: 0.5,
        smoothing: 0.5,
        streamline: 0.5,
        simulatePressure: false,
        start: false, // no start cap
        end: true, // taper at end
        capStart: false,
        capEnd: true, // round cap at end
      });

      ctx.fillStyle = "black";
      ctx.beginPath();
      stroke.forEach(([x, y], i) =>
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      );
      ctx.closePath();
      ctx.fill();
    });
  };

  const handlePointerDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    isDrawingRef.current = true;
    const pt = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      pressure: e.pressure || 0.5,
    };
    strokesRef.current.push([pt]);
    drawAll();
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const pt = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      pressure: e.pressure || 0.5,
    };
    strokesRef.current[strokesRef.current.length - 1].push(pt);
    drawAll();
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  const clearSignature = () => {
    strokesRef.current = [];
    drawAll();
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Simple Form with Tapered Signature</h2>

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
        Signature:
        <br />
        <canvas
          ref={canvasRef}
          style={{
            border: "1px solid #000",
            borderRadius: "4px",
            width: "100%",
            height: "200px",
            touchAction: "none",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      </label>
      <br />
      <br />

      <button
        type="button"
        onClick={clearSignature}
        style={{ marginRight: "1rem" }}
      >
        Clear Signature
      </button>
      <button type="submit">Submit</button>
    </div>
  );
}
