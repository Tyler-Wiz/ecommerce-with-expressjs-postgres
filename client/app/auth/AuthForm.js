"use client";

import React, { useState } from "react";
import axios from "axios";

const AuthForm = () => {
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
        "http://localhost:4000/auth/register",
        formData
      );
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error.response.data.error.message);
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
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
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

export default AuthForm;
