import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./mix.css"

const Dashboard = () => {

    // const { id } = useParams("");
    // console.log(id);


    const { logindata, setLoginData } = useContext(LoginContext);

    const [data, setData] = useState(false);


    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();

        if (data.status == 401 || !data) {
            history("*");
        } else {
            console.log("user verify");
            setLoginData(data)
            history("/dash");
        }
    }

    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true)
        }, 2000)
    }, [])


    // const [inpval, setInpval] = useState({
    //     fname: logindata.ValidUserOne.fname,
    //     mobile: logindata.ValidUserOne.mobile,
    //     place: logindata.ValidUserOne.place

    // fname: "",
    // mobile: "",
    // place: ""
    // });

    // const setVal = (e) => {
    //     const { name, value } = e.target;

    //     setInpval(() => {
    //         return {
    //             ...inpval,
    //             [name]: value
    //         }
    //     })
    // };

    // const updateUserData = async (e) => {
    //     e.preventDefault();

    //     const { fname, mobile, place } = inpval;

    //     const res2 = await fetch(`/updateuser/${logindata.ValidUserOne._id}`, {
    //         method: "PUT",
    //         headers: {
    //           "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //           fname, mobile, place
    //         })
    //       });

    //       const data2 = await res2.json();
    //       console.log(data2);

    //       if(res2.status === 422 || !data2){
    //         alert("filled the data")
    //       }else{
    //         history("/")
    //         setLoginData(data2);
    //       }

    //   if (res.status === 201) {
    //     localStorage.setItem("usersdatatoken",res.result.token);
    //     history("/dash")
    //     setInpval({ ...inpval, fname: "", mobile: "", place: ""});
    //   }else{
    //     alert("Invalid email or password")
    //   }
    // }


    return (
        <>
            {
                data ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src="./man.png" style={{ width: "200px", marginTop: 20 }} alt="" />
                    <div>
                        <h2>Email : {logindata ? logindata.ValidUserOne.email : ""}</h2>
                        <h2>Name : {logindata ? logindata.ValidUserOne.fname : ""}</h2>
                        <h2>Mobile : {logindata ? logindata.ValidUserOne.mobile : ""}</h2>
                        <h2>Place : {logindata ? logindata.ValidUserOne.place : ""}</h2>
                    </div>
                    {/* <div className="form_data">
                        <form>
                            <div className="form_input">
                                <label htmlFor="fname">Name</label>
                                <input type="text" onChange={setVal} value={inpval.fname} name="fname" id="fname" placeholder='Enter Your Name' />
                            </div>

                            <div className="form_input">
                                <label htmlFor="fname">Mobile</label>
                                <input type="text" onChange={setVal} value={inpval.mobile} name="mobile" id="mobile" placeholder='Enter Your Mobile' />
                            </div>

                            <div className="form_input">
                                <label htmlFor="place">Place</label>
                                <input type="text" onChange={setVal} value={inpval.place} name="place" id="place" placeholder='Enter Your Place' />
                            </div>

                            <button className='btn' onClick={updateUserData}>Update</button>
                        </form>
                    </div> */}

                </div> : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            }
        </>

    )
}

export default Dashboard