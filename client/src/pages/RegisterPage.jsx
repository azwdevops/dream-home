import { Link, useNavigate } from "react-router-dom";
import "@/styles/Register.scss";
import { useState } from "react";
import APIClient from "@/utils/APIClient";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData?.profileImage) {
      return setError("You must select a profile image");
    }
    if (formData?.password != formData?.confirmPassword) {
      return setError("Passwords must match");
    }
    const registerData = new FormData();
    for (const key in formData) {
      registerData.append(key, formData[key]);
    }
    await APIClient.post(`/auth/register`, registerData)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div className="register">
      <div className="register-content">
        {error && <p className="error">{error}</p>}
        <form className="register-content-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData?.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData?.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData?.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData?.confirmPassword}
            onChange={handleChange}
            required
          />
          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p>Upload your profile photo</p>
          </label>
          {formData?.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit">Register</button>
        </form>
        <Link to="/login">Already have an account? Log in here</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
