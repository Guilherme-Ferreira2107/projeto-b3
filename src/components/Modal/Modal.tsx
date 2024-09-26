import { Box, Modal as ModalMUI } from "@mui/material";

const Modal = ({
  children,
  open,
  onClose,
}: {
  children: JSX.Element;
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <ModalMUI
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {children}
      </Box>
    </ModalMUI>
  );
};

export { Modal };
