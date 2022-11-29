import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {

    const { id, token } = useParams();

    const history = useNavigate();

    const [passShow, setPassShow] = useState(false);

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const userValid = async () => {
        const res = await fetch(`/forgotpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json()

        if (data.status == 201) {
            console.log("user valid")
        } else {
            history("*")
        }
    }

    const setval = (e) => {
        setPassword(e.target.value)
    }

    const sendpassword = async (e) => {
        e.preventDefault();

        const res = await fetch(`/${id}/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password })
        });

        const data = await res.json()

        if (data.status == 201) {
            setPassword("")
            setMessage(true)
        } else {
            toast.error("! Token Expired generate new LInk", {
                position: "top-center"
            })
        }

    }

    useEffect(() => {
        userValid()
    }, [])

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Enter Your New Password</h1>
                    </div>


                    <form>
                        {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Succesfulyy Update </p> : ""}
                        <div className="form_input">
                            <label htmlFor="password">New Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} onChange={setval} value={password} name="password" id="password" placeholder='Enter Your New Password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={sendpassword}>Send</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default ForgotPassword