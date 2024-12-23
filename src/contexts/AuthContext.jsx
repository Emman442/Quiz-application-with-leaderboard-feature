import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import axios from "axios";

export const AdminContext = createContext();

function AdminProvider({ children }) {
  const [cookies, removeCookie] = useCookies();
  const [apiUrl] = useState("https://quiz-app-backend-cy25.onrender.com");
  const [token, setToken] = useState(null);
  const [storedProfile, setStoredProfile] = useState(null);
  const [profile, setProfile] = useState({

    data: {},
  });

  async function getProfileFunction() {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/user/me`, {
        headers: { Authorization:`Bearer ${token}`},
      });
      setProfile({ data: response.data.data.user });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  // useEffect(() => {
    // const storedProfile = JSON.parse(localStorage.getItem("token"));
    // console.log(storedProfile)
    // setStoredProfile(storedProfile);
  //   console.log(localStorage.getItem("token"))
  // }, []);

  useEffect(() => {
    if (storedProfile) {
      setToken(storedProfile?.token);
    }
  }, [storedProfile]);

  useEffect(() => {
    if (token) {
      getProfileFunction();
    }
  }, [token]);

  return (
    <AdminContext.Provider
      value={{
        apiUrl,
        token,
        setToken,
        profile,
        getProfileFunction,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

AdminProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AdminProvider;
