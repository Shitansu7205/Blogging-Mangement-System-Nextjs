"use client";
import { FaWhatsapp } from "react-icons/fa";

const Whatsapp = () => {
  return (
    <a
      href="https://wa.me/917205121943"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-widget"
    >
      <FaWhatsapp className="whatsapp-icon" />
      <style jsx global>{`
        .whatsapp-widget {
          position: fixed;
          left: 20px;
          bottom: 20px;
          width: 60px;
          height: 60px;
          background-color: #25d366;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .whatsapp-widget:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
        }

        .whatsapp-icon {
          font-size: 35px;
        }
      `}</style>
    </a>
  );
};

export default Whatsapp;
