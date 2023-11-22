// components/modal/index.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import "./index.css";

const Modal = ({ isShow, data, onCancel }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    return () => clearTimeout(loaderTimeout);
  }, []);

  return (
    <div className={isShow ? "modal-container" : "hidden"}>
      {isLoading ? (
        <div className="loader-container">
          <HashLoader color="#6d1f09" />
        </div>
      ) : (
        <>
          <div className="modal-header">
            <h3 className="modal-title">Detail Summary</h3>
            <Link to="/" className="back-button" onClick={onCancel}>
              Back
            </Link>
          </div>

          <div className="modal">
            {data && (
              <div className="modal-content">
                <h3>{data.title}</h3>
                <p className="modal-summary">{data.summary}</p>
                <p className="modal-lexile">Lexile: {data.measurements.english.lexile}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;
