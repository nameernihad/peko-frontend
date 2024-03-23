import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAxios from "../../../Axios/userAxios.js";
import "./assets/material-icon/css/material-design-iconic-font.min.css";
import "./Login.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { ClientLogin } from "../../../Redux/ClientAuth.js";
import { useDispatch } from "react-redux";

function UserRegister() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [emailError,setEmailError] = useState("")
    const [passwordError,setPasswordError] = useState("")
    const [phoneError,setPhoneError] = useState("")
    const [userNameError,setUsernameError] = useState("")

    const [errMsg, setErrMsg] = useState("");
    const [msg, setMsg] = useState("")

    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState(null);

    
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    useEffect(() => {
        if (profile != null) {
            const { name, email, picture, verified_email } = profile
            userAxios.post("/googleSignUp", { name, email, picture, verified_email })
                .then(response => {
                    setErrMsg("")
                    console.log(response)
                    if (response.status === 201) {
                        const token = response.data.token;
                        dispatch(ClientLogin({ token }));
                        navigate('/')
                    }
                    setMsg(response.data.message)
                })
                .catch(error => {
                    setMsg("")
                    console.log(error)
                    setErrMsg(error.response.data.error);
                });
        }
    }, [profile])


    const signUpForm = () => {


        const isFormValid = validateForm();
        if (!isFormValid) return;

        userAxios.post("/register", { name, email, password })
            .then(response => {
                setErrMsg("")
                console.log(response.data.message);
                setMsg(response.data.message)
            })
            .catch(error => {
                setMsg("")
                console.log(error.response.data.error)
                setErrMsg(error.response.data.error);
            });
    };


    const validateForm = () => {
        let isValid = true;
    
        if (!email.trim()) {
            setEmailError('Email is required.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError('');
        }
    
        if (!password.trim()) {
            setPasswordError('Password is required.');
            isValid = false;
        } else if (!isValidPassword(password)) {
            setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
            isValid = false;
        } else {
            setPasswordError('');
        }
    
        // if (!phone.trim()) {
        //     setPhoneError('Phone number is required.');
        //     isValid = false;
        // } else if (!isValidPhone(phone)) {
        //     setPhoneError('Please enter a valid phone number (10 digits).');
        //     isValid = false;
        // } else {
        //     setPhoneError('');
        // }
    
        if (!name.trim()) {
            setUsernameError('Username is required.');
            isValid = false;
        } else if (!isValidUsername(name)) {
            setUsernameError('Username can only contain letters, numbers, underscores, and dashes.');
            isValid = false;
        } else {
            setUsernameError('');
        }
    
        return isValid;
    };

    const isValidEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };
    
    const isValidPassword = (value) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return passwordRegex.test(value);
    };

    // const isValidPhone = (value) => {
    //     const phoneRegex = /^[0-9]{10}$/;
    //     return phoneRegex.test(value);
    // };
    
    const isValidUsername = (value) => {
        const usernameRegex = /^[a-zA-Z0-9_-]+$/;
        return usernameRegex.test(value);
    };
    
    

    return (
        <div>
            <section className="signUp">
                <div className="container_login" style={{ marginTop: "100px" }}>
                    <div className="signUp-content">
                        <div className="signUp-form flex flex-col items-center gap-2">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form " id="register-form">
                                <div className="form-group ">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        placeholder="Your Name"
                                    />
                                    {userNameError && <p className="error-message text-red-500 ">{userNameError}</p>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        placeholder="Your Email"
                                    />
                                    {emailError && <p className="error-message text-red-500 ">{emailError}</p>}
                                </div>
                                {/* <div className="form-group">
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                        }}
                                        placeholder="Your Dial number"
                                    />
                                    {phoneError && <p className="error-message text-red-500 ">{phoneError}</p>}
                                </div> */}
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        placeholder="Enter your Password"
                                    />
                                    {passwordError && <p className="error-message text-red-500 ">{passwordError}</p>}
                                </div>
                                <div className="form-group form-button w-full flex justify-center">
                                    <buttton
                                        onClick={() => signUpForm()}
                                        className="form-submit"
                                    >
                                        Register
                                    </buttton>
                                </div>
                            </form>
                            {errMsg ? <div style={{ color: "red", marginTop: '10px' }}>{errMsg}</div> : ""}
                            {msg ? <div style={{ color: "green", marginTop: '10px' }}>{msg}</div> : ""}

                            <div className="flex items-center justify-center">
                                <button onClick={login} className="px-4 py-2 border flex gap-2 border-slate-200  rounded-lg text-slate-700  hover:border-slate-400  hover:text-slate-900  hover:shadow transition duration-150">
                                    <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                                    <span>Login with Google</span>
                                </button>
                            </div>
                        </div>
                        <div className="signUp-image">
                            <figure>
                                <img src={process.env.PUBLIC_URL + "/images/signup-image.jpg"} alt="sing up image" />
                            </figure>
                            <Link

                                to={"/login"}
                                className="text-blue-500 hover:text-blue-600 font-bold"
                            >
                                I am already member
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default UserRegister;
