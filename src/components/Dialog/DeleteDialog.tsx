import { Warning } from "@mui/icons-material";
import { Box, Button, Dialog, DialogTitle, Typography } from "@mui/material";

interface IDeleteDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  content?: string;
  title: string;
}

export const DeleteDialog: React.FC<IDeleteDialogProps> = ({
  open,
  onCancel,
  onConfirm,
  title,
  content,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>
        <Box display="flex">
          <Warning color="warning" sx={{ mr: 1 }} />
          {title}
        </Box>
      </DialogTitle>
      <Box sx={{ p: 3 }}>
        <Typography variant="body1">
          {(content ?? "Are you sure want to delete") + " "}
        </Typography>
      </Box>
      <Box sx={{ p: 3, pt: 2 }} textAlign="right">
        <Button
          variant="contained"
          color="primary"
          onClick={onCancel}
          sx={{ mr: 1 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            onConfirm();
          }}
        >
          Delete
        </Button>
      </Box>
    </Dialog>
  );
};
