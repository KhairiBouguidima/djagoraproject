import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Chrome, Loader2, UserCheck } from 'lucide-react'; 
import { 
    doCreateUserWithEmailAndPassword, 
    doEmailVerification, 
    doSignInWithGoogle 
} from '../../firebase/auth';
import './Register.css'; // Reusing the same CSS for consistency

const Register = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                await doEmailVerification();
                // Professional touch: using a toast or alert before redirecting
                alert("Account created! Please check your email for a verification link.");
                navigate('/home');
            } catch (err) {
                setErrorMessage(err.message.replace("Firebase: ", ""));
                setIsRegistering(false);
            }
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doSignInWithGoogle();
                navigate('/home');
            } catch (err) {
                setErrorMessage(err.message);
                setIsRegistering(false);
            }
        }
    };

    return (
        <main className="register-container">
            <section className="register-card">
                
                {/* Left Side: Brand Info */}
                <div className="register-info">
                    <div className="brand-wrapper">
                        <div className="logo-box-small">
                            <div className="logo-dot"></div>
                        </div>
                        <span className="brand-name" style={{ fontWeight: 700, fontSize: '1.2rem' }}>Djagora</span>
                    </div>
                    
                    <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', textAlign: 'center' }}>Start your journey</h2>
                        <p style={{ textAlign: 'center', color: '#94a3b8', lineHeight: '1.6' }}>
                            Join Djagora today and unlock professional tools designed for modern creators.
                        </p>
                    </div>

                    <img 
                        src="https://img.freepik.com/free-vector/authentication-concept-illustration_114360-2168.jpg" 
                        alt="Security Illustration" 
                        className="register-img" 
                        loading="lazy"
                    />
                </div>

                {/* Right Side: Register Form */}
                <div className="register-form-section">
                    <header className="form-header">
                        <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Create Account</h1>
                        <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px' }}>
                            Sign up to get started with your free account.
                        </p>
                    </header>

                    {errorMessage && (
                        <div className="error-banner" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={onSubmit} noValidate>
                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <Mail size={18} className="input-icon" />
                                <input 
                                    id="email"
                                    type="email" 
                                    placeholder="name@example.com" 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-wrapper">
                                    <Lock size={18} className="input-icon" />
                                    <input 
                                        id="password"
                                        type="password" 
                                        placeholder="••••••••" 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label htmlFor="confirm">Confirm</label>
                                <div className="input-wrapper">
                                    <Lock size={18} className="input-icon" />
                                    <input 
                                        id="confirm"
                                        type="password" 
                                        placeholder="••••••••" 
                                        onChange={(e) => setConfirmPassword(e.target.value)} 
                                        required 
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isRegistering} 
                            className="register-btn"
                        >
                            {isRegistering ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <Loader2 size={18} className="animate-spin" /> Creating account...
                                </span>
                            ) : 'Create Account'}
                        </button>
                    </form>

                    <div className="divider" style={{ margin: '25px 0', position: 'relative', textAlign: 'center' }}>
                        <span style={{ 
                            background: '#0f172a', 
                            padding: '0 15px', 
                            color: '#475569', 
                            fontSize: '12px', 
                            fontWeight: '600'
                        }}>OR REGISTER WITH</span>
                    </div>

                    <button 
                        onClick={onGoogleSignIn} 
                        disabled={isRegistering} 
                        className="google-btn"
                        style={{
                            width: '100%', 
                            background: '#020617', 
                            border: '1px solid #1e293b', 
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            padding: '12px',
                            borderRadius: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        <Chrome size={18} /> Google Account
                    </button>

                    <footer className="login-link" style={{ marginTop: '25px' }}>
                        Already have an account? <Link to="/login" style={{ color: '#3b82f6', fontWeight: '700' }}>Log in</Link>
                    </footer>
                </div>
            </section>
        </main>
    );
};

export default Register;