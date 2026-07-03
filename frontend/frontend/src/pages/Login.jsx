import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const { loginUser } = useContext(AuthContext);

    return (
        <div className="container">
            <div className="auth-container">
                <h2 className="auth-title">Welcome Back</h2>
                <form onSubmit={loginUser}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input type="text" name="username" className="form-input" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-input" required />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>Sign In</button>
                </form>
                <div className="auth-footer">
                    <p>New to ELEVATE? <Link to="/signup">Create an account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
