import React, { useState } from 'react'
import { NavLink ,useNavigate} from "react-router-dom"
import "./mix.css"

const Login = () => {

  const history = useNavigate();

  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: ""
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

  const loginuser = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if(email === ""){
      alert("please enter your email");
    }else if(!email.includes('@')){
      alert("enter valid email");
    }else if(password === ""){
      alert("please enter your password");
    }else if(password.length < 8){
      alert("password must be 8 chars")
    }else{
      // console.log("user login successfully done");

      const data = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      });

      const res = await data.json();
      console.log(res);

      if (res.status === 201) {
        localStorage.setItem("usersdatatoken",res.result.token);
        history("/dash")
        setInpval({ ...inpval, email: "", password: ""});
      }else{
        alert("Invalid email or password")
      }
    }
  }

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please login.</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input type="email" value={inpval.email} onChange={setVal} name='email' id='email' placeholder='Enter Your Email Address' />
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
            <button className='btn' onClick={loginuser}>Login</button>
            <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink> </p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login