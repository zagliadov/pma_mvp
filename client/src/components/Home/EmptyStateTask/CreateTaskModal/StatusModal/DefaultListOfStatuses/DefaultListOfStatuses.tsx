import { FC } from "react";
import { hexToRgba } from "../../../../../../helpers/helpers";
import { FaColorCheck, FaEditButton, FaTrashButton } from "../../../../../icons/icons";
import { useAppSelector, useAppDispatch } from "../../../../../../redux/hooks";
import { RootState } from "../../../../../../redux/store";
import { removeStatus } from "../../../../../../redux/statusSlice/statusSlice";

interface IStatusArray {
  id: number;
  color: string;
  status: string;
}

interface IProps {
  handleSaveStatus: Function;
  isStatusSelected: number | null;
  handleEditStatus: Function;
}
export const DefaultListOfStatuses: FC<IProps> = ({
  handleSaveStatus,
  isStatusSelected,
  handleEditStatus,
}) => {
  const statuses = useAppSelector((state: RootState) => state.status.statuses);
  const dispatch = useAppDispatch();
  const token: string | null = localStorage.getItem("token");

  const handleRemoveStatus = (id: number) => {
    if (!token) return;
    dispatch(removeStatus({token, id}));
  };

  return (
    <>
      {statuses &&
        statuses.map((status: IStatusArray, index: number) => {
          return (
            <div key={index} className="flex items-center py-2">
              <button
                onClick={() =>
                  handleSaveStatus(index, status.status, status.color)
                }
                className={`h-5 w-5 ${
                  isStatusSelected === index ? "bg-primary-500" : "bg-gray-100"
                } rounded flex items-center justify-center`}
              >
                {isStatusSelected === index && <FaColorCheck />}
              </button>

              <div className="w-full pl-2">
                <div
                  className="rounded"
                  style={{
                    backgroundColor: hexToRgba(status.color, 0.16),
                  }}
                >
                  <div className="flex items-center justify-between py-1 px-3">
                    <div className="flex items-center">
                      <div
                        style={{ backgroundColor: status.color }}
                        className="h-3 w-3 rounded-sm"
                      ></div>
                      <span className="pl-2">{status.status}</span>
                    </div>

                    {index > 3 && (
                      <div>
                        <button
                          className="p-1"
                          onClick={() => handleEditStatus(status.id)}
                        >
                          <FaEditButton />
                        </button>
                        <button
                          className="p-1 pl-2"
                          onClick={() => handleRemoveStatus(status.id)}
                        >
                          <FaTrashButton />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
