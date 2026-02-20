import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Chrome, Loader2 } from 'lucide-react'; 
import { 
    doSignInWithEmailAndPassword, 
    doSignInWithGoogle, 
    doPasswordReset 
} from '../../firebase/auth';
import './Login.css';
const Login = () => {
    const navigate = useNavigate();
    
    // State Management
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onLogin = async (e) => {
        e.preventDefault();
        if (isSigningIn) return;

        setIsSigningIn(true);
        setErrorMessage('');
        
        try {
            await doSignInWithEmailAndPassword(email, password);
            navigate('/home');
        } catch (err) {
            // Friendly error messages are more professional
            setErrorMessage("The email or password you entered is incorrect.");
            setIsSigningIn(false);
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (isGoogleLoading) return;

        setIsGoogleLoading(true);
        setErrorMessage('');
        
        try {
            await doSignInWithGoogle();
            navigate('/home');
        } catch (err) {
            setErrorMessage("Google sign-in failed. Please try again.");
            setIsGoogleLoading(false);
        }
    };

    const handleReset = async () => {
        if (!email) {
            setErrorMessage("Please enter your email address to reset your password.");
            return;
        }
        try {
            await doPasswordReset(email);
            alert("Success! A password reset link has been sent to your email.");
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return (
        <main className="register-container">
            <section className="register-card">
                
                {/* Left Side: Branding & Info */}
                <div className="register-info">
                    <div className="brand-wrapper">
                        <div className="logo-box-small">
                            <div className="logo-dot"></div>
                        </div>
                        <span className="brand-name" style={{ fontWeight: 700, fontSize: '1.2rem' }}>Djagora</span>
                    </div>
                    
                    <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', textAlign: 'center' }}>Elevate your workflow</h2>
                        <p style={{ textAlign: 'center', color: '#94a3b8', lineHeight: '1.6' }}>
                            Access your personalized dashboard and collaborate with your team in real-time.
                        </p>
                    </div>

                    <img 
                        src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg" 
                        alt="Secure Login Illustration" 
                        className="register-img" 
                        loading="lazy"
                    />
                </div>

                {/* Right Side: Authentication Form */}
                <div className="register-form-section">
                    <header className="form-header">
                        <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Login</h1>
                        <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px' }}>
                            Welcome back! Please enter your credentials.
                        </p>
                    </header>

                    {errorMessage && (
                        <div className="error-banner" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={onLogin} noValidate>
                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <Mail size={18} className="input-icon" aria-hidden="true" />
                                <input 
                                    id="email"
                                    type="email" 
                                    placeholder="name@example.com" 
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label htmlFor="password">Password</label>
                                <button 
                                    type="button"
                                    onClick={handleReset} 
                                    style={{ 
                                        background: 'none', 
                                        border: 'none', 
                                        fontSize: '12px', 
                                        color: '#3b82f6', 
                                        cursor: 'pointer', 
                                        fontWeight: 600,
                                        padding: '0 0 4px 0'
                                    }}>
                                    Forgot password?
                                </button>
                            </div>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" aria-hidden="true" />
                                <input 
                                    id="password"
                                    type="password" 
                                    placeholder="••••••••" 
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSigningIn || isGoogleLoading} 
                            className="register-btn"
                        >
                            {isSigningIn ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <Loader2 size={18} className="animate-spin" /> Signing in...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <div className="divider" style={{ margin: '30px 0', position: 'relative', textAlign: 'center' }}>
                        <span style={{ 
                            background: '#0f172a', 
                            padding: '0 15px', 
                            color: '#475569', 
                            fontSize: '12px', 
                            fontWeight: '600',
                            textTransform: 'uppercase'
                        }}>Or continue with</span>
                    </div>

                    <button 
                        onClick={onGoogleSignIn} 
                        disabled={isSigningIn || isGoogleLoading} 
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
                            cursor: isGoogleLoading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {isGoogleLoading ? <Loader2 size={18} className="animate-spin" /> : <Chrome size={18} />}
                        Google Account
                    </button>

                    <footer className="login-link" style={{ marginTop: '30px' }}>
                        Don't have an account? <Link to="/register" style={{ color: '#3b82f6', fontWeight: '700' }}>Sign up for free</Link>
                    </footer>
                </div>
            </section>
        </main>
    );
};

export default Login;