import { useState, useEffect, useContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "./utils/axios.customize.js";
import Header from "./components/layouts/header.jsx";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./components/context/auth.context.jsx";

function App() {
  const [count, setCount] = useState(0);
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/v1/api/account`
      );
      if (res) {
        setAuth({
          isAuthenticated: true,
          user: {
            email: res.data.email,
            name: res.data.name,
          },
        });
      }
      setAppLoading(false);
    };

    fetchAccount();
  }, []);

  return (
    <>
      {appLoading === true ? (
        <>Loading...</>
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </>
  );
}

export default App;
