import  { useEffect, useState } from "react";
import clientServer from "../config";
import TransactionCard from "../components/TransactionCard";
import "./AllTransactions.css";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");

  const res=await clientServer.get("/transactions", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

        setTransactions(res.data.data);
      } catch (err) {
        if (err.response) {
    console.error("Backend Error:", err.response.data);         
    console.error("Status Code:", err.response.status);         
  }  else {
    console.error("Axios Error:", err.message);
  }
      } 
    };
    fetchTransactions();
  }, []);


  return (
    <>
     <h1>All Transactions</h1>
    <div className="transactions-container">      
       { transactions.map((txn) => (
          <TransactionCard key={txn._id} transaction={txn} />
        ))
      }
    </div>
    </>
  );
};

export default AllTransactions;
