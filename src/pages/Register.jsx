import { Link, useRouteLoaderData } from "react-router";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import PhoneIcon from "@mui/icons-material/Phone";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { signup } from "../store/features/auth/authThunk";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = "Full name must be at least 2 characters";
    }

    // Email Validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be contained at least 6 characters";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    setFormErrors(errors);
    return Object.keys(error).length == 0;
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
      await dispatch(signup({ userData: formData })).unwrap();

      toast.success("Registration Successful");
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Failure Registration");
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
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            Create Account
          </h2>
          <p className="text-gray-600">Join our community of book lovers</p>
        </div>
        {/* Form Card */}
        <div className="animate-fade-in-up animation-delay-200 rounded-2xl bg-white p-8 shadow-xl">
          {error && (
            <Alert severity="error" className="mb-6">
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={!!formErrors.fullName}
                helperText={formErrors.fullName}
                disabled={loading}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon className="text-gray-400" />
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
            <div>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={!!formErrors.phoneNumber}
                helperText={formErrors.phoneNumber}
                disabled={loading}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon className="text-gray-400" />
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
                    <span>Signing Up...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
            <div className="flex items-center justify-center gap-1">
              <p className="text-center text-gray-500">
                Already have an account?
              </p>
              <Link
                to="/login"
                className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
              >
                Sign in
              </Link>
            </div>
          </form>
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

export default Register;
