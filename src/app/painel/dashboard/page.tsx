"use client";

import React, { useEffect, useState } from "react";
import { useFetchCurrencies } from "@/hooks";
import {
  Box,
  Button,
  Container,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Funnel } from "@phosphor-icons/react";

import { Breadcrumb, Table, Modal } from "@/components";
import { IRows } from "@/components/Table/interfaces";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./page.module.css";
import { filterSchema } from "./validations";
import { column, transformFixerResponseToRows } from "./utils";
import { GridRowParams } from "@mui/x-data-grid";
import { ModalContent } from "./components/ModalContent/ModalContent";

const Dashboard = () => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ currency: string }>({
    resolver: yupResolver(filterSchema),
    defaultValues: {
      currency: "EUR",
    },
  });
  const { send, data, loading } = useFetchCurrencies();

  const [rows, setRows] = useState<IRows[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IRows>({} as IRows);

  const breadcrumbItems = [{ label: "Dashboard", link: "/painel/dashboard" }];

  const onSubmit: SubmitHandler<{ currency: string }> = (data) => {
    send(data.currency);
  };

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow({} as IRows);
  };

  useEffect(() => {
    setValue("currency", "EUR");
  }, [setValue]);

  useEffect(() => {
    if (data && data.rates) {
      const newRows = transformFixerResponseToRows(data);
      setRows(newRows);
    }
  }, [data]);

  return (
    <Container maxWidth="md">
      <Breadcrumb items={breadcrumbItems} />

      <Typography variant="h4" gutterBottom color="textPrimary">
        Dashboard de Moedas
      </Typography>

      <Paper elevation={1} sx={{ padding: "1rem", marginBottom: "1rem" }}>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup sx={{ flex: { xs: "1 0 100%", md: "1 0 auto" } }}>
            <InputLabel id="currency-select-label">
              Selecione a moeda
            </InputLabel>
            <Select
              id="currency-select-label"
              labelId="currency-select-label"
              label="Selecione o par de moeda"
              aria-label="Selecione o par de moeda"
              fullWidth
              size="small"
              defaultValue="EUR"
              error={!!errors.currency}
              {...register("currency")}
            >
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="BRL">BRL</MenuItem>
            </Select>
          </FormGroup>

          <Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              className={styles.buttonFilter}
              endIcon={<Funnel />}
            >
              Filtrar
            </Button>
          </Box>
        </form>
      </Paper>

      <Table
        columns={column}
        rows={rows}
        loading={loading}
        onRowClick={handleRowClick}
      />

      <Modal open={open} onClose={handleClose}>
        <ModalContent selectedRow={selectedRow} handleClose={handleClose} />
      </Modal>
    </Container>
  );
};

export default Dashboard;
