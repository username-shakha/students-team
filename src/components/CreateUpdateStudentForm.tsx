import React, { useRef, FormEvent, useEffect } from "react";
import { SelectChangeEvent, Stack, TextField, Button } from "@mui/material";
import { createStudent, updateStudent } from "@/store/slices/studentsSlice";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "@/store";
import CustomSelect from "./CustomSelect";
import { TStudent } from "@/types";

const SELECT_OPTIONS = {
  role: [
    { value: "MASTER", label: "Master" },
    { value: "BACHELOR", label: "Bachelor" },
  ],
  gender: [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
  ],
};

interface CreateUpdateStudentFormProps {
  initialState?: TStudent;
  onClose: () => void;
}

export default function CreateUpdateStudentForm({
  initialState,
  onClose,
}: CreateUpdateStudentFormProps) {
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  // const roleRef = useRef<HTMLInputElement>(null);
  // const genderRef = useRef<HTMLInputElement>(null);

  const [role, setRole] = React.useState<TStudent["role"]>("MASTER");
  const [gender, setGender] = React.useState<TStudent["gender"]>("MALE");
  //roleRef, genderRef
  const all = [nameRef, surnameRef, emailRef];

  const handleSelectChange =
    (type: "role" | "gender") => (event: SelectChangeEvent<string>) => {
      if (type === "role") {
        setRole(event.target.value as TStudent["role"]);
      } else if (type === "gender") {
        setGender(event.target.value as TStudent["gender"]);
      }
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (all.every((ref) => ref.current !== null && ref.current.value !== "")) {
      const student = {
        id: uuidv4(),
        name: nameRef.current!.value,
        surname: surnameRef.current!.value,
        email: emailRef.current!.value,
        // role: roleRef.current!.value,
        role: role,
        // gender: genderRef.current!.value,
        gender: gender,
      };
      if (student) {
        if (initialState) {
          dispatch(updateStudent({ student: student, id: initialState.id }));
          onClose();
        } else {
          dispatch(createStudent(student));
          onClose();
        }
      }
    }
  };

  useEffect(() => {
    if (initialState) {
      const { name, surname, email, role, gender } = initialState;
      if (nameRef.current) nameRef.current.value = name;
      if (surnameRef.current) surnameRef.current.value = surname;
      if (emailRef.current) emailRef.current.value = email;
      if (role) setRole(role);
      if (gender) setGender(gender);
    }
  }, [initialState]);
  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={2} width={400}>
          <TextField label="Name" inputRef={nameRef} size="small" />
          <TextField label="Surname" inputRef={surnameRef} size="small" />
          <TextField label="Email" inputRef={emailRef} size="small" />
          {/* <TextField label="Role" inputRef={roleRef} /> */}
          <CustomSelect
            disabledLabel
            label="Role"
            value={role}
            options={SELECT_OPTIONS.role}
            onChange={(event) => handleSelectChange("role")(event)}
          />

          <CustomSelect
            label="Gender"
            value={gender}
            options={SELECT_OPTIONS.gender}
            onChange={(event) => handleSelectChange("gender")(event)}
          />

          {/* <TextField label="Gender" inputRef={genderRef} /> */}
          <Stack direction={"row"} spacing={2}>
            <Button fullWidth variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
}
