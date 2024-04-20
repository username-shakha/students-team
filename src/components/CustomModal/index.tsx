import { ModalProps, Modal, Typography } from "@mui/material";

interface ICustomModalProps extends Omit<ModalProps, "onOpen"> {
  open: boolean;
  onClose: () => void;
  title: string;
}

export default function CustomModal({
  open,
  onClose,
  title,
  children,
}: ICustomModalProps) {
  return (
    <Modal onClose={onClose} open={open}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        {children}
      </div>
    </Modal>
  );
}
