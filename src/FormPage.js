import React from "react";
import SignatureField from "./SignatureField";

export default function FormPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="form-body">
      <h2>Crew Change Form</h2>
      <label>
        Name:
        <input type="text" className="form-input" placeholder="Your name" />
      </label>
      <label>
        Signature:
        <SignatureField />
      </label>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
}
