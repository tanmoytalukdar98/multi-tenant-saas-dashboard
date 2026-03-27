import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  IconButton,
  CircularProgress
} from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export default function Dashboard() {
  const { tenant } = useParams();
  const nav = useNavigate();
  const { mode, toggleTheme } = useContext(ThemeContext);

  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/t/${tenant}/projects`,
        { headers: { Authorization: token } }
      );
      setProjects(res.data);
    } finally {
      setLoading(false);
    }
  };

  const addProject = async () => {
    if (!name) return;

    try {
      setAdding(true);
      await axios.post(
        `http://localhost:5000/t/${tenant}/projects`,
        { name },
        { headers: { Authorization: token } }
      );
      setName("");
      fetchProjects();
    } finally {
      setAdding(false);
    }
  };

  const deleteProject = async (id) => {
    await axios.delete(
      `http://localhost:5000/t/${tenant}/projects/${id}`,
      { headers: { Authorization: token } }
    );
    fetchProjects();
  };

  const logout = () => {
    localStorage.removeItem("token");
    nav(`/t/${tenant}/login`);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 3,
        background:
          mode === "dark"
            ? "linear-gradient(135deg, #0f2027, #2c5364, #00c9a7)"
            : "linear-gradient(135deg, #e0f7fa, #ffffff)"
      }}
    >
      {/* TOP BAR */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Dashboard — {tenant}</Typography>

        <Box>
          <IconButton onClick={toggleTheme}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <Button color="error" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* ADD PROJECT */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography mb={1}>New Project</Typography>

        <Box display="flex" gap={2}>
          <TextField
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button onClick={addProject} disabled={adding}>
            {adding ? (
              <CircularProgress size={20} />
            ) : (
              "Add"
            )}
          </Button>
        </Box>
      </Paper>

      {/* PROJECTS */}
      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {projects.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p._id}>
              <Paper
                sx={{
                  p: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow:
                      "0 0 25px rgba(0, 201, 167, 0.6)"
                  }
                }}
              >
                <Typography>{p.name}</Typography>

                <Button
                  color="error"
                  onClick={() => deleteProject(p._id)}
                >
                  Delete
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}