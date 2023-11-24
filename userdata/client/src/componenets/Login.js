import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
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
    const { email, password } = formData;

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (data.success === false || !data) {
      window.alert("please fill all the details");
    } else {
      window.alert("login successfull");
      navigate("/");
    }
  };
  return (
    <>
      <div className="App">
        <form method="POST" onSubmit={submitHandler}>
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

          <button className=" font-bold rounded py-1 px-4 my-4" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
