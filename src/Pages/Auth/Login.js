import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import LogoSVG from "../../Assets/svg/authLogo.svg";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { EmailInput } from "../../Components/EmailInput";
import { PasswordInput } from "../../Components/PasswordInput";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SHA256 from 'crypto-js/sha256';

import { useDispatch } from "react-redux";
import { LogIn } from "../../Redux/Slice/AuthSlice";

const theme = createTheme();
const schema = yup
  .object({
    Email: yup
    .string()
    .email("Введите корректный Email!")
    .required("Поле обязательно к заполнению!"),
    Password: yup
    .string()
    .required("Поле обязательно к заполнению!"),
  })
  .required();

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const email = data.Email;
    const password = data.Password;
    const password_hash = SHA256(password).toString();
    dispatch(LogIn(email, password_hash));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className='w-screen h-[50rem] flex justify-center items-center'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "380px",
          }}
          className='mx-auto text-center'
        >
          <img alt="logo" src={LogoSVG}></img>
          <p className="Font-Inter font-bold text-2xl text-wires-main py-1 mb-2">
            Social Community App
          </p>
          <p className="Font-Inter font-normal text-sm text-wires-text py-1 mb-4">
            Events are in one place
          </p>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <EmailInput
              {...register("Email", { required: true })}
              required
              fullWidth
              margin="normal"
              name="Email"
              label="Email"
              id="Email"
              autoComplete="Email"
              error={!!errors.Email}
              helperText={errors.Email?.message}
            />
            <PasswordInput
              {...register("Password")}
              required
              fullWidth
              margin="dense"
              name="Password"
              label="Password"
              type="Password"
              id="Password"
              autoComplete="current-password"
              error={!!errors.Password}
              helperText={errors.Password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              <Grid item>
              Нет аккаунта? 
                <Link to={"/Register"}>{" Sign Up"}</Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
