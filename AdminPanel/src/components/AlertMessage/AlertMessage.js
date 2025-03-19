import React from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ message, variant, onClose }) => {
  if (!message) return null; // If no message, don't render anything

  return (
    <Alert variant={variant} onClose={onClose} dismissible>
      {message}
    </Alert>
  );
};

export default AlertMessage;
