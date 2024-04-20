import { useState, ChangeEvent, useMemo } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useAppSelector } from "@/store";
import { selectStudents, selectStudentTeams } from "@/store/slices/selectors";

interface CreateUpdateStudentTeamFormProps {
  onClose: () => void;
}

export default function CreateUpdateStudentTeamForm({
  onClose,
}: CreateUpdateStudentTeamFormProps) {
  const studentsList = useAppSelector(selectStudents);
  const teamsList = useAppSelector(selectStudentTeams);

  const studentsListFiltered = useMemo(() => {
    return studentsList.map((student) => {
      const busy = teamsList.some((team) =>
        team.students.some((student_in_team) => student_in_team.id === student.id)
      );
      return { ...student, busy };
    });
  }, [studentsList, teamsList]);

  console.log(studentsListFiltered);
  // busy

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  // console.log(selectedStudents);
  const handleChange = (event: ChangeEvent<HTMLInputElement>, studentId: string) => {
    const isChecked = event.target.checked;
    setSelectedStudents((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, studentId];
      } else {
        return prevSelected.filter((id) => id !== studentId);
      }
    });
  };

  return (
    <Box sx={{ display: "grid", placeItems: "center" }}>
      <form>
        <TextField label="Team Name" size="small" fullWidth />
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {["MASTER", "BACHELOR"].map((role) => (
            <Box key={role}>
              <Typography variant="h5">
                {role === "MASTER" ? "Masters" : "Bachelors"}
              </Typography>
              <FormGroup>
                {studentsListFiltered.map((student) => {
                  if (student.role === role) {
                    return (
                      <FormControlLabel
                        sx={{ p: 1 }}
                        key={student.id}
                        control={
                          <Checkbox
                            disabled={student.busy}
                            checked={
                              student.busy || selectedStudents.includes(student.id)
                            }
                            onChange={(e) => handleChange(e, student.id)}
                          />
                        }
                        label={
                          <Box>
                            <h5>{student.name}</h5>
                            <p>{student.email}</p>
                          </Box>
                        }
                      />
                    );
                  }
                  return null;
                })}
              </FormGroup>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            mt: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: "20px",
          }}
        >
          <Button variant="contained" onClick={() => onClose()} size="small">
            Cancel
          </Button>
          <Button variant="contained" size="small">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
