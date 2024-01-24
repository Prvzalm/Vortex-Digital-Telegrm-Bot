// src/App.js
import { useEffect, useState } from "react";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Components/Dashboard.jsx";
import Layout from "./Components/Layout.jsx";
import Customer from "./Components/Customer.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";
import Report from "./Components/Report.jsx";

function App() {

  const [chatMembers, setChatMembers] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "/api/chatMembers"
      );
      setChatMembers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Initial data fetch
  fetchData();
}, [chatMembers]); // Empty dependency array ensures that the effect runs only once on mount

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Dashboard chatMembers={chatMembers} />,
        },
        {
          path: "dashboard",
          element: <Dashboard chatMembers={chatMembers} />,
        },
        {
          path: "customer",
          element: <Customer chatMembers={chatMembers} />,
        },
        {
          path: "report",
          element: <Report chatMembers={chatMembers} />,
        },
      ],
    },
  ]);

  return (
    <div className="row container-fluid">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
