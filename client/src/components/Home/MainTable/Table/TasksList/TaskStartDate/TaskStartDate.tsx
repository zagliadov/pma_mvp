import { FC, useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { RootState } from "../../../../../../redux/store";
import { setGoalStartDate } from "../../../../../../redux/tasksSlice/tasksSlice";
import { convertDate } from "../../../../../../helpers/helpers";
import { useClickOutside } from "../../../../../../hooks/useClickOutside";
import { DatePickerComponent } from "../DatePickerComponent/DatePickerComponent";

interface IProps {
  start_date: string;
  index: number;
  taskId: number;
}
export const TaskStartDate: FC<IProps> = ({ start_date, index, taskId }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state: RootState) => state.tasks);
  const startDatepickerRef = useRef<any>(null);
  const [isDatepickerOpen, setIsDatepickerOpen] = useState<boolean[]>(
    Array(tasks?.length ?? 0).fill(false)
  );

  useClickOutside(startDatepickerRef, () =>
    setIsDatepickerOpen(Array(tasks?.length ?? 0).fill(false))
  );

  const handleOpenDatepicker = (index: number) => {
    setIsDatepickerOpen((prevState: boolean[]) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      newState.forEach((_, i) => {
        if (i !== index) {
          newState[i] = false;
        }
      });
      return newState;
    });
    setStartDate(null);
  };

  useEffect(() => {
    if (!startDate) return;
    dispatch(
      setGoalStartDate({
        date: convertDate(startDate),
        taskId,
      })
    );
    setStartDate(null);
  }, [dispatch, startDate, taskId]);

  useEffect(() => {
    setIsDatepickerOpen(Array(tasks?.length ?? 0).fill(false));
  }, [tasks?.length]);

  return (
    <>
      <button className="" onClick={() => handleOpenDatepicker(index)}>
        {!start_date && (
          <span className="text-gray-600 text-xs font-normal cursor-pointer p-2">
            ---
          </span>
        )}
        <span className="text-gray-600 text-xs font-normal cursor-pointer">
          {start_date}
        </span>
      </button>
      {isDatepickerOpen[index] && (
        <div
          className="absolute w-auto right-5 h-auto z-10"
          ref={startDatepickerRef}
        >
          <DatePickerComponent onChange={setStartDate} />
        </div>
      )}
    </>
  );
};
