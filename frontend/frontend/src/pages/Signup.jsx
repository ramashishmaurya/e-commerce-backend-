import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.status === 201) {
                alert('Welcome to ELEVATE! Please sign in.');
                navigate('/login');
            } else {
                alert('Registration failed. Username may be taken.');
            }
        } catch (error) {
            alert('Could not connect to the server.');
        }
    };

    return (
        <div className="container">
            <div className="auth-container">
                <h2 className="auth-title">Join ELEVATE</h2>
                <form onSubmit={registerUser}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input type="text" name="username" className="form-input" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" name="email" className="form-input" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-input" required onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>Create Account</button>
                </form>
                <div className="auth-footer">
                    <p>Already a member? <Link to="/login">Sign in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
