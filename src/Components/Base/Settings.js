import * as React from "react";
import { ChangeUserName } from "../ChangeUserName";
import { ChangeUserPassword } from "../ChangePasswordCard";
import { ChangeAvatar } from "../ChangeAvatar";
import { InterestsChange } from "../InterestsChange";
import { SideMenu } from "../../Components/SideMenu";
import { useSelector } from "react-redux";

export const Settings = () => {
  const interests = useSelector((state) => state.user.interests);

  return (
    <>
      <div className="flex flex-row bg-gray-100">
        <SideMenu />
        <div className="mx-10 my-4">
          <span className="Font-Inter font-bold text-name text-[2rem]">
            Настройки профиля
          </span>
          <div className="flex flex-row">
            <ChangeAvatar />
            <ChangeUserName />
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex flex-row mt-4">
              <div className="container-md shadow-lg rounded-md px-[2.36rem] py-8 bg-white">
                <span className="Font-Inter font-bold text-name text-[1.50rem]">
                  Выбор интересов
                </span>
                {interests.map((interests) => (
                  <InterestsChange interests={interests} />
                ))}
              </div>
              <ChangeUserPassword />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Settings;
