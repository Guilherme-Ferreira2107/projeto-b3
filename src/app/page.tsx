"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Container,
  Typography,
  Grid2 as Grid,
  Card,
  CardContent,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaletteIcon from "@mui/icons-material/Palette";
import TableChartIcon from "@mui/icons-material/TableChart";

import styles from "./page.module.css";

const Home: React.FC = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push("/login");
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        Bem-vindo ao Projeto de Cotações de Moedas
      </Typography>
      <Typography variant="h6" gutterBottom>
        Gerencie seu perfil, personalize o tema e acompanhe as cotações de
        moedas em tempo real.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <AccountCircleIcon
                className={styles.iconsColor}
                fontSize="large"
              />
              <Typography variant="h5" component="div" gutterBottom>
                Cadastro de Usuário
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cadastre-se com seus dados pessoais e comece a usar a aplicação.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <PaletteIcon fontSize="large" className={styles.iconsColor} />
              <Typography variant="h5" component="div" gutterBottom>
                Personalização de Tema
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Alterne entre modo claro e escuro e escolha suas cores
                favoritas.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <TableChartIcon className={styles.iconsColor} fontSize="large" />
              <Typography variant="h5" component="div" gutterBottom>
                Tabela de Moedas
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visualize cotações atualizadas e ordene os dados conforme sua
                preferência.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        size="large"
        onClick={handleStart}
        sx={{
          marginTop: "40px",
          backgroundColor: "#004f4d",
          "&:hover": {
            backgroundColor: "#003f3c",
          },
        }}
      >
        Começar Agora
      </Button>
    </Container>
  );
};

export default Home;
