import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      // Check if there's a redirect after login
      const redirectData = localStorage.getItem('redirectAfterLogin');
      if (redirectData) {
        const { path, product } = JSON.parse(redirectData);
        localStorage.removeItem('redirectAfterLogin');
        navigate(path, { state: { product } });
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-content">
            <h1 className="login-title">
              Welcome Back
              <span>Sign in to continue</span>
            </h1>
            
            <form onSubmit={handleSubmit} className="login-form">
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" /> Remember me
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              <button 
                type="submit" 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="social-login">
              <p className="social-text">Or continue with</p>
              <div className="social-buttons">
                <button className="social-btn google">
                  <img src="https://www.google.com/favicon.ico" alt="Google" />
                  Google
                </button>
                <button className="social-btn facebook">
                  <span>f</span>
                  Facebook
                </button>
              </div>
            </div>

            <p className="signup-prompt">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>

        <div className="login-right">
          <div className="login-right-content">
            <h2>New to UrbanCraft?</h2>
            <p>Create an account to enjoy exclusive benefits:</p>
            <ul className="benefits-list">
              <li>✓ Early access to new collections</li>
              <li>✓ Member-only discounts</li>
              <li>✓ Free shipping on all orders</li>
              <li>✓ 24/7 priority support</li>
            </ul>
            <Link to="/signup" className="create-account-btn">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;