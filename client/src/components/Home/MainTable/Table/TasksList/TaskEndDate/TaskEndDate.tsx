import { FC, useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { RootState } from "../../../../../../redux/store";
import { useClickOutside } from "../../../../../../hooks/useClickOutside";
import { convertDate } from "../../../../../../helpers/helpers";
import { setGoalEndDate } from "../../../../../../redux/tasksSlice/tasksSlice";
import { DatePickerComponent } from "../DatePickerComponent/DatePickerComponent";

interface IProps {
  end_date: string;
  index: number;
  taskId: number;
}
export const TaskEndDate: FC<IProps> = ({ end_date, index, taskId }) => {
  const [endDate, setEndDate] = useState<Date | null>(null);
  const dispatch = useAppDispatch();
  const endDatepickerRef = useRef<any>(null);
  const { tasks } = useAppSelector((state: RootState) => state.tasks);
  const [isEndDatepicker, setIsEndDatepicker] = useState<boolean[]>(
    Array(tasks?.length ?? 0).fill(false)
  );

  useClickOutside(endDatepickerRef, () =>
    setIsEndDatepicker(Array(tasks?.length ?? 0).fill(false))
  );

  const handleOpenDatepicker = (index: number) => {
    setIsEndDatepicker(Array(tasks?.length ?? 0).fill(false));
    setIsEndDatepicker((prevState: boolean[]) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      newState.forEach((_, i) => {
        if (i !== index) {
          newState[i] = false;
        }
      });
      return newState;
    });
    setEndDate(null);
  };

  useEffect(() => {
    setIsEndDatepicker(Array(tasks?.length ?? 0).fill(false));
    setEndDate(null);
  }, [tasks?.length]);

  useEffect(() => {
    if (!endDate) return;
    dispatch(setGoalEndDate({ date: convertDate(endDate), taskId }));
    setEndDate(null);
  }, [dispatch, endDate, taskId]);

  return (
    <>
      <button className="" onClick={() => handleOpenDatepicker(index)}>
        {!end_date && (
          <span className="text-gray-600 text-xs font-normal cursor-pointer p-2">
            ---
          </span>
        )}
        <span className="text-gray-600 text-xs font-normal cursor-pointer">
          {end_date}
        </span>
      </button>
      {isEndDatepicker[index] && (
        <div
          className="absolute w-auto right-5 h-auto z-10"
          ref={endDatepickerRef}
        >
          <DatePickerComponent onChange={setEndDate} />
        </div>
      )}
    </>
  );
};
