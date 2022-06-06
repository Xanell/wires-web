import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SHA256 from "crypto-js/sha256";

import { UserUpdatePassword } from "../Redux/Slice/UserSlice";

export const ChangeUserPassword = () => {
  const schema = yup
    .object({
        new_password_hash: 
        yup
        .string()
        .required("Поле обязательно к заполнению!")
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/, "Формат пароля не верный!"),
        old_password_hash:
        yup
        .string()
        .required("Поле обязательно к заполнению!"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const changePassword = (data) => {
    const old_password = data.old_password_hash;
    const old_password_hash = SHA256(old_password).toString();
    const new_password = data.new_password_hash;
    const new_password_hash = SHA256(new_password).toString();
    dispatch(UserUpdatePassword(old_password_hash, new_password_hash))
  };

  return (
    <div>
      <div className="container-md shadow-lg rounded-md px-10 py-8 bg-white ml-5 w-[20.50rem]">
        <span className="Font-Inter font-bold text-name text-[1.50rem]">
          Изменить пароль
        </span>
        <div className="grid gap-4 mt-1 mb-2">
          <Box component="form" onSubmit={handleSubmit(changePassword)}>
            <div className="flex flex-col">
              <span className="Font-Inter font-semibold text-name text-[1rem]">
                Текущий пароль
              </span>
              <TextField
                {...register("old_password_hash", { required: true })}
                variant="standard"
                type="password"
                error={!!errors.old_password_hash}
                helperText={
                  !!errors.old_password_hash?.message
                    ? errors.old_password_hash?.message
                    : " "
                }
              />
            </div>
            <div className="flex flex-col">
              <span className="Font-Inter font-semibold text-name text-[1rem]">
                Новый пароль
              </span>
              <TextField
                {...register("new_password_hash", { required: true })}
                variant="standard"
                type="password"
                error={!!errors.new_password_hash}
                helperText={
                  !!errors.new_password_hash?.message
                    ? errors.new_password_hash?.message
                    : " "
                }
              />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Изменить пароль
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};
