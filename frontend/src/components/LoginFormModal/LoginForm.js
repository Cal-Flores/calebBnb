import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector((state) => state.session.user);
    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                console.log('errors,', errors)
            }
        );
    };

    const demoHandler = (e) => {
        e.preventDefault()

        return dispatch(
            sessionActions.login({ credential: 'Demo-lition', password: 'password' })
        )
    }

    return (
        <div className="lfcont" >
            <h2 className="lfheader">Welcome Back!  <i class="fa-brands fa-airbnb"></i></h2>
            <form
                className="login-form"
                onSubmit={handleSubmit}>
                <ul className="errlog">
                    {errors.map((error, idx) => (
                        <li className="errlog" key={idx}>{error}</li>
                    ))}
                </ul>
                <label className="form-label">

                    <input
                        className="lfinput"
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        placeholder='Username or Email'
                        required
                    />
                </label>
                <label className="form-label">
                    <input
                        className="lfinput"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required
                    />
                </label>
                <button className="demobtn" type="submit">Log In</button>
                <button className="demobtn" onClick={demoHandler}> Demo User</button>
            </form>
        </div>
    );
}

export default LoginForm;
