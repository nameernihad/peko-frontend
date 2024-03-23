import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import userAxios from '../../../Axios/userAxios.js';
import { ClientLogin } from '../../../Redux/ClientAuth';
import './assets/material-icon/css/material-design-iconic-font.min.css';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const dispatch = useDispatch();

    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
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
    }, [user]);

    useEffect(() => {
        if (profile != null) {
            const { email } = profile;
            userAxios
                .post("/googleLogin", { email })
                .then(response => {
                    setErrMsg("");
                    console.log(response);
                    if (response.status === 200) {
                        const token = response.data.token;
                        dispatch(ClientLogin({ token }));
                    }
                })
                .catch(error => {
                    console.log(error);
                    setErrMsg(error.response.data.message);
                });
        }
    }, [profile]);

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();

        const isFormValid = validateForm();
        if (!isFormValid) return;

        try {
            const res = await userAxios.post('/login', { email, password });

            if (res.status === 200) {
                const token = res.data.token;
                dispatch(ClientLogin({ token }));
            }
        } catch (error) {
            if (error.response.data.status >= 500) {
                setErrMsg('Internal server error');
            } else {
                setErrMsg(error.response.data.message)
            }
        }
    };

    const validateForm = () => {
        let isValid = true;

        // Email validation
        if (!email.trim()) {
            setEmailError('Email is required.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError('');
        }

        // Password validation
        if (!password.trim()) {
            setPasswordError('Password is required.');
            isValid = false;
        } else if (!isValidPassword(password)) {
            setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
            isValid = false;
        } else {
            setPasswordError('');
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

    return (
        <div>
            <section className="sign-in">
                <div className="container_login" style={{ marginTop: '100px' }}>
                    <div className="signIn-content">
                        <div className="signIn-image">
                            <figure>
                                <img src={process.env.PUBLIC_URL + '/images/signin-image.jpg'} alt="sign up image" />
                            </figure>
                        </div>

                        <div className="signIn-form flex flex-col gap-2 items-center justify-center">
                            <h2 className="form-title font-semibold text-slate-700 ">Log In</h2>
                            <form className="register-form" id="login-form" onSubmit={handleLoginFormSubmit}>
                                <div className="form-group ">
                                    <input
                                        type="text"
                                        name="your_email"
                                        id="your_email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        placeholder="Your Email"
                                    />
                                    {emailError && <p className="error-message text-red-500 ">{emailError}</p>}
                                </div>
                                <div className="form-group">    
                                    <input
                                        type="password"
                                        name="your_pass"
                                        id="your_pass"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        placeholder="Password"
                                    />
                                    {passwordError && <p className="error-message text-red-500">{passwordError}</p>}
                                </div>
                                <div className="flex flex-col gap-3 items-center">
                                    <button type="submit" className="bg-blue-500 py-2 px-5 rounded-lg text-white font-medium">
                                        Log in
                                    </button>
                                    {errMsg && <div><p style={{ color: 'red' }}>{errMsg}</p></div>}
                                </div>
                            </form>

                            <div className="flex items-center justify-center">
                                <button onClick={login} className="px-4 py-2 border flex gap-2 border-slate-200  rounded-lg text-slate-700  hover:border-slate-400  hover:text-slate-900  hover:shadow transition duration-150">
                                    <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                                    <span>Login with Google</span>
                                </button>
                            </div>
                            <Link to={'/register'} className="text-blue-500 hover:text-blue-600">
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
