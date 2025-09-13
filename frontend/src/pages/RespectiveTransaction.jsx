import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clientServer from "../config";
import "./RespectiveTransaction.css";
import { useNavigate } from "react-router-dom";


const RespectiveTransaction = () => {
  const { id } = useParams();  
  const [transaction, setTransaction] = useState(null);
    const navigate = useNavigate();


  useEffect(() => {
    const fetchTransaction = async () => {
      try {  
        const token = localStorage.getItem("token");

  

        const res = await clientServer.get(`/transaction/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
        console.log(res.data.data);
        setTransaction(res.data.data);
      } catch (err) {
        if (err.response) {
    console.error("Backend Error:", err.response.data);         
    console.error("Status Code:", err.response.status);         
  }  else {
    console.error("Axios Error:", err.message);
  }
      } 
    };
    fetchTransaction();
  }, [id]);


 const handleDelete = async () => {

      try {
                const token = localStorage.getItem("token");

        await clientServer.delete(`/transaction/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
        navigate("/"); 
      } catch (err) {
if (err.response) {
    console.error("Backend Error:", err.response.data);         
    console.error("Status Code:", err.response.status);         
  }  else {
    console.error("Axios Error:", err.message);
  }      }
    
  };

  const handleUpdate = () => {
    navigate(`/${id}/edit`);
  };


  
  return (
    <>
    <h1>Transaction details</h1>
    {transaction && <div className="transaction-details">
       <h2>{transaction.title}</h2>
<p className={transaction.category === "expense" ? "amount expense" : "amount income"}>
  <b>Amount:</b> ₹{transaction.amount.toLocaleString("en-IN")}
</p>
      <p><b>Date:</b> {new Date(transaction.date).toLocaleDateString()}</p>
      <p><b>Category:</b> {transaction.category}</p>
      {transaction.notes && <p><b>Notes:</b> {transaction.notes}</p>} 
    </div> }
    <div className="transaction-actions">
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
          </div>
    </>
  );
};

export default RespectiveTransaction;
