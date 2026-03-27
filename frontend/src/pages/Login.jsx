import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  CircularProgress
} from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export default function Login() {
  const { tenant } = useParams();
  const nav = useNavigate();
  const { mode, toggleTheme } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `http://localhost:5000/t/${tenant}/auth/login`,
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      nav(`/t/${tenant}/dashboard`);
    } catch {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        background:
          mode === "dark"
            ? "linear-gradient(135deg, #0f2027, #2c5364, #00c9a7)"
            : "linear-gradient(135deg, #e0f7fa, #ffffff)"
      }}
    >
      {/* THEME TOGGLE */}
      <IconButton
        onClick={toggleTheme}
        sx={{ position: "absolute", top: 20, right: 20 }}
      >
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      <Paper
        sx={{
          p: 4,
          width: 360,
          borderRadius: 4,
          backdropFilter: "blur(20px)",
          background:
            mode === "dark"
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 0 30px rgba(0, 201, 167, 0.4)"
          }
        }}
      >
        <Typography variant="h5" textAlign="center" mb={2}>
          LOGIN
        </Typography>

        <Typography textAlign="center" mb={3}>
          Tenant: <b>{tenant}</b>
        </Typography>

        <Typography mb={1}>Email</Typography>
        <TextField
          fullWidth
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root.Mui-focused": {
              boxShadow: "0 0 10px rgba(0, 201, 167, 0.7)"
            }
          }}
        />

        <Typography mb={1}>Password</Typography>
        <TextField
          type="password"
          fullWidth
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root.Mui-focused": {
              boxShadow: "0 0 10px rgba(0, 201, 167, 0.7)"
            }
          }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={login}
          disabled={loading}
          sx={{
            py: 1.2,
            borderRadius: "12px",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 0 20px rgba(0, 201, 167, 0.8)"
            }
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "LOGIN"
          )}
        </Button>
      </Paper>
    </Box>
  );
}