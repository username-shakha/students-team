import { Button, Container, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { CreateStudent, CTable } from "../components";
import { useAppDispatch, useAppSelector } from "../store";
import { selectStudent } from "../features/student/selector";
import student_head from "../components/Table/constants";
import { remove } from "../features/student";
import { useState } from "react";
import { Student } from "../types";
import CustomModal from "../components/Dialog";
import { DeleteDialog } from "../components/Dialog/DeleteDialog";

export default function StudentPage() {
  const students = useAppSelector(selectStudent);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [current, setCurrent] = useState<Student | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const dispatch = useAppDispatch();
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
          onClick={() => setIsCreate(true)}
        >
          Add Student
        </Button>
      </Stack>
      <CTable
        heads={student_head}
        rows={students}
        handleDelete={(student) => {
          setCurrent(student);
          setShowDeleteDialog(true);
        }}
        handleUpdate={(student) => {
          setCurrent(student);
          setIsUpdate(true);
        }}
      />
      {isUpdate && current && (
        <CustomModal
          open={isUpdate}
          onClose={() => setIsUpdate(false)}
          title="Update current student"
        >
          <CreateStudent initial={current} onClose={() => setIsUpdate(false)} />
        </CustomModal>
      )}
      {isCreate && (
        <CustomModal
          open={isCreate}
          onClose={() => setIsCreate(false)}
          title="Create student"
        >
          <CreateStudent onClose={() => setIsCreate(false)} />
        </CustomModal>
      )}
      <DeleteDialog
        content="Are you sure you want to delete this student?"
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          if (current && !(students && students.length <= 1)) {
            dispatch(remove(current.id));
            setShowDeleteDialog(false);
          }
        }}
        open={showDeleteDialog}
        title={"Confirm Delete"}
      />
    </Container>
  );
}
