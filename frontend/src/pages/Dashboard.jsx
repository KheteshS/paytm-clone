import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch the balance initially from the correct endpoint
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBalance(response.data.balance); // Assuming the response has the balance in 'data.balance'
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    // Fetch the balance immediately when the component mounts
    fetchBalance();

    // Set up polling to fetch balance every 5 seconds
    const interval = setInterval(() => {
      fetchBalance();
    }, 5000); // Poll every 5 seconds (5000 milliseconds)

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AppBar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </>
  );
};

export default Dashboard;
