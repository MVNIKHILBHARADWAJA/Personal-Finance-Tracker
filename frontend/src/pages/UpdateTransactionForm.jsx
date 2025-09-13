import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientServer from "../config";
import "./UpdateTransactionForm.css"; 

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    notes: "",
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
                const token = localStorage.getItem("token");

        const res = await clientServer.get(`/transaction/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
        const tx = res.data.data;
        setFormData({
          title: tx.title,
          amount: tx.amount,
          date: tx.date.split("T")[0], 
          category: tx.category,
          notes: tx.notes || "",
        });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await clientServer.put(`/transaction/${id}`, formData, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
      navigate(`/${id}`); 
    } catch (err) {
     if (err.response) {
    console.error("Backend Error:", err.response.data);         
    console.error("Status Code:", err.response.status);         
  }  else {
    console.error("Axios Error:", err.message);
  }
    }
  };

  return (
    <div className="form-container">
      <h2>Update Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          
        />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <label>Notes:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="update-btn">
          Update Transaction
        </button>
      </form>
    </div>
  );
};

export default UpdateTransaction;
