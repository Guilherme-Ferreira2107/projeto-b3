"use client";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { Save } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";

import { Breadcrumb } from "@/components";
import { IUserState } from "@/interfaces";
import { RootState, updateUser } from "@/store";

import { schema } from "./validations";

const Perfil = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserState>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name,
      lastName: user.lastName,
      country: user.country,
      email: user.email,
      darkMode: user.darkMode,
    },
  });

  const breadcrumbItems = [
    { label: "Dashboard", link: "/painel/dashboard" },
    { label: "Perfil", link: "/painel/perfil" },
  ];

  const onSubmit: SubmitHandler<Partial<IUserState>> = (data) => {
    dispatch(updateUser(data));
    toast.success("Dados atualizados com sucesso!");
  };

  return (
    <Container maxWidth="md">
      <Breadcrumb items={breadcrumbItems} />

      <Typography variant="h4" gutterBottom color="textPrimary">
        Perfil
      </Typography>

      <Paper elevation={1} sx={{ padding: "1rem" }}>
        <Typography sx={{ mb: 4 }} color="textPrimary">
          Mantenha seus dados sempre atualizados!
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
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
            label="Sobrenome"
            fullWidth
            size="small"
            data-testid="input-lastname"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            label="País"
            fullWidth
            size="small"
            data-testid="input-country"
            {...register("country")}
            error={!!errors.country}
            helperText={errors.country?.message}
          />
          <TextField
            label="E-mail"
            type="email"
            fullWidth
            size="small"
            data-testid="input-email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<Save />}
          >
            Salvar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Perfil;
