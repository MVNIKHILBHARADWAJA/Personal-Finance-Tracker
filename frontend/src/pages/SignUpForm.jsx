// SignupForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clientServer from "../config"; 
import "./SignUpForm.css";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
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
      const response = await clientServer.post("/signUp", formData);

      const { token, message } = response.data;

      localStorage.setItem("token", token);

      alert(message);
      navigate("/");
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
    <div className="signup-form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

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

        <button type="submit" className="btn">Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
