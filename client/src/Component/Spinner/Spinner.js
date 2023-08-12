import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";

const Spinner = () => {
  const Navigate = useNavigate();
  const Location = useLocation();

  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
      count === 0 &&
        Navigate("/login ", {
          state: Location.pathname,
        });
    }, [1000]);

    return () => clearInterval(interval);
  }, [count, Navigate, Location]);

  return (
    <div className="custom-container">
      <h3>You Will Be Redirected In {count} Seconds</h3>
      <span class="loader"></span>
    </div>
  );
};

export default Spinner;
