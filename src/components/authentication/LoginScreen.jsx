import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../customHooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch()
    
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        loginEmail: '',
        loginPassword: ''
    });

    const {loginEmail, loginPassword} = formLoginValues;

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        registerName: '',
        registerEmail: '',
        registerPassword1: '',
        registerPassword2: ''
    });
    
    const {registerName, registerEmail, registerPassword1, registerPassword2} = formRegisterValues

    const handleLogin = (e) => {
        e.preventDefault();
        //console.log(formLoginValues);
        dispatch(startLogin(loginEmail, loginPassword))
    }

    const handleRegister = (e) => {
        e.preventDefault();
        
        // si password1 es DIFERENTE de password2
        if(registerPassword1 !== registerPassword2) return Swal.fire('Error', 'Passwords must be the same', 'error')
        dispatch(startRegister(registerEmail, registerPassword1, registerName))
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    
                    <h3>Login</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="E-mail"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="registerName"
                                value={registerName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password" 
                                name="registerPassword1"
                                value={registerPassword1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat password" 
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create an Account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default LoginScreen;