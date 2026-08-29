import { useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Link } from "react-router";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleIcon from "../Ui/GoogleIcon";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, login } from "../store/features/auth/authThunk";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const validateForm = () => {
    const errors = {};
    // Email Validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password < 6) {
      errors.password = "Password must be contained at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // clear error for this field when user start typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;
    try {
      const result = await dispatch(login(formData)).unwrap();

      toast.success("Login successful!");

      if (result?.user?.userDTO?.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      dispatch(fetchCurrentUser());
    } catch (err) {
      console.error("Login failed", err);
      toast.error(err?.message || "Invalid email or password");
    }
  }

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
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* FORM CARD */}
        <div className="animate-fade-in-up animation-delay-400 rounded-2xl bg-white p-8 shadow-xl">
          {error && (
            <Alert severity="error" className="mb-6">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* EMAIL FIELD */}
            <div>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                disabled={loading}
                autoComplete="email"
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
            <div>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
                disabled={loading}
                autoComplete="current-password"
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
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
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

            {/* REMEMBER ME && FORGET PASSWORD */}
            <div className="flex items-center justify-between">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                    sx={{
                      color: "#4F46E5",
                      "&.Mui-checked": {
                        color: "#4F46E5",
                      },
                    }}
                  />
                }
                label={
                  <span className="text-sm text-gray-700">Remember me</span>
                }
              />
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
              >
                Forgot password?
              </Link>
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
                    <span>Signing In...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>

            {/* DIVIDER */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>

              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* SOCIAL BUTTON */}
            <div className="grid grid-cols-1 gap-4">
              <Button
                variant="outlined"
                disabled={loading}
                onClick={() => {
                  window.location.href = import.meta.env.VITE_SPRING_OAUTH2;
                }}
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  borderColor: "#E5E7EB",
                  color: "#374151",
                  borderRadius: "0.75rem",
                  "&:hover": {
                    borderColor: "#4F46E5",
                    bgcolor: "#EEF2FF",
                  },
                }}
              >
                <GoogleIcon />
                Continue with Google
              </Button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="space-x-5 text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Terms and Privacy */}
        <p className="animate-fade-in-up animation-delay-400 mt-6 text-center text-sm text-gray-600">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="text-indigo-600 hover:text-indigo-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700">
            Privacy Policy
          </Link>
        </p>
      </main>
    </div>
  );
};

export default Login;
