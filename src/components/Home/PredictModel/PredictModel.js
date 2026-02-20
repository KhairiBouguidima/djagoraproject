import { useState, useEffect ,useCallback } from 'react';
import { 
    Cpu, History, Play, FastForward, Loader2, 
    AlertCircle, CheckCircle2, X, Info, TrendingUp 
} from 'lucide-react';
import './PredictModel.css';
import Navbar from '../../navbar/Navbar';
import { useAuth } from '../../contexts/authContexts/index';

const PredictModel = () => {
    const { currentUser } = useAuth(); 

    const [inputs, setInputs] = useState({
        RDSpend: '',
        Administration: '',
        MarketingSpend: '',
        State: ''
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState('');
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [modelType, setModelType] = useState('');

    const BASE_URL = "https://mouldi.pythonanywhere.com/api/"; 

    const inputsmodel = [
        { name: 'RDSpend', label: 'R&D Spend', placeholder: 'e.g. 165000' },
        { name: 'Administration', label: 'Administration', placeholder: 'e.g. 136000' },
        { name: 'MarketingSpend', label: 'Marketing Spend', placeholder: 'e.g. 471000' }
    ];

const fetchHistory = useCallback(async () => {
    if (!currentUser) return;

    try {
        const response = await fetch(`${BASE_URL}history/${currentUser.uid}/`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        setHistory(data);
    } catch (err) {
        console.error("Failed to fetch history:", err);
    }
}, [currentUser]);

useEffect(() => {
    if (currentUser) fetchHistory();
}, [currentUser, fetchHistory]);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Block negative values at the state level
        if (value !== "" && parseFloat(value) < 0) return;
        setInputs({ ...inputs, [name]: value });
    };

    const runPrediction = async (useBackward) => {
        if (!currentUser) {
            setError("Authentication required to run models.");
            return;
        }

        const rd = parseFloat(inputs.RDSpend);
        const admin = parseFloat(inputs.Administration);
        const marketing = parseFloat(inputs.MarketingSpend);

        // --- STRICT VALIDATION ---
        if (!inputs.RDSpend || !inputs.Administration || !inputs.MarketingSpend || !inputs.State) {
            setError("All parameters are required for analysis.");
            return;
        }

        if (rd <= 0 || admin <= 0 || marketing <= 0) {
            setError("Financial inputs must be greater than zero.");
            return;
        }

        setIsLoading(true);
        setError('');
        setResult(null);

        try {
            const payload = { 
                firebase_uid: currentUser.uid,
                rd_spend: rd, 
                administration: admin,
                marketing: marketing, // Key fixed based on backend requirements
                state: inputs.State,
                model_type: useBackward ? 'b1' : 'b2' 
            };

            const response = await fetch(`${BASE_URL}predict/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Analysis Error:", data);
                throw new Error(data.error || data.marketing?.[0] || "Model execution failed.");
            }

            setResult(data.predicted_profit);
            setModelType(data.model_type ? 'B1' : 'B2');
            fetchHistory(); 
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="predict-page">
            <Navbar/>
            <main className="predict-container">
                <header className="predict-header">
                    <h1>AI <span className="text-gradient">Profit Predictor</span></h1>
                    <p>Leveraging Multiple Linear Regression to forecast startup success.</p>
                </header>

                <div className="predict-grid">
                    {/* LEFT COLUMN: INPUTS */}
                    <section className="predict-card main-form">
                        <div className="card-header">
                            <Cpu size={20} className="icon-blue" />
                            <h2>Model Configuration</h2>
                        </div>

                        <div className="inputs-wrapper">
                            {inputsmodel.map(({ name, label, placeholder }, index) => (
                                <div className="input-group" key={index}>
                                    <label>{label}</label>
                                    <input 
                                        type="number" 
                                        name={name}
                                        placeholder={placeholder}
                                        min="0.01" 
                                        step="0.01"
                                        value={inputs[name]}
                                        onChange={handleInputChange}
                                        onKeyDown={(e) => ["-", "e", "E"].includes(e.key) && e.preventDefault()}
                                    />
                                </div>
                            ))} 

                           <div className="input-group">
    <label>Operating State</label>
    <div className="custom-select-container">
        <select 
            name="State" 
            className="state-select"
            value={inputs.State} 
            onChange={handleInputChange}
        >
            <option value="" disabled>Select Region</option>
            <option value="New York">New York</option>
            <option value="California">California</option>
            <option value="Florida">Florida</option>
        </select>
        <div className="select-arrow"></div>
    </div>
</div>
                        </div>

                        <div className="button-group">
                            <button className="btn-predict secondary" onClick={() => runPrediction(false)} disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin" /> : <Play size={18} />} B1 (Standard)
                            </button>
                            <button className="btn-predict primary" onClick={() => runPrediction(true)} disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin" /> : <FastForward size={18} />} B2 (Backward)
                            </button>
                        </div>

                        {error && <div className="status-msg error-box"><AlertCircle size={18}/> {error}</div>}
                    </section>

                    {/* RIGHT COLUMN: RESULTS & HISTORY */}
                    <div className="side-column">
                        {/* RESULT CARD */}
                        <section className="predict-card result-display">
                            <div className="card-header">
                                <TrendingUp size={20} className="icon-green" />
                                <h2>Analysis Output</h2>
                            </div>
                            <div className="result-body">
                                {isLoading ? (
                                    <div className="loading-container">
                                        <Loader2 className="animate-spin" size={32} />
                                        <p>Running Regression Models...</p>
                                    </div>
                                ) : result ? (
                                    <div className="result-animation">
                                        <p className="label">Estimated Annual Profit of {modelType}</p>
                                        <h3 className="value">
                                            ${Number(result).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </h3>
                                        <div className="success-badge"><CheckCircle2 size={14}/> Accurate Forecast</div>
                                    </div>
                                ) : (
                                    <div className="empty-state">
                                        <Info size={28} />
                                        <p>Enter data and click a model to generate prediction.</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* HISTORY CARD */}
                        <section className="predict-card history-panel">
    <div className="card-header">
        <div className="header-icon-wrapper">
            <History size={20} className="icon-blue" />
        </div>
        <h2>Data Intelligence Feed</h2>
    </div>
    
    <div className="history-list">
        {history.length > 0 ? history.slice(0, 5).map((item, index) => (
            <div className="history-item-container" key={index} onClick={() => setSelectedHistory(item)}>
                <div className="history-timeline-dot"></div>
                <div className="history-item-content">
                    <div className="history-meta">
                        <span className="h-date">{new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        <span className={`h-badge ${item.model_type.toLowerCase()}`}>{item.model_type}</span>
                    </div>
                    <div className="h-value-wrapper">
                        <span className="h-currency">$</span>
                        <span className="h-amount">{Number(item.result).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        )) : (
            <div className="no-data-state">
                <Info size={30} />
                <p>No historical data points detected.</p>
            </div>
        )}
    </div>
</section>

{/* ENHANCED MODAL */}
{selectedHistory && (
    <div className="modal-overlay" onClick={() => setSelectedHistory(null)}>
        <div className="modal-glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-accent-line"></div>
            <div className="modal-header">
                <div>
                    <h3>Analysis Report</h3>
                    <p className="modal-sub">Snapshot from {new Date(selectedHistory.created_at).toLocaleDateString()}</p>
                </div>
                <button className="modal-close-btn" onClick={() => setSelectedHistory(null)}><X size={20} /></button>
            </div>
            
            <div className="modal-stats-grid">
                <div className="stat-box">
                    <label>R&D Investment</label>
                    <div className="stat-val">${Number(selectedHistory.rd_spend).toLocaleString()}</div>
                </div>
                <div className="stat-box">
                    <label>Administrative</label>
                    <div className="stat-val">${Number(selectedHistory.administration).toLocaleString()}</div>
                </div>
                <div className="stat-box">
                    <label>Marketing</label>
                    <div className="stat-val">${Number(selectedHistory.marketing || selectedHistory.marketing_spend).toLocaleString()}</div>
                </div>
                <div className="stat-box highlight">
                    <label>Region</label>
                    <div className="stat-val">{selectedHistory.state}</div>
                </div>
            </div>

            <div className="modal-total-section">
                <span>Final Projected Profit</span>
                <div className="total-amount">${Number(selectedHistory.result).toLocaleString()}</div>
            </div>
        </div>
    </div>
)}
</div>
</div>
            </main>
        </div>
    );
};

export default PredictModel;