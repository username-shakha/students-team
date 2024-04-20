import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { ReactNode } from "react";
import RowAction from "./RowActions";
import { CUSTOM_TABLE_HEADS, TStudent } from "@/types";

interface ICustomTableProps {
  heads: CUSTOM_TABLE_HEADS[];
  rows: Record<string, ReactNode>[];
  handleDelete: (student: TStudent) => void;
  handleUpdate: (student: TStudent) => void;
}

export default function CustomTable({
  heads,
  rows,
  handleDelete,
  handleUpdate,
}: ICustomTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {heads.map((head) => {
              if (head.hidden) return null;
              return (
                <TableCell key={head.key} align="left">
                  {head.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              {heads.map((head) => {
                if (head.hidden) return null;
                if (head.render != null) {
                  return (
                    <TableCell key={head.key}>
                      {head.render(row[head.key] as string, row)}
                    </TableCell>
                  );
                }

                return (
                  <TableCell key={head.key} align="left" component="th" scope="row">
                    {head.key !== "action" ? (
                      row[head.key]
                    ) : (
                      <RowAction
                        handleDelete={() => handleDelete(row as TStudent)}
                        handleUpdate={() => handleUpdate(row as TStudent)}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
