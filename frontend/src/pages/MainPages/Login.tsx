// src/pages/Login.tsx - Updated with Account Status Check
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock, Eye, EyeOff, Loader2, AlertTriangle, ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { loginUser, checkAccountStatus, logoutUser } from "../../api/api";

// Account Status Check Component (Integrated)
const AccountStatusCheck: React.FC = () => {
  useEffect(() => {
    const checkStatusOnMount = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      try {
        const status = await checkAccountStatus();
        if (!status.is_active) {
          // User is deactivated, show message and logout
          setTimeout(() => {
            logoutUser();
            window.location.href = '/login';
          }, 2000);
        }
      } catch (error) {
        console.error('Error checking account status on mount:', error);
      }
    };

    checkStatusOnMount();

    // Check every 5 minutes
    const interval = setInterval(checkStatusOnMount, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showDeactivatedMessage, setShowDeactivatedMessage] = useState(false);
  const navigate = useNavigate();

  // Check if user was redirected due to deactivation
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const deactivated = urlParams.get('deactivated');
    const accountDeactivated = localStorage.getItem('account_deactivated');

    if (deactivated === 'true' || accountDeactivated === 'true') {
      setShowDeactivatedMessage(true);
      localStorage.removeItem('account_deactivated');

      // Clear URL params
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Check if user is already logged in but account might be deactivated
    const token = localStorage.getItem('access_token');
    if (token) {
      checkExistingUserStatus();
    }
  }, []);

  const checkExistingUserStatus = async () => {
    try {
      const status = await checkAccountStatus();
      if (!status.is_active) {
        setShowDeactivatedMessage(true);
        logoutUser();
      } else {
        // User is active, redirect to dashboard
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error('Error checking existing user status:', error);
      // If token is invalid, clear it
      localStorage.removeItem('access_token');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setShowDeactivatedMessage(false);
    setLoading(true);

    try {
      await loginUser(email, password); // Saves role, name, center_id

      // After successful login, check account status
      try {
        const status = await checkAccountStatus();

        if (!status.is_active) {
          // Account is deactivated
          localStorage.setItem('account_deactivated', 'true');
          setShowDeactivatedMessage(true);
          logoutUser();
          setErrorMsg("Your account has been deactivated. Please contact your administrator.");
          return;
        }

        // Account is active, proceed to dashboard
        navigate("/dashboard", { replace: true });

      } catch (statusError) {
        console.error('Error checking account status after login:', statusError);
        // If status check fails but login succeeded, proceed to dashboard
        navigate("/dashboard", { replace: true });
      }

    } catch (err: any) {
      console.error("Login failed:", err);

      // Check for specific deactivation error message
      if (err.response?.data?.detail?.includes("deactivated") ||
        err.response?.data?.detail?.includes("inactive") ||
        err.message?.includes("deactivated")) {
        setShowDeactivatedMessage(true);
        setErrorMsg("Your account has been deactivated. Please contact your administrator.");
      } else {
        setErrorMsg(err.response?.data?.detail || "Invalid email or password.");
      }

      // Clear sensitive data on login failure
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      {/* Account Status Check Component */}
      <AccountStatusCheck />

      {/* Back to Home Link - Floating */}
      <Link
        to="/"
        className="absolute top-8 left-8 z-10 flex items-center space-x-2 text-gray-600 hover:text-green-600 font-medium transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </Link>

      {/* Hero Section - Similar to Home but for Login */}
      <section className="bg-gradient-to-br from-green-50 to-white py-16 min-h-screen flex items-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Info */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-1 mb-6 bg-green-100/50 text-green-700 rounded-full font-medium text-sm tracking-widest uppercase">
                Secure Access Portal
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Sign In to Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-lime-600">Dashboard</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Access the NAITA Management Information System to monitor training centers, track student progress, and manage operations efficiently.
              </p>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Secure Authentication</p>
                    <p className="text-sm text-gray-600">Role-based access control</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Real-time Access</p>
                    <p className="text-sm text-gray-600">Instant dashboard updates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                  <p className="text-gray-600">Enter your credentials to continue</p>
                </div>

                {/* Deactivated Account Warning */}
                {showDeactivatedMessage && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-red-800 text-sm">Account Deactivated</h3>
                        <p className="text-xs text-red-700 mt-1">
                          Your account has been deactivated. Please contact your administrator.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form */}
                <form className="space-y-5" onSubmit={handleLogin}>
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrorMsg("");
                          setShowDeactivatedMessage(false);
                        }}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition shadow-sm"
                        placeholder="your.email@naita.gov.lk"
                        required
                        autoComplete="email"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setErrorMsg("");
                          setShowDeactivatedMessage(false);
                        }}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition shadow-sm"
                        placeholder="Enter your password"
                        required
                        autoComplete="current-password"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition disabled:opacity-50"
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {errorMsg && !showDeactivatedMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      <div className="flex items-start">
                        <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{errorMsg}</span>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || showDeactivatedMessage}
                    className={`w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-offset-2 transition-all font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl ${showDeactivatedMessage
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                      } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Signing In...</span>
                      </>
                    ) : showDeactivatedMessage ? (
                      <>
                        <AlertTriangle className="w-5 h-5" />
                        <span>Account Deactivated</span>
                      </>
                    ) : (
                      <span>Sign In to Dashboard</span>
                    )}
                  </button>
                </form>

                {/* Admin Contact Info */}
                {showDeactivatedMessage && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2 text-sm">Need Help?</h4>
                    <p className="text-xs text-yellow-700 mb-2">
                      Contact your system administrator:
                    </p>
                    <div className="text-xs text-yellow-600 space-y-1">
                      <p><strong>Phone:</strong> +94 11 2888 782-5</p>
                      <p><strong>Email:</strong> support@naita.gov.lk</p>
                    </div>
                  </div>
                )}

                {/* Help Text */}
                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-600">
                    Forgot your password?{' '}
                    <span className="text-green-600 font-medium cursor-pointer hover:underline">Contact your administrator</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;