import { CustomModal, CustomTable } from "@/components";
import CreateUpdateStudentTeamForm from "@/components/CreateUpdateStudentTeamForm";
import { STUDENT_TEAMS_LIST_HEADS } from "@/constants/CustomTable";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeStudentTeam } from "@/store/slices";
import { selectStudentTeams } from "@/store/slices/selectors";
import { Add } from "@mui/icons-material";
import { Container, Stack, Typography, Button } from "@mui/material";
import { useState, useMemo } from "react";

export default function StudentTeamsListPage() {
  const studentTeamsList = useAppSelector(selectStudentTeams);
  const dispatch = useAppDispatch();
  const [modalType, setModalType] = useState(false);

  const handleModalClose = () => {
    setModalType(false);
  };
  const studentTeamsListMemoized = useMemo(() => {
    if (!studentTeamsList) return [];
    return studentTeamsList.map((g) => ({
      id: g?.id || "",
      name: g?.name || "",
      students: `${g?.students
        ?.filter((student) => student.role === "MASTER")
        .map((student) => `${student?.firstname} ${student?.lastname}`)
        .join("&")}<>${g?.students
        ?.filter((student) => student?.role === "BACHELOR")
        .map((student) => `${student?.firstname} ${student?.lastname}`)
        .join("&")}`,
    }));
  }, [studentTeamsList]);
  // console.log(studentTeamsListMemoized);
  return (
    <Container>
      <Stack direction="row" alignItems="center">
        <Typography variant="h4" sx={{ mr: "auto", my: 2 }}>
          Team List
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="info"
          startIcon={<Add />}
          onClick={() => setModalType(true)}
        >
          Add Team
        </Button>
      </Stack>
      <CustomTable
        heads={STUDENT_TEAMS_LIST_HEADS}
        rows={studentTeamsListMemoized}
        handleDelete={(student) => dispatch(removeStudentTeam(student.id))}
        handleUpdate={() => {}}
      />
      <CustomModal open={modalType} onClose={handleModalClose} title={"Add Team"}>
        <CreateUpdateStudentTeamForm onClose={handleModalClose} />
      </CustomModal>
    </Container>
  );
}
