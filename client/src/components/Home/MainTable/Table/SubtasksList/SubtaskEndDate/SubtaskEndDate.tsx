import { FC, useState, useEffect, useRef } from "react";
import { DatePickerComponent } from "../../TasksList/DatePickerComponent/DatePickerComponent";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { RootState } from "../../../../../../redux/store";
import { useClickOutside } from "../../../../../../hooks/useClickOutside";
import { convertDate } from "../../../../../../helpers/helpers";
import { setGoalEndDateForSubtask } from "../../../../../../redux/subtasksSlice/subtasksSlice";

interface IProps {
  end_date: string;
  index: number;
  subtaskId: number;
}
export const SubtaskEndDate: FC<IProps> = ({ end_date, index, subtaskId }) => {
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { subtasks } = useAppSelector((state: RootState) => state.subtasks);
  const dispatch = useAppDispatch();
  const datepickerRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState<boolean[]>(
    Array(subtasks?.length ?? 0).fill(false)
  );

  useClickOutside(datepickerRef, () =>
    setIsOpen(Array(subtasks?.length ?? 0).fill(false))
  );

  useEffect(() => {
    if (!endDate) return;
    dispatch(
      setGoalEndDateForSubtask({
        date: convertDate(endDate),
        subtaskId,
      })
    );
  }, [dispatch, endDate, subtaskId]);

  useEffect(() => {
    setIsOpen(Array(subtasks?.length ?? 0).fill(false));
  }, [subtasks?.length]);

  const handleOpen = (index: number) => {
    setIsOpen((prevState: boolean[]) => {
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
  return (
    <>
      <button className="" onClick={() => handleOpen(index)}>
        {!end_date && (
          <span className="text-gray-600 text-xs font-normal cursor-pointer p-2">
            ---
          </span>
        )}
        <span className="text-gray-600 text-xs font-normal cursor-pointer">
          {end_date}
        </span>
      </button>
      {isOpen[index] && (
        <div
          className="absolute w-auto right-5 h-auto z-10"
          ref={datepickerRef}
        >
          <DatePickerComponent onChange={setEndDate} />
        </div>
      )}
    </>
  );
};
