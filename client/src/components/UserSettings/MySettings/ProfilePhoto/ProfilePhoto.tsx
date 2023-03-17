import { FC, useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import {
  downloadPhoto,
  getAvatarFilename,
  removeUserAvatar,
  uploadPhoto,
} from "../../../../redux/userSettingsSlice/userSettingsSlice";

export const ProfilePhoto: FC = () => {
  const [selectedColor, setSelectedColor] = useState<number>(
    Number(localStorage.getItem("color_id")) | 0
  );
  const [colorAvatar, setColorAvatar] = useState<string>(
    localStorage.getItem("color") || "#6e5ee6"
  );
  const userPhoto = useAppSelector((state: RootState) => state.user.userPhoto);
  const [background, setBackground] = useState<any>({
    backgroundColor: colorAvatar,
  });
  const inputFile = useRef<any>(null);
  const token: string | null = localStorage.getItem("token");
  const { username } = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();

  const handleChooseColor = (color: string, id: number) => {
    localStorage.setItem("color", color);
    localStorage.setItem("color_id", String(id));
    setColorAvatar(color);
    setSelectedColor(id);
  };
  useEffect(() => {
    if (!token) return;
    dispatch(getAvatarFilename(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (userPhoto) {
      setBackground({
        backgroundImage: `url("http://localhost:9000/user_settings/user_avatar/${userPhoto}")`,
      });
    } else {
      setBackground({ backgroundColor: colorAvatar });
    }
  }, [colorAvatar, userPhoto]);

  useEffect(() => {
    if (!userPhoto) return;
    dispatch(downloadPhoto(userPhoto));
  }, [dispatch, token, userPhoto]);

  const handleUploadPhoto = (e: any) => {
    if (!token) return;
    if (e.target.files && e.target.files.length > 0) {
      dispatch(uploadPhoto({ token, file: e.target.files[0] }));
    }
    inputFile.current.value = null;
  };

  const handleRemoveUserAvatar = () => {
    if (!token) return;
    dispatch(removeUserAvatar(token));
  };

  return (
    <div className="pt-8 pb-8">
      <h4 className="text-base font-medium">Profile photo</h4>
      <div className="flex flex-col pt-6">
        <div className="relative flex items-center">
          <button
            className="absolute top-[-15px] left-14"
            onClick={handleRemoveUserAvatar}
          >
            <span>&#10005;</span>
          </button>
          <label
            htmlFor="upload-photo"
            onChange={(e) => handleUploadPhoto(e)}
            style={background}
            className="flex items-center justify-center w-16 h-16 rounded-full border cursor-pointer bg-center bg-contain"
          >
            <span className="text-2xl text-white font-medium">
              {!userPhoto && username?.charAt(0)}
            </span>
            <input
              type="file"
              ref={inputFile}
              id="upload-photo"
              accept="/image/*, .jpeg, .png, .jpg"
              className="hidden"
            />
          </label>
          <div className="flex flex-col pl-4">
            <span className="text-base font-medium text-gray-600">
              Upload photo
            </span>
            <span className="text-sm font-normal text-gray-600">
              Photo help your teammates recognize you
            </span>
          </div>
        </div>

        <div className="pt-6">
          <div className="flex flex-col pl-20">
            <span className="text-sm font-medium">Color your avatar</span>
            <div className="flex justify-around pt-2 w-[250px]">
              <button
                className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  selectedColor === 0 && "border"
                }`}
                onClick={() => handleChooseColor("#6e5ee6", 0)}
              >
                <div className="bg-violet-900 w-6 h-6 rounded-full"></div>
              </button>
              <button
                className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  selectedColor === 1 && "border"
                }`}
                onClick={() => handleChooseColor("#ff9739", 1)}
              >
                <div className="bg-orange-900 w-6 h-6 rounded-full"></div>
              </button>
              <button
                className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  selectedColor === 2 && "border"
                }`}
                onClick={() => handleChooseColor("#00abfb", 2)}
              >
                <div className="bg-blue-900 w-6 h-6 rounded-full"></div>
              </button>
              <button
                className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  selectedColor === 3 && "border"
                }`}
                onClick={() => handleChooseColor("#ff2b63", 3)}
              >
                <div className="bg-red-900 w-6 h-6 rounded-full"></div>
              </button>
              <button
                className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  selectedColor === 4 && "border"
                }`}
                onClick={() => handleChooseColor("#00b050", 4)}
              >
                <div className="bg-green-900 w-6 h-6 rounded-full"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
