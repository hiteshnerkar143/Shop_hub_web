import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { authAPI } from "../services/api";
import OTPInput from "../components/OTPInput";
import "./Auth.css";

const VerifySignupOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, email } = location.state || {};

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!userId) {
      navigate("/signup");
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.verifySignupOTP({
        userId,
        otp,
      });

      setSuccess("Email verified successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setLoading(true);

    try {
      await authAPI.resendOTP({ userId });
      setSuccess("OTP resent to your email");
      setTimer(300);
      setCanResend(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Verify Your Email</h1>
        <p>Enter the 6-digit code sent to {email}</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleVerify}>
          <div className="form-group">
            <label>OTP Code</label>
            <OTPInput
              length={6}
              onOtpChange={setOtp}
              loading={loading}
            />
          </div>

          <div className="timer">
            {timer > 0 ? (
              <>
                Code expires in: <strong>{formatTime(timer)}</strong>
              </>
            ) : (
              <strong>Code expired</strong>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading || !otp}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            className="resend-btn"
            onClick={handleResendOTP}
            disabled={!canResend && timer > 0}
          >
            {timer > 0 ? "Resend in " + formatTime(timer) : "Resend OTP"}
          </button>
        </form>

        <p className="auth-toggle">
          <Link to="/signup">Back to signup</Link>
        </p>
      </div>
    </div>
  );
};

export default VerifySignupOTP;
