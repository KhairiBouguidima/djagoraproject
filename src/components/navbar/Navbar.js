import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard, BarChart3, ChevronDown } from 'lucide-react';
import { doSignOut } from '../../components/firebase/auth';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();

    // Effect to handle glassmorphism on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await doSignOut();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? "active" : "";

    return (
        <nav className={`smart-nav ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                {/* Logo Section */}
                <Link to="/home" className="nav-logo">
                    <div className="logo-box-small">
                        <div className="logo-dot"></div>
                    </div>
                    <span>Djagora</span>
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links">
                    <Link to="/home" className={`nav-item ${isActive('/home')}`}>
                        <LayoutDashboard size={18} /> Home
                    </Link>
                    <Link to="/Predict" className={`nav-item ${isActive('/predict')}`}>
                        <BarChart3 size={18} /> Analytics
                    </Link>
                    
                    {/* User Profile Dropdown */}
                    <div className="profile-dropdown">
                        <button 
                            className="profile-trigger" 
                            onClick={() => setProfileOpen(!profileOpen)}
                        >
                            <div className="avatar-circle">A</div>
                            <ChevronDown size={14} className={profileOpen ? 'rotate' : ''} />
                        </button>

                        {profileOpen && (
                            <div className="dropdown-menu">
                                <div className="dropdown-header">User Settings</div>
                                <button onClick={handleLogout} className="dropdown-item logout">
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

        </nav>
    );
};

export default Navbar;