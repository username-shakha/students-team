import { Close } from "@mui/icons-material";
import { Modal, Box, IconButton, Typography, Stack } from "@mui/material";
import { ReactNode } from "react";

const defaultStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export interface CustomModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  style?: React.CSSProperties;
  children: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  title,
  open,
  onClose,
  style = {},
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...defaultStyle, ...style }}>
        <Stack spacing={"auto"} direction={"row"} mb={2} alignItems={"center"}>
          <Typography variant="h5">{title}</Typography>
          <IconButton color="primary" onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
