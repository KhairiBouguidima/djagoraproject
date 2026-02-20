import { Link } from 'react-router-dom';
import { 
    BarChart3, 
    ShieldCheck, 
    ArrowRight,
    Target
} from 'lucide-react';
import './Home.css';
import Navbar from '../../navbar/Navbar';

const Home = () => {
    return (
        <>
        <Navbar/>

        <div className="home-container">
            {/* Navigation Bar */}

            <main className="home-content">
                {/* Hero Section */}
                <header className="hero-section">
                    <div className="badge">Djagora Intelligence</div>
                    <h1>Profit <span className="text-gradient">Analyst</span></h1>
                    <p className="hero-subtitle">
                        Our proprietary Profit Analyst model utilizes advanced predictive algorithms 
                        to maximize ROI through real-time market data processing.
                    </p>
                </header>

                

                {/* Definition Section */}
                <section className="definition-grid">
                    <div className="definition-card">
                        <div className="card-icon"><Target size={24} /></div>
                        <h3>Strategic Optimization</h3>
                        <p>
                            The model identifies margin leaks by comparing cost-per-acquisition (CPA) 
                            against lifetime value (LTV) in real-time.
                        </p>
                    </div>

                    <div className="definition-card">
                        <div className="card-icon"><BarChart3 size={24} /></div>
                        <h3>Predictive Analytics</h3>
                        <p>
                            Using historical trend analysis, it forecasts upcoming market shifts, 
                            allowing you to adjust pricing before competitors react.
                        </p>
                    </div>

                    <div className="definition-card">
                        <div className="card-icon"><ShieldCheck size={24} /></div>
                        <h3>Risk Mitigation</h3>
                        <p>
                            Evaluates the volatility of investment channels and suggests 
                            re-allocation of resources to safer, high-yield assets.
                        </p>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="cta-banner">
                    <div>
                        <h2>Ready to run your first report?</h2>
                        <p>Connect your data source to begin the analysis.</p>
                    </div>
                    <button className="primary-cta">
                    <Link to="/PredictModel" className="cta-link">
                        Initialize Model <ArrowRight size={20} />
                    </Link>
                    </button>
                </section>
                {/* Team Section */}
{/* Team Section */}
<section className="team-section">
    <h2 className="team-title">Meet The Creators</h2>

    <div className="team-container">

        <div className="team-card animated-card">
            <div className="team-image">
                <img src="/imgs/WhatsApp Image 2026-02-13 at 14.41.03.jpeg" alt="Khairi Bouguidima" />
            </div>
            <h3>Khairi Bouguidima</h3>
            <p>AI Engineer & Data Analyst</p>
        </div>

        <div className="team-card animated-card">
            <div className="team-image">
                <img src="/imgs/WhatsApp Image 2026-02-20 at 22.43.55.jpeg" alt="Mouhamed Mouldi Ben Ksaier" />
            </div>
            <h3>Mouhamed Mouldi Ben Ksaier</h3>
            <p>Full Stack Developer & System Architect</p>
        </div>

    </div>
</section>
            </main>
        </div>
                    </>
    );
};

export default Home;