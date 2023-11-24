import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    work: "",
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const { name, email, phone, password, work } = formData;

    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        work,
      }),
    });
    const data = await res.json();

    if (data.success === false || !data) {
      window.alert("please fill all the details");
    } else {
      window.alert("registration successfull");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="App">
        <form method="POST" onSubmit={submitHandler}>
          <label htmlFor="name"> Name</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            value={formData.name}
            onChange={changeHandler}
          />
          <br />

          <label htmlFor="email">Email Address</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={changeHandler}
          />

          <br />

          <label htmlFor="phone">Phone</label>
          <br />
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={changeHandler}
          />

          <br />

          <label htmlFor="password">password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={formData.password}
            onChange={changeHandler}
          />

          <br />
          <label htmlFor="work">work</label>
          <br />
          <input
            type="text"
            name="work"
            id="work"
            placeholder="work"
            value={formData.work}
            onChange={changeHandler}
          />

          <br />
          <label htmlFor="profile">Profile Image</label>
          <br />
          <button className=" font-bold rounded py-1 px-4 my-4" type="submit">
            register
          </button>
        </form>
      </div>
    </>
  );
}
