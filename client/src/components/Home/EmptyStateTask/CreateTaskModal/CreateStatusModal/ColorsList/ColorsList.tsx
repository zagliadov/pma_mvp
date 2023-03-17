import { FC } from "react";
import { FaColorCheck } from "../../../../../icons/icons";
import { useAppSelector } from "../../../../../../redux/hooks";
import { RootState } from "../../../../../../redux/store";

interface IProps {
  isActiveColor: Function;
  handleSelectColor: Function;
}
export const ColorsList: FC<IProps> = ({
  isActiveColor,
  handleSelectColor,
}) => {
  const colors = useAppSelector((state: RootState) => state.status.colors);
  return (
    <div className="flex">
      {colors &&
        colors.map((color: string, index: number) => {
          return (
            <div
              key={color}
              style={{
                borderColor: isActiveColor(index) ? color : "white",
              }}
              className="flex items-center mr-1 justify-center border-2 rounded h-8 w-8"
            >
              <button
                onClick={() => handleSelectColor(color, index)}
                style={{ backgroundColor: color }}
                className="h-6 w-6 rounded-sm flex items-center justify-center"
              >
                {isActiveColor(index) && <FaColorCheck />}
              </button>
            </div>
          );
        })}
    </div>
  );
};
