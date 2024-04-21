import { useState, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectStudents, selectTeams } from "@/store/slices/selectors";
import { createStudentTeam } from "@/store/slices";
import { currentTeam } from "@/pages/StudentTeamsListPage";

const BoxStyled = styled(Box)({
  marginTop: "18px",
  display: "flex",
  justifyContent: "center",
  gap: "20px",
});

interface Props {
  onClose: () => void;
  initialState?: currentTeam;
}

export default function CreateUpdateStudentTeamForm({ onClose }: Props) {
  const students = useAppSelector(selectStudents);
  const teams = useAppSelector(selectTeams);
  const dispatch = useAppDispatch();
  const studentComparison = students.map((student) => {
    const busy = teams.some((team) => team.students.some(({ id }) => id === student.id));
    return { ...student, busy };
  });

  const [name, setName] = useState<string>("");
  const [master, setMaster] = useState<string | null>(null);
  const [bachelor, setBachelor] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedMaster = students.find((student) => student.id === master);
    const selectedBachelors = bachelor.map((id) =>
      students.find((student) => student.id === id)
    );
    const studentsToAdd = [];
    if (selectedMaster)
      studentsToAdd.push({
        id: selectedMaster.id,
        firstname: selectedMaster.name,
        lastname: selectedMaster.surname,
        role: selectedMaster.role,
      });
    if (selectedBachelors.length > 0) {
      selectedBachelors.forEach((bachelor) => {
        if (bachelor)
          studentsToAdd.push({
            id: bachelor.id,
            firstname: bachelor.name,
            lastname: bachelor.surname,
            role: bachelor.role,
          });
      });
    }
    console.log(studentsToAdd);
    if (name !== "" && studentsToAdd.length === 3) {
      dispatch(
        createStudentTeam({
          id: uuidv4(),
          name: name,
          students: studentsToAdd,
        })
      );
      setName("");
      setMaster(null);
      setBachelor([]);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Team Name"
        size="small"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <BoxStyled>
        {["MASTER", "BACHELOR"].map((role) => {
          const ControlComponent = role === "MASTER" ? RadioGroup : FormGroup;
          return (
            <ControlComponent key={role}>
              {studentComparison.map((student) => {
                const { id, name, email, busy, role: current } = student;
                if (current === role) {
                  return (
                    <FormControlLabel
                      sx={{ p: 2 }}
                      key={id}
                      value={name}
                      control={
                        role === "MASTER" ? (
                          <Radio
                            disabled={busy}
                            checked={master === id || busy}
                            onChange={() => setMaster(id)}
                          />
                        ) : (
                          <Checkbox
                            disabled={busy}
                            checked={bachelor.includes(id) || busy}
                            onChange={(e) =>
                              e.target.checked
                                ? setBachelor((prev) => [...prev, id])
                                : setBachelor((prev) =>
                                    prev.filter((studentId) => studentId !== id)
                                  )
                            }
                          />
                        )
                      }
                      label={
                        <div>
                          <Typography variant="h6">{name}</Typography>
                          <Typography variant="subtitle1">{email}</Typography>
                        </div>
                      }
                    />
                  );
                }
              })}
            </ControlComponent>
          );
        })}
      </BoxStyled>

      <Button variant="contained" onClick={onClose} size="small">
        Cancel
      </Button>
      <Button type="submit" variant="contained" size="small" sx={{ ml: 2 }}>
        Save
      </Button>
    </form>
  );
}
