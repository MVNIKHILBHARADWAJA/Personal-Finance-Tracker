// SignInForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clientServer from "../config";
import "./SignInForm.css";

const SignInForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await clientServer.post("/signIn", formData);

      const { token, message } = response.data;

      localStorage.setItem("token", token);

      alert(message);
      navigate("/"); 
    } catch (err) {
      if (err.response) {
        console.error("Backend Error:", err.response.data);
        alert(err.response.data.message || "Login failed");
      } else {
        console.error("Axios Error:", err.message);
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="signin-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default SignInForm;
