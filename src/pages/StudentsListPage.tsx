import { useState } from "react";
import { Container, Stack, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "@/store";
import {
  CreateUpdateStudentForm,
  CustomModal,
  CustomTable,
  DeleteDialog,
} from "@/components";
import { STUDENT_LIST_HEADS } from "@/constants/CustomTable";
import { removeStudent } from "@/store/slices";
import { selectStudents } from "@/store/slices/selectors";
import { TStudent } from "@/types";

export default function StudentsListPage() {
  const studentsList = useAppSelector(selectStudents);
  const [modalType, setModalType] = useState<"update" | "create" | "delete" | null>(null);
  const [current, setCurrent] = useState<TStudent | null>(null);
  const dispatch = useAppDispatch();

  const handleModalClose = () => {
    setModalType(null);
    setCurrent(null);
  };

  const handleDeleteStudent = () => {
    if (current && studentsList.length > 1) {
      dispatch(removeStudent(current.id));
    }
    handleModalClose();
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center">
        <Typography variant="h4" sx={{ mr: "auto", my: 2 }}>
          Student List
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="info"
          startIcon={<Add />}
          onClick={() => setModalType("create")}
        >
          Add Student
        </Button>
      </Stack>
      {Array.isArray(studentsList) && studentsList.length >= 1 && (
        <CustomTable
          heads={STUDENT_LIST_HEADS}
          rows={studentsList}
          handleDelete={(student) => {
            setCurrent(student);
            setModalType("delete");
          }}
          handleUpdate={(student) => {
            setCurrent(student);
            setModalType("update");
          }}
        />
      )}

      <CustomModal
        open={(modalType !== null && modalType === "update") || modalType === "create"}
        onClose={handleModalClose}
        title={modalType === "update" ? "Update current student" : "Create student"}
      >
        <CreateUpdateStudentForm
          initialState={current ?? undefined}
          onClose={handleModalClose}
        />
      </CustomModal>

      <DeleteDialog
        content="Are you sure you want to delete this student?"
        onCancel={handleModalClose}
        onConfirm={handleDeleteStudent}
        open={modalType === "delete"}
        title={"Confirm Delete"}
      />
    </Container>
  );
}
