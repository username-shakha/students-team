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
import { Heads, Student } from "../../types";

import RowAction from "./RowAction";

interface Props {
  heads: Heads[];
  rows: Record<string, ReactNode>[];
  handleDelete: (student: Student) => void;
  handleUpdate: (student: Student) => void;
}

export default function CTable({
  heads,
  rows,
  handleDelete,
  handleUpdate,
}: Props) {
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
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {heads.map((head) => {
                if (head.hidden) return null;
                return (
                  <TableCell
                    key={head.key}
                    align="left"
                    component="th"
                    scope="row"
                  >
                    {head.key !== "action" ? (
                      row[head.key]
                    ) : (
                      <RowAction
                        handleDelete={() => handleDelete(row as Student)}
                        handleUpdate={() => handleUpdate(row as Student)}
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
