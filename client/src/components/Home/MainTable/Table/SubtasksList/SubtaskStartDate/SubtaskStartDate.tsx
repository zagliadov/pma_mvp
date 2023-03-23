import { FC, useState, useEffect, useRef } from "react";
import { RootState } from "../../../../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { DatePickerComponent } from "../../TasksList/DatePickerComponent/DatePickerComponent";
import { useClickOutside } from "../../../../../../hooks/useClickOutside";
import { setGoalStartDateForSubtask } from "../../../../../../redux/subtasksSlice/subtasksSlice";
import { convertDate } from "../../../../../../helpers/helpers";

interface IProps {
  start_date: string;
  index: number;
  subtaskId: number;
}

export const SubtaskStartDate: FC<IProps> = ({
  start_date,
  index,
  subtaskId,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const dispatch = useAppDispatch();
  const { subtasks } = useAppSelector((state: RootState) => state.subtasks);
  const [isOpen, setIsOpen] = useState<boolean[]>(
    Array(subtasks?.length ?? 0).fill(false)
  );
  const datepickerRef = useRef<any>(null);

  useClickOutside(datepickerRef, () =>
    setIsOpen(Array(subtasks?.length ?? 0).fill(false))
  );

  useEffect(() => {
    setIsOpen(Array(subtasks?.length ?? 0).fill(false));
  }, [subtasks?.length]);

  useEffect(() => {
    if (!startDate) return;
    dispatch(
      setGoalStartDateForSubtask({
        date: convertDate(startDate),
        subtaskId,
      })
    );
    setStartDate(null);
  }, [dispatch, startDate, subtaskId]);

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
    setStartDate(null);
  };

  return (
    <>
      <button className="" onClick={() => handleOpen(index)}>
        {!start_date && (
          <span className="text-gray-600 text-xs font-normal cursor-pointer p-2">
            ---
          </span>
        )}
        <span className="text-gray-600 text-xs font-normal cursor-pointer">
          {start_date}
        </span>
      </button>
      {isOpen[index] && (
        <div
          className="absolute w-auto right-5 h-auto z-10"
          ref={datepickerRef}
        >
          <DatePickerComponent onChange={setStartDate} />
        </div>
      )}
    </>
  );
};
