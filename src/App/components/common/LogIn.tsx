import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
    inMemoryPersistence,
    sendPasswordResetEmail,
} from "firebase/auth";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../../../firebase-config";


type LogInProps = {
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogIn = (props: LogInProps) => {
    console.log("/login")

    const [loginStatus, setLoginStatus] = useState('');

    const [usernameReg, setUsernameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [confirmReg, setConfirmReg] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailForgot, setEmailForgot] = useState('');

    const showRegister = () => {
        const signUp = document.querySelector('.sign-up') as HTMLInputElement;
        const signIn = document.querySelector('.sign-in') as HTMLInputElement;
        signUp.style.display = 'block';
        signIn.style.display = 'none'; 
        setLoginStatus('')
    };
    const showLogin = () => {
        const signUp = document.querySelector('.sign-up') as HTMLInputElement;
        const signIn = document.querySelector('.sign-in') as HTMLInputElement;
        const forgot = document.querySelector('.forgot-login') as HTMLInputElement;
        signUp.style.display = 'none';
        forgot.style.display = 'none';
        signIn.style.display = 'block';
        setLoginStatus('')
    };
    const showForgot = () => {
        const signIn = document.querySelector('.sign-in') as HTMLInputElement;
        const forgot = document.querySelector('.forgot-login') as HTMLInputElement;
        signIn.style.display = 'none';
        forgot.style.display = 'block';
        setLoginStatus('')
    }

    const validateRegistration = function(
        usernameReg: string, 
        emailReg: string, 
        passwordReg: string, 
        confirmReg: string) 
        {
        let validation = true;
        // Password confirm requirements.
        if (confirmReg != passwordReg) {
            setLoginStatus('Passwords do not match.')
            validation = false;
        };
        // Username requirements.
        if (usernameReg.length<4 || usernameReg.length>24) { 
            setLoginStatus('Username must be between 4 and 24 characters.')
            validation = false;
        };
        if (usernameReg.includes(" ")) { 
            setLoginStatus('Username must not contain spaces.')
            validation = false;
        };
        if (usernameReg=="") { 
            setLoginStatus('Please enter a username.')
            validation = false;
        };
        return validation
        }

    const registerHandler = async () => {

        // Creating account.
        if (validateRegistration(usernameReg, emailReg, passwordReg, confirmReg) == true) {

            const rememberSwitch = document.getElementById("rememberSwitchRegister") as HTMLInputElement
            if (rememberSwitch.checked) {
                console.log("rememberme")
                setPersistence(auth, browserLocalPersistence)
            } else {
                console.log("dontrememberme")
                setPersistence(auth, inMemoryPersistence)
            }
            
            await createUserWithEmailAndPassword(auth, emailReg, passwordReg)
            .then((userCredential) => {
                // Update displayName
                updateProfile(userCredential.user, {
                    displayName: usernameReg
                })

                // Set logged in.
                props.setIsAuth(true);

                // Generate initial database documents.
                const usersRef = collection(db, "users")
                addDoc(usersRef, {
                    remainingRecruits: 10,
                    remainingShuffles: 6,
                    currentRecruit: null,
                    username: usernameReg,
                    userID: userCredential.user.uid,
                    email: userCredential.user.email,
                    createdAt: serverTimestamp(),
                    lastUpdate: serverTimestamp(),
                })                

                setLoginStatus("Account Created.")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoginStatus(errorCode)
            })
        } 
    };
    
    const loginHandler = () => {
        const rememberSwitch = document.getElementById("rememberSwitchLogin") as HTMLInputElement
            if (rememberSwitch.checked) {
                console.log("rememberme")
                setPersistence(auth, browserLocalPersistence)
            } else {
                console.log("dontrememberme")
                setPersistence(auth, inMemoryPersistence)
            }
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            props.setIsAuth(true);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoginStatus(errorCode)
        });
    };

    const forgotPasswordHandler = () => {
        sendPasswordResetEmail(auth, emailForgot)
        .then(() => {
            setLoginStatus("Password reset email sent.")
        })
        .catch((error) => {
            setLoginStatus(error.code)
        })
    }
    console.log("returning thingy")
    return (
        <div className="Page CenterContent PadHorizontal" style={{"paddingTop":"5vh"}}>
            <p className="Titletext MarginVertical">Log in / Register to Continue</p>
            <p className="Subtext Textstatus">{loginStatus}</p>
            <section className="sign-up">
                <div className="Component Outline Titletext MarginVertical">
                    <input type="text" className="Input CenterContent" placeholder="Username" 
                    onChange={(e) => {
                        setUsernameReg(e.target.value);}}/>
                </div>
                <div className="Component Outline Titletext MarginVertical">
                    <input type="text" className="Input CenterContent" placeholder="Email"
                    onChange={(e) => {
                        setEmailReg(e.target.value);}}/>
                </div>
                <div className="Component Outline Titletext MarginVertical">
                    <input type="password" className="Input CenterContent" placeholder="Password"
                    onChange={(e) => {
                        setPasswordReg(e.target.value);}}/>
                </div>
                <div className="Component Outline Titletext MarginVertical">
                    <input type="password" className="Input CenterContent" placeholder="Confirm Password"
                    onChange={(e) => {
                        setConfirmReg(e.target.value);}}/>
                </div>
                <div className="Component MarginVertical">
                    <label className="CenterContent DisplayFlex" htmlFor="rememberSwitchRegister">
                        <div className="sliderbox">
                            <input type="checkbox" id="rememberSwitchRegister" defaultChecked={true} />
                            <span className="slider"></span>
                        </div>
                        <span className="Textbutton Subtext PadHorizontal">Remember me</span>
                    </label>
                </div>
                <div className="Component Outline ButtonHover MarginVertical">
                    <button className="Input InputHover Titletext"
                    onClick={registerHandler}>Register</button>
                </div>
                <button className="Component Subtext Textbutton MarginVertical"
                    onClick={showLogin}>Log in instead</button>
            </section>

            <section className="sign-in">
                <div className="Component Outline Titletext MarginVertical">
                    <input type="text" className="Input CenterContent" placeholder="Email"
                    onChange={(e) => {
                        setEmail(e.target.value);}}/>
                </div>
                <div className="Component Outline Titletext MarginVertical">
                    <input type="password" className="Input CenterContent" placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value);}}/>
                </div>
                <div className="Component MarginVertical">
                    <label className="CenterContent DisplayFlex" htmlFor="rememberSwitchLogin">
                        <div className="sliderbox">
                            <input type="checkbox" id="rememberSwitchLogin" defaultChecked={true}/>
                            <span className="slider"></span>
                        </div>
                        <span className="Textbutton Subtext PadHorizontal">Remember me</span>
                    </label>
                </div>
                <div className="Component Outline ButtonHover MarginVertical">
                    <button className="Input InputHover Titletext"
                    onClick={loginHandler}>Login</button>
                </div>
                <div className="DisplayFlex PadHorizontal MarginHorizontal MarginVertical">
                    <button className="Component Subtext Textbutton"
                        onClick={showRegister}>Register instead</button>
                    <button className="Component Subtext Textbutton"
                    onClick={showForgot}>Forgot password?</button>
                </div>
            </section>

            <section className="forgot-login">
                <div className="Component Outline Titletext MarginVertical">
                    <input type="text" className="Input CenterContent" placeholder="Email"
                    onChange={(e) => {
                        setEmailForgot(e.target.value);}}/>
                </div>
                <div className="Component Outline ButtonHover MarginVertical">
                    <button className="Input InputHover Titletext"
                    onClick={forgotPasswordHandler}>Reset Password</button>
                </div>
                <button className="Component Subtext Textbutton MarginVertical"
                    onClick={showLogin}>Log in instead</button>
            </section>

        </div>
    )
}