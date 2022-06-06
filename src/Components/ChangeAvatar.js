import React from "react";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import { useDispatch, useSelector } from "react-redux";

export const ChangeAvatar = () => {
  const userName = useSelector((state) => state.user.username);
  const avatar_url = useSelector((state) => state.user.avatar_url);
  const first_name = useSelector((state) => state.user.first_name);
  const last_name = useSelector((state) => state.user.last_name);

  const inputRef = React.useRef();
  const triggerFileSelectPopup = () => inputRef.current.click();

  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
    console.log(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  return (
    <div className="bg-white container-md shadow-lg rounded-md px-10 py-8">
      <div className="ml-8">
        <span className="Font-Inter font-bold text-name text-[1.50rem]">
          Профиль
        </span>
      </div>
      <div className="flex flex-row">
        <div className="mx-auto relative">
          <img
            src={avatar_url}
            className="mx-auto w-[10rem] h-[10rem] rounded-full mx-2 my-[1rem]"
          />
        </div>
        <div className="px-14 py-8">
          <div className="Font-Inter text-name font-semibold text-2xl">
            {first_name} {last_name}
          </div>
          <div className="mt-1 text-name text-xl">@{userName}</div>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onSelectFile}
            style={{ display: "none" }}
          />
          <button
            onClick={triggerFileSelectPopup}
            type="button"
            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Изменить фотографию
          </button>
          <div>
            {image ? (
              <>
                <Cropper
                  image={image}
                  crop={crop}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeAvatar;
