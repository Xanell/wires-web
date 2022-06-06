import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { UserUpdate } from "../Redux/Slice/UserSlice";

export const ChangeUserName = () => {

  const first_name = useSelector((state) => state.user.first_name);
  const last_name = useSelector((state) => state.user.last_name);

  const schema = yup
    .object({
      first_name: yup.string().required("Поле обязательно к заполнению!"),
      last_name: yup.string().required("Поле обязательно к заполнению!"),
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

  const changeUserName = (data) => {
    const first_name = data.first_name;
    const last_name = data.last_name;
    dispatch(UserUpdate(first_name, last_name));
  };

  return (
      <div className="bg-white container-md shadow-lg rounded-md px-10 py-8 ml-5">
        <span className="Font-Inter font-bold text-name text-[1.50rem]">
          Личная информация
        </span>
        <div className="grid gap-4 mt-1 mb-2">
          <Box component="form" onSubmit={handleSubmit(changeUserName)}>
            <div className="flex flex-col">
              <span className="Font-Inter font-semibold text-name text-[1rem]">
                Имя
              </span>
              <TextField
                {...register("first_name", { required: true })}
                variant="standard"
                error={!!errors.first_name}
                helperText={
                  !!errors.first_name?.message
                    ? errors.first_name?.message
                    : " "
                }
                placeholder={first_name}
              />
            </div>
            <div className="flex flex-col">
              <span className="Font-Inter font-semibold text-name text-[1rem]">
                Фамилия
              </span>
              <TextField
                {...register("last_name", { required: true })}
                variant="standard"
                error={!!errors.last_name}
                helperText={
                  !!errors.last_name?.message ? errors.last_name?.message : " "
                }
                placeholder={last_name}
              />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Изменить данные
            </Button>
          </Box>
        </div>
      </div>
  );
};

export default ChangeUserName;
