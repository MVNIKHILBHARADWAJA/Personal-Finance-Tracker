import { useState } from "react";
import clientServer from "../config";
import "./AddTransactionForm.css";
import {  useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "income",
    date: "",
    notes: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
              const token = localStorage.getItem("token");

      const res = await clientServer.post(
  "/transactions",
  {
    ...formData,
    amount: Number(formData.amount),
    date: formData.date ? new Date(formData.date) : undefined,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
  navigate("/");
      setFormData({ title: "", amount: "", category: "income", date: "", notes: "" });
      
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
    <div className="add-transaction">
      <h2>Add New Transaction</h2>
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

        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label>Date (Automatically sets todays if no date given):</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <label>Notes (optional):</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
