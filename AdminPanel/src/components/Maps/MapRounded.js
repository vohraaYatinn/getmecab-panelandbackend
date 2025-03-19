"use client";

import { Card } from "react-bootstrap";

const MapRounded = () => {
  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <h4 className="fs-18 mb-4">Map Rounded</h4>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3498.92412605303!2d77.05877322613952!3d28.721813430019534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sRajeev%20Nagar%2C%20Begumpur%2C%20New%20Delhi-110086%20%20Near%20Radhey%20Krishna%C2%A0Mandir!5e0!3m2!1sen!2sin!4v1737873545590!5m2!1sen!2sin"
            style={{
              border: "0",
              borderRadius: '20px',
              width: "100%",
              display: "block",
              height: "400px",
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Card.Body>
      </Card>
    </>
  );
};

export default MapRounded;
