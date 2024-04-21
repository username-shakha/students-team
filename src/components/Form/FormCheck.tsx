// import { CheckboxProps, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
// import {
//   FieldValues,
//   Controller,
//   Path,
//   RegisterOptions,
//   UnPackAsyncDefaultValues,
//   FieldPath,
//   Control,
// } from "react-hook-form";
// export interface IFormControl<T extends FieldValues> {
//   control: Control<T>;
//   name: Path<UnPackAsyncDefaultValues<T>>;
//   rules?: RegisterOptions<T, FieldPath<T>>;
//   required?: boolean;
// }
// export type IOption = {
//   label: string;
//   value: {
//     busy: boolean;
//     id: string;
//     name: string;
//     surname: string;
//     email: string;
//     role: "MASTER" | "BACHELOR";
//     gender: "MALE" | "FEMALE";
// }
// };
// export const FormCheckMultiple = <T extends FieldValues>(
//   props: IFormControl<T> & CheckboxProps & { options: IOption[] }
// ) => {
//   const { control, options, name, rules, ...refs } = props;

//   return (
//     <Controller
//       {...{ control, name, rules }}
//       render={({ field: { value, onChange } }) => {
//         return (
//           <>
//             {options.map((option, index) => (
//               <FormControlLabel
//                 key={index}
//                 label={option.label}
//                 control={
//                   <Checkbox
//                     {...refs}
//                     checked={Boolean(
//                       (value as IOption[])?.find((val) => val.value === option.value)
//                     )}
//                     onChange={() => {
//                       const val = (value as IOption[])?.find(
//                         (val) => val.value === option.value
//                       );
//                       if (Array.isArray(value)) {
//                         if (val) {
//                           onChange(
//                             (value as IOption[]).filter((T) => T.value !== option.value)
//                           );
//                         } else {
//                           onChange([...(value as IOption[]), option]);
//                         }
//                       } else {
//                         onChange([option]);
//                       }
//                     }}
//                   />
//                 }
//               />
//             ))}
//           </>
//         );
//       }}
//     />
//   );
// };
