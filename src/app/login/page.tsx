"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";

import { LinkComponent } from "@/components";
import { RootState, loginUser } from "@/store";

import styles from "../page.module.css";
import { loginSchema } from "./validations";

const Login: React.FC = () => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (user.email) setValue("email", user.email);

    if (user.isAuthenticated) router.push("/painel/dashboard");
  }, [user, router, setValue]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={1} sx={{ padding: "2rem" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <TextField
            label="E-mail"
            type="email"
            fullWidth
            size="small"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              backgroundColor: "#004f4d",
              "&:hover": {
                backgroundColor: "#003f3c",
              },
            }}
          >
            Entrar
          </Button>

          <LinkComponent href="/cadastro">
            Não tem uma conta? Cadastre-se agora!
          </LinkComponent>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
