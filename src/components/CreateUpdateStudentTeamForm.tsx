import { useState, FormEvent, useRef, ChangeEvent } from "react";
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
import { TStudent } from "@/types";

const BoxStyled = styled(Box)({
  marginTop: "18px",
  display: "flex",
  justifyContent: "center",
  gap: "20px",
});

const FormControlLabelStyled = styled(FormControlLabel)({
  margin: "8px 0px 8px 8px",
  padding: "10px 20px 10px 0px ",
  "&:hover": { backgroundColor: "#b3a0a014", borderRadius: "10px" },
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

  const nameRef = useRef<HTMLInputElement>(null);
  const [master, setMaster] = useState<string | null>(null);
  const [bachelors, setBachelors] = useState<string[]>([]);

  const checkboxHandler = (e: ChangeEvent<HTMLInputElement>, id: TStudent["id"]) => {
    e.target.checked
      ? setBachelors((prev) => [...prev, id])
      : setBachelors((prev) => prev.filter((el) => el !== id));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedMaster = students.find((student) => student.id === master);
    const selectedBachelors = bachelors.map((id) =>
      students.find((student) => student.id === id)
    );

    const studentsToAdd = [];
    if (selectedMaster) studentsToAdd.push(formatStudent(selectedMaster));
    if (selectedBachelors.length > 0)
      selectedBachelors.forEach((bachelor) => {
        if (bachelor) studentsToAdd.push(formatStudent(bachelor));
      });

    if (
      nameRef.current !== null &&
      nameRef.current.value !== "" &&
      studentsToAdd.length === 3
    ) {
      dispatch(
        createStudentTeam({
          id: uuidv4(),
          name: nameRef.current.value,
          students: studentsToAdd,
        })
      );
      resetForm();
      onClose();
    }
  };

  const formatStudent = (student: TStudent) => ({
    id: student.id,
    firstname: student.name,
    lastname: student.surname,
    role: student.role,
  });

  const resetForm = () => {
    setMaster(null);
    setBachelors([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        inputRef={nameRef}
        label="Team Name"
        size="small"
        fullWidth
        inputProps={{ maxLength: 30 }}
      />
      <BoxStyled>
        {["MASTER", "BACHELOR"].map((role) => {
          const ControlComponent = role === "MASTER" ? RadioGroup : FormGroup;
          return (
            <ControlComponent
              key={role}
              sx={{ overflowX: "auto", maxHeight: "300px", flexWrap: "nowrap" }}
            >
              <Typography variant="h6">
                {role === "MASTER" ? "Masters" : "Bachelors"}
              </Typography>

              {studentComparison.map((student) => {
                const { id, name, email, busy, role: current } = student;
                if (current === role) {
                  return (
                    <FormControlLabelStyled
                      sx={{
                        mr: role === "MASTER" ? 1 : 5,
                      }}
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
                            checked={bachelors.includes(id) || busy}
                            onChange={(e) => {
                              if (e.target.checked && bachelors.length >= 2) return;
                              else checkboxHandler(e, id);
                            }}
                          />
                        )
                      }
                      label={
                        <div>
                          <Typography variant="subtitle1">{name}</Typography>
                          <Typography variant="subtitle2">{email}</Typography>
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
