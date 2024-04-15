import React, { useEffect } from "react";
import { FormEvent, useRef } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../store";
import { create, update } from "../features/student";
import CustomSelect from "./Select";
import { SelectChangeEvent } from "@mui/material/Select";
import { Student } from "../types";

const role_select_options = [
  { value: "master", label: "Master" },
  { value: "bachelor", label: "Bachelor" },
];

const gender_select_options = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

interface CreateStudentProps {
  initial?: Student;
  onClose: () => void;
}

export default function CreateStudent({
  initial,
  onClose,
}: CreateStudentProps) {
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  // const roleRef = useRef<HTMLInputElement>(null);
  // const genderRef = useRef<HTMLInputElement>(null);

  const [role, setRole] = React.useState<"master" | "bachelor">("master");
  const [gender, setGender] = React.useState<"male" | "female">("male");
  //roleRef, genderRef
  const all = [nameRef, surnameRef, emailRef];

  const roleHandleChange = (event: SelectChangeEvent<string>) => {
    setRole(event.target.value);
  };

  const genderHandleChange = (event: SelectChangeEvent<string>) => {
    setGender(event.target.value);
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
        if (initial) {
          dispatch(update({ student: student, id: initial.id }));
          onClose();
        } else {
          dispatch(create(student));
          onClose();
        }
      }
    }
  };

  useEffect(() => {
    if (initial) {
      const { name, surname, email, role, gender } = initial;
      if (nameRef.current) nameRef.current.value = name;
      if (surnameRef.current) surnameRef.current.value = surname;
      if (emailRef.current) emailRef.current.value = email;
      if (role) setRole(role);
      if (gender) setGender(gender);
    }
  }, [initial]);
  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={2} width={400}>
          <TextField label="Name" inputRef={nameRef} />
          <TextField label="Surname" inputRef={surnameRef} />
          <TextField label="Email" inputRef={emailRef} />
          {/* <TextField label="Role" inputRef={roleRef} /> */}
          <CustomSelect
            disabledLabel
            label="Role"
            value={role}
            options={role_select_options}
            onChange={roleHandleChange}
          />

          <CustomSelect
            label="Gender"
            value={gender}
            options={gender_select_options}
            onChange={genderHandleChange}
          />

          {/* <TextField label="Gender" inputRef={genderRef} /> */}
          <Stack direction={"row"} spacing={2}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={onClose}
            >
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
