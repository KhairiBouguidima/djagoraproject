import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContexts';
import { doPasswordReset, doPasswordUpdate, doEmailVerification, doDeleteUser } from '../../firebase/auth';

const AccountSettings = () => {
  const { currentUser } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState({ type: '', text: '' });

  const handlePasswordReset = async () => {
    try {
      await doPasswordReset(currentUser.email);
      setMessage({ type: 'success', text: 'Password reset email sent!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await doPasswordUpdate(newPassword);
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setNewPassword("");
    } catch (error) {
      setMessage({ type: 'error', text: 'Please re-login to update password.' });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Account Settings</h2>
      <p>Logged in as: <strong>{currentUser?.email}</strong></p>

      {message.text && (
        <div style={{ color: message.type === 'error' ? 'red' : 'green', marginBottom: '10px' }}>
          {message.text}
        </div>
      )}

      <hr />

      {/* Password Update */}
      <form onSubmit={handleUpdatePassword}>
        <label>New Password:</label>
        <input 
          type="password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          required 
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <button type="submit">Update Password</button>
      </form>

      <br />

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button onClick={handlePasswordReset} style={{ backgroundColor: '#f0ad4e' }}>
          Send Reset Email
        </button>
        
        {!currentUser?.emailVerified && (
          <button onClick={() => doEmailVerification()} style={{ backgroundColor: '#5bc0de' }}>
            Verify Email
          </button>
        )}

        <button 
          onClick={() => { if(window.confirm("Delete account?")) doDeleteUser() }} 
          style={{ backgroundColor: '#d9534f', color: 'white' }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;