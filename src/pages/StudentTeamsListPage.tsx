import { CustomModal, CustomTable } from "@/components";
import CreateUpdateStudentTeamForm from "@/components/CreateUpdateStudentTeamForm";
import { STUDENT_TEAMS_LIST_HEADS } from "@/constants/CustomTable";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeStudentTeam } from "@/store/slices";
import { selectStudents, selectTeams } from "@/store/slices/selectors";
import { TTeam } from "@/types";
import { Add } from "@mui/icons-material";
import { Container, Stack, Typography, Button } from "@mui/material";
import { useState, useMemo } from "react";
export type currentTeam = {
  id: string;
  name: string;
  students: string;
};
export default function StudentTeamsListPage() {
  const students = useAppSelector(selectStudents);
  const teams = useAppSelector(selectTeams);
  const dispatch = useAppDispatch();
  const [modalType, setModalType] = useState(false);
  const [current, setCurrent] = useState<currentTeam | null>(null);

  const handleModalClose = () => {
    setModalType(false);
  };
  const teamsMemoized = useMemo(() => {
    if (!teams) return [];
    return teams.map((team) => ({
      id: team?.id || "",
      name: team?.name || "",
      students: `${team?.students
        ?.filter((student) => student.role === "MASTER")
        .map((student) => `${student?.firstname} ${student?.lastname}`)
        .join("&")}<>${team?.students
        ?.filter((student) => student?.role === "BACHELOR")
        .map((student) => `${student?.firstname} ${student?.lastname}`)
        .join("&")}`,
    }));
  }, [teams, students]);

  return (
    <Container>
      <Stack direction="row" alignItems="center">
        <Typography variant="h4" sx={{ mr: "auto", my: 2 }}>
          Team List
        </Typography>
        <Button
          size="small"
          variant="contained"
          disabled={students.length < 1}
          color="info"
          startIcon={<Add />}
          onClick={() => setModalType(true)}
        >
          Add Team
        </Button>
      </Stack>
      <CustomTable
        heads={STUDENT_TEAMS_LIST_HEADS}
        rows={teamsMemoized}
        handleDelete={(team) => dispatch(removeStudentTeam(team.id as TTeam["id"]))}
        handleUpdate={(team) => setCurrent(team as currentTeam)}
      />
      <CustomModal open={modalType} onClose={handleModalClose} title={"Add Team"}>
        <CreateUpdateStudentTeamForm
          initialState={current ?? undefined}
          onClose={handleModalClose}
        />
      </CustomModal>
    </Container>
  );
}
