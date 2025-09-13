import React from "react";
import { useNavigate } from "react-router-dom";
import "./TransactionCard.css";

const TransactionCard = ({ transaction }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`transaction-card ${transaction.category}`}
      onClick={() => navigate(`/${transaction._id}`)}
    >
      <h3>{transaction.title}</h3>
      <p className={`amount ${transaction.category}`}>
        {transaction.category === "income" ? "+" : "-"}&#8377;{transaction.amount.toLocaleString("en-IN")}
      </p>
      <p className="date">{new Date(transaction.date).toLocaleDateString()}</p>
      <p className="category">{transaction.category}</p>
    </div>
  );
};

export default TransactionCard;
