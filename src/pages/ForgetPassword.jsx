import { Link } from "react-router";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { forgotPassword } from "../store/features/auth/authThunk";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const { loading, error, forgotPasswordSuccess } = useSelector(
    (state) => state.auth,
  );

  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");

  const validateForm = () => {
    if (!email.trim()) {
      setFormError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (formError) setFormError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    try {
      await dispatch(forgotPassword({ email })).unwrap();
      toast.success("Please checkout your email to get token's url");
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-4 py-12 sm:px-6 lg:px-8">
      <main className="w-full max-w-md">
        {/* HEADER */}
        <div className="animate-fade-in-up mb-8 text-center">
          <Link
            to="/"
            className="group mb-6 inline-flex items-center space-x-2"
          >
            <div className="rounded-xl bg-indigo-600 p-3 transition-colors group-hover:bg-indigo-700">
              <MenuBookIcon sx={{ fontSize: 32, color: "white" }} />
            </div>
            <span className="text-3xl font-bold text-gray-900">
              Jing Library
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>
        {/* Form Card */}
        <div className="animate-fade-in-up animation-delay-200 rounded-2xl bg-white p-8 shadow-xl">
          {forgotPasswordSuccess ? (
            <Box className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-4">
                  <CheckCircleIcon sx={{ fontSize: 64, color: "#10B981" }} />
                </div>
              </div>
              <div>
                <Typography
                  variant="h5"
                  className="mb-2 font-bold text-gray-900"
                >
                  Check Your Email
                </Typography>
                <Typography variant="body1" className="mb-4 text-gray-600">
                  We've sent a password reset link to <strong>{email}</strong>
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  Please check your email and click on the link to reset your
                  password. The link will expire in 24 hours.
                </Typography>
              </div>
              <Link to="/login">
                <Button
                  fullWidth

                  variant="contained"
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    bgcolor: "#4F46E5",
                    color: "white",
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: "0.75rem",
                    "&:hover": {
                      bgcolor: "#4338CA",
                    },
                  }}
                >
                  Back to Login
                </Button>
              </Link>
            </Box>
          ) : (
            <>
              {error && (
                <Alert severity="error" className="mb-6">
                  {error}
                </Alert>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    error={!!formError}
                    helperText={formError}
                    disabled={loading}
                    autoComplete="email"
                    autoFocus
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon className="text-gray-400" />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#4F46E5",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#4F46E5",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#4F46E5",
                      },
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      bgcolor: "#4F46E5",
                      color: "white",
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: "0.75rem",
                      "&:hover": {
                        bgcolor: "#4338CA",
                      },
                      "&.Mui-disabled": {
                        bgcolor: "#9CA3AF",
                        color: "white",
                      },
                    }}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <CircularProgress size={20} color="inherit" />
                        <span>Sending Reset Link...</span>
                      </div>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </div>

                {/* Back to Login Link */}
                <div className="text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center space-x-1 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
                  >
                    <ArrowBackIcon sx={{ fontSize: 16 }} />
                    <span>Back to Login</span>
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
        {/* Additional Help */}
        <p className="animate-fade-in-up animation-delay-400 mt-6 text-center text-sm text-gray-600">
          Need help?{" "}
          <Link
            to="/contact"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Contact Support
          </Link>
        </p>
      </main>
    </div>
  );
};

export default ForgetPassword;
