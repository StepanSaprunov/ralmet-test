import React from "react";
import Button from '@mui/material/Button';
import { Box, Container, CssBaseline, TextField, Typography } from "@mui/material";
import styles from "./RegistrationForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { registrationFX } from "../../stores/auth/auth";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      data.get('username')?.toString() && data.get('password')?.toString()
    ) {
      const response = await registrationFX({
        username: data.get('username')?.toString() as string,
        password: data.get('password')?.toString() as string,
      });
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={styles.formContainer}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="login"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Registration
          </Button>

          <Typography justifyContent={"center"} display={"flex"} sx={{ mb: 2 }}>
            <Link to={"/login"}>Sign in</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export { RegistrationForm };