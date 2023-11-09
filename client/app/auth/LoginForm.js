"use client";

import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  axios.defaults.withCredentials = true;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/auth/login",
        formData
      );
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error.response.message);
    }
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label>
        Email Address:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <input type="submit" />
    </form>
  );
};

export default LoginForm;
