import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { IRows } from "@/components/Table/interfaces";

interface IModalContent {
  selectedRow: IRows;
  handleClose: () => void;
}

const ModalContent = ({ selectedRow, handleClose }: IModalContent) => {
  return (
    <React.Fragment>
      <Typography id="modal-title" variant="h6" component="h2">
        Detalhes da moeda
      </Typography>
      <Divider />
      <Typography id="modal-description" sx={{ mt: 2 }}>
        <b>ID:</b> {selectedRow?.id} <br />
        <b>Moeda: :</b> {selectedRow?.currency}
        <br />
        <b>Dia e hora:</b> {selectedRow?.date} <br />
        <b>Valor:</b> R${selectedRow?.value}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
          Fechar
        </Button>
      </Box>
    </React.Fragment>
  );
};

export { ModalContent };
