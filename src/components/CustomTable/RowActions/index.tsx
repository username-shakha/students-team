import { Edit, Delete } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

type RowActionProps = {
  handleDelete: () => void;
  handleUpdate: () => void;
};

export default function RowAction({
  handleDelete,
  handleUpdate,
}: RowActionProps) {
  return (
    <Box>
      <Button
        size="small"
        variant="outlined"
        color="warning"
        sx={{ mr: 1 }}
        startIcon={<Edit />}
        onClick={handleUpdate}
      >
        edit
      </Button>
      <Button
        size="small"
        variant="outlined"
        color="error"
        startIcon={<Delete />}
        onClick={handleDelete}
      >
        delete
      </Button>
    </Box>
  );
}
