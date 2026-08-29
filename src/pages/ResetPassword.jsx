import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { resetPassword } from "../store/features/auth/authThunk";
import { resetPasswordFlags } from "../store/features/auth/authSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, error, resetPasswordSuccess } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(resetPasswordFlags()); // clear stale flags on mount

    return () => {
      dispatch(resetPasswordFlags()); // also clear on unmount (e.g. navigating to /login)
    };
  }, [dispatch, token, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;
    try {
      await dispatch(
        resetPassword({ token, newPassword: formData.password }),
      ).unwrap();
    } catch (err) {
      toast.error(err?.message || "Reset password failed");
    }
  };
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-12 sm:px-6 lg:px-8">
      <main className="w-full max-w-md">
        {/* Header */}
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
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            Reset Password
          </h2>
          <p className="text-gray-600">Enter your new password below</p>
        </div>
        {/* FORM CARD */}
        <div className="animate-fade-in-up animation-delay-400 rounded-2xl bg-white p-8 shadow-xl">
          {resetPasswordSuccess ? (
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
                  Password Reset Successful
                </Typography>
                <Typography variant="body1" className="mb-4 text-gray-600">
                  Your password has been successfully reset. You can now login
                  with your new password.
                </Typography>
              </div>
              <Button
                fullWidth
                variant="contained"
                onClick={handleLoginRedirect}
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
                Go to Login
              </Button>
            </Box>
          ) : (
            <>
              {error && (
                <Alert severity="error" className="mb-6">
                  {error}
                </Alert>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Password Field */}
                <div>
                  <TextField
                    fullWidth
                    label="New Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    disabled={loading}
                    autoFocus
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon className="text-gray-400" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              disabled={loading}
                            >
                              {showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
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

                {/* Confirm Password Field */}
                <div>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!formErrors.confirmPassword}
                    helperText={formErrors.confirmPassword}
                    disabled={loading}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon className="text-gray-400" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              edge="end"
                              disabled={loading}
                            >
                              {showConfirmPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
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

                {/* Password requirement */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <Typography
                    variant="caption"
                    className="font-semibold text-gray-700"
                  >
                    Password Requirements:
                  </Typography>
                  <ul className="mt-2 space-y-1 text-xs text-gray-600">
                    <li className="flex items-center space-x-2">
                      <span
                        className={
                          formData.password.length >= 6
                            ? "text-green-600"
                            : "text-gray-400"
                        }
                      >
                        •
                      </span>
                      <span>Passwords matches</span>
                    </li>
                  </ul>
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
                        <span>Resetting Password...</span>
                      </div>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </div>

                {/* Back to Login Link */}
                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
                  >
                    Back to Login
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

export default ResetPassword;
