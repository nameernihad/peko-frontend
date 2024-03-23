import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import userAxios from "../../../Axios/userAxios.js";

function VerifyEmail() {
    const [errMsg, setErrMsg] = useState('');
    const [Msg, setMsg] = useState('');
    const { token } = useParams();
    const handleVerify = async () => {
        userAxios.patch(`/verify/${token}`).then((response) => {
            setErrMsg("")
            if (response.status === 200) {
                console.log(response.data.message)
                setMsg(response.data.message)
            }
        }).catch((err) => {
            setMsg("")
            setErrMsg(err.response.data.error)
        })
    };

    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="flex flex-col gap-3 items-center bg-slate-200 p-5 rounded-lg">
                <p className="font-semibold text-orange-400">Verify your email</p>
                <p className="font-normal text-black">
                    Please click the below button to verify your email.
                </p>
                <div>
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        onClick={handleVerify}
                    >
                        VERIFY
                    </button>
                </div>
                {errMsg && <div style={{ color: 'red' }}>{errMsg}</div>}

                {Msg &&
                    <>
                        <div className='text-green-500'>{Msg}</div>
                        <Link to={'/login'} ><p className='font-medium ' > click here to Login</p></Link>
                    </>

                }
            </div>
        </div>
    );
}

export default VerifyEmail;
