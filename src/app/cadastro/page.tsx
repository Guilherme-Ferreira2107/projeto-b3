"use client";

import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";

import { updateUser } from "@/store";
import { IUserState } from "@/interfaces";
import { LinkComponent } from "@/components";

import { schema } from "./validations";
import styles from "../page.module.css";

const Cadastro: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserState>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<Partial<IUserState>> = (data) => {
    dispatch(updateUser(data));
    toast.success("Cadastro realizado com sucesso!");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={1} sx={{ padding: "2rem" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Usuário
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <TextField
            label="Nome"
            fullWidth
            size="small"
            data-testid="input-name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            data-testid="input-lastname"
            label="Sobrenome"
            fullWidth
            size="small"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />

          <TextField
            data-testid="input-country"
            label="País"
            fullWidth
            size="small"
            {...register("country")}
            error={!!errors.country}
            helperText={errors.country?.message}
          />

          <TextField
            data-testid="input-email"
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
            Cadastrar
          </Button>

          <LinkComponent href="/login">
            Já tem uma conta? Faça login agora!
          </LinkComponent>
        </form>
      </Paper>
    </Container>
  );
};

export default Cadastro;
