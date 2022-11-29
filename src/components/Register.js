import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import "./mix.css"

const Register = () => {

  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    mobile: "",
    place: "",
    password: "",
    cpassword: ""
  });


  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value
      }
    })
  };

  const addUserdata = async (e) => {
    e.preventDefault();

    const { fname, email, mobile, place, password, cpassword } = inpval;

    if (fname === "") {
      alert("please enter your name");
    }
    else if (email === "") {
      alert("please enter your email");
    } else if (mobile === "") {
      alert("please enter your mobile");
    } else if (place === "") {
      alert("please enter your place");
    }
    else if (!email.includes('@')) {
      alert("enter valid email");
    } else if (password === "") {
      alert("please enter your password");
    } else if (password.length < 8) {
      alert("password must be 8 chars")
    } else if (cpassword === "") {
      alert("please enter your confirm password");
    } else if (cpassword.length < 8) {
      alert("cpassword must be 8 chars")
    } else if (password !== cpassword) {
      alert("password and confirm password not match")
    } else {
      // console.log("user registration successfully done");

      const data = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fname, email, mobile, place, password, cpassword
        })
      });

      const res = await data.json();
      console.log(res.status);
      if (res.status === 201) {
        alert("User registration done")
        setInpval({ ...inpval, fname: "", email: "", mobile: "", place: "", password: "", cpassword: "" });
      }

    }
  }

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input type="text" autoComplete='off' onChange={setVal} value={inpval.fname} name="fname" id="fname" placeholder='Enter Your Name' />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input type="email" autoComplete='off' onChange={setVal} value={inpval.email} name='email' id='email' placeholder='Enter Your Email Address' />
            </div>
            <div className="form_input">
              <label htmlFor="fname">Mobile</label>
              <input type="text" autoComplete='off' onChange={setVal} value={inpval.mobile} name="mobile" id="mobile" placeholder='Enter Your Mobile' />
            </div>
            <div className="form_input">
              <label htmlFor="place">Place</label>
              <input type="text" autoComplete='off' onChange={setVal} value={inpval.place} name="place" id="place" placeholder='Enter Your Place' />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your Password' />
                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={setVal} name="cpassword" id="cpassword" placeholder='Enter Your Confirm Password' />
                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className='btn' onClick={addUserdata}>Sign Up</button>
            <p>Already have an account? <NavLink to="/">Log In</NavLink></p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Register