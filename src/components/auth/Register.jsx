import React, { useState } from 'react'
import "./mix.css";
import { AlternateEmail, Backspace, Visibility, VisibilityOff } from '@mui/icons-material';
import { NavLink } from "react-router-dom";


export const Register = () => {


  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setcPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: ""
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

  const addUserdata = async (e) => {
    e.preventDefault();

    const { fname, email, password, cpassword } = inpval;

    if (fname === "") {
      alert("please enter your name");

    } else if (email === "") {
      alert("please enter your email");

    }
    else if (password === "") {
      alert("enter your password")
    } else if (password.length < 6) {
      alert("password must be 6 char")
    } else if (cpassword === "") {
      alert("enter your confirm password")
    } else if (cpassword.length < 6) {
      alert("password must be 6 char")
    } else if (password !== cpassword) {
      alert("password and confirm password not match")
    } else {
      console.log("user registration done")
      
      // Backend code 

      
    }

  }

  return (
    <>
      <section>
        <div className='form_data' >
          <div className='form_heading'>
            <h1>Sign Up</h1>
            <p>We're excited that you'll be using our project to manage your <br />  task! We hope you'll find it enjoyable and useful.</p>
          </div>

          <form>
            <div className='form_input'>
              <label htmlFor='fname'>Name</label>
              <input type="text" onChange={setVal} value={inpval.fname} name="fname" id='fname' placeholder='Enter Your Name'></input>
            </div>

            <div className='form_input'>
              <label htmlFor='email'>Email</label>
              <input type="email" onChange={setVal} value={inpval.email} name="email" id='email' placeholder='Enter Your Email Address'></input>
            </div>

            <div className='form_input'>
              <label htmlFor='password'>Password</label>
              <div className='two' >
                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id='password' placeholder='Enter Your Password'></input>

                <div className='showpass' onClick={() => setPassShow(!passShow)}>
                  {!passShow ? <Visibility /> : <VisibilityOff />}
                </div>
              </div>

            </div>

            <div className='form_input'>
              <label htmlFor='password'>Confirm Password</label>
              <div className='two' >
                <input type={!cpassShow ? "password" : "text"} onChange={setVal} value={inpval.cpassword} name="cpassword" id='cpassword' placeholder='Confirm Password'></input>

                <div className='showpass' onClick={() => setcPassShow(!cpassShow)}>
                  {!cpassShow ? <Visibility /> : <VisibilityOff />}
                </div>
              </div>

            </div>
            <button className='btn' onClick={addUserdata}>
              Sign Up
            </button>
            <p>Already have an account? <NavLink to="/login">Log In</NavLink></p>
          </form>
        </div>
      </section>

    </>
  )
}
