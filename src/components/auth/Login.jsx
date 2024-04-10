import React, { useState } from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NavLink } from "react-router-dom";
import "./mix.css";


const Login = () => {

  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: ""

  })

  console.log(inpval);


  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value
      }
    })
  }

  const logInuser = (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if (email === "") {
      alert("please enter your email");

    }
    else if (password === "") {
      alert("enter your password")
    } else if (password.length < 6) {
      alert("password must be 6 char")
    } else {
      console.log("user login successfully done");

      // backend code 

      
    }

  }

  return (
    <>
      <section>
        <div className='form_data' >
          <div className='form_heading'>
            <h1>Welcome Back, Log In</h1>
            <p>We're delighted to see you again! Please proceed to log in.</p>
          </div>

          <form>
            <div className='form_input'>
              <label className='for-email' htmlFor='email'>Email</label>
              <input type="email" value={inpval.email} onChange={setVal} name="email" id='email' placeholder='Enter Your Email Address'></input>
            </div>

            <div className='form_input'>
              <label htmlFor='password'>Password</label>
              <div className='two' >
                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id='password' placeholder='Enter Your Password'></input>

                <div className='showpass' onClick={() => setPassShow(!passShow)}>
                  {!passShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </div>
              </div>

            </div>
            <button className='btn' onClick={logInuser}>
              Login
            </button>
            <p className='btn-signup'>Don't have an account? <NavLink to="/register">Sign Up</NavLink> </p>
          </form>
        </div>
      </section>

    </>
  )
}

export default Login