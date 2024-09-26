"use client";

import {
  Container,
  Button,
  Typography,
  Box,
  Switch,
  FormGroup,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { Save } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";

import { Breadcrumb } from "@/components";
import { IUserState } from "@/interfaces";
import { RootState, updateUser } from "@/store";

const Configuracoes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { register, handleSubmit } = useForm<IUserState>({
    defaultValues: {
      darkMode: user.darkMode,
      allowNotifications: user.allowNotifications,
      language: user.language,
    },
  });

  const breadcrumbItems = [
    { label: "Dashboard", link: "/painel/dashboard" },
    { label: "Preferências", link: "/painel/configuracoes" },
  ];

  const onSubmit: SubmitHandler<Partial<IUserState>> = (data) => {
    dispatch(updateUser(data));
    toast.success("Dados atualizados com sucesso!");
  };

  return (
    <Container maxWidth="md">
      <Breadcrumb items={breadcrumbItems} />

      <Typography variant="h4" gutterBottom color="textPrimary">
        Preferências do sistema
      </Typography>

      <Paper elevation={1} sx={{ padding: "1rem" }}>
        <Typography variant="subtitle1" color="textPrimary">
          Edite suas preferências!
        </Typography>

        <Divider />

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: "1rem", mt: 4 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>
              <Typography variant="body1" color="textPrimary">
                Preferências de tema
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Se habilitado exibe o tema escuro
              </Typography>
            </Box>
            <Switch {...register("darkMode")} defaultChecked={user.darkMode} />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>
              <Typography variant="body1" color="textPrimary">
                Preferências de notificação
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Se habilitado é permitido enviar notificações para o usuário
              </Typography>
            </Box>
            <Switch
              {...register("allowNotifications")}
              defaultChecked={user.allowNotifications}
            />
          </Box>

          <FormGroup sx={{ flex: { xs: "1 0 100%", md: "1 0 auto" } }}>
            <InputLabel id="select-language">Selecione a linguagem</InputLabel>
            <Select
              id="select-language"
              labelId="select-language"
              label="Selecione a linguagem"
              aria-label="Selecione a linguagem"
              fullWidth
              size="small"
              defaultValue="PT"
              {...register("language")}
            >
              <MenuItem value="PT">Português</MenuItem>
              <MenuItem value="EN">Inglês</MenuItem>
            </Select>
          </FormGroup>

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

export default Configuracoes;
