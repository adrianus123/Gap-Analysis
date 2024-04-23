import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GetToken } from "../apis";
import SpinnerComp from "../components/SpinnerComp";
import PropTypes from "prop-types";

const Authorization = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = GetToken();
      if (data) {
        setToken(data);
      }

      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SpinnerComp />;
  } else if (token && !loading) {
    return children;
  } else {
    return <Navigate to="sign-in" />;
  }
};

Authorization.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Authorization;
