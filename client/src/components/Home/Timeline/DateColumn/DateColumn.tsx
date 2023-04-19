import { FC } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import moment from "moment";

interface IDateColumn {
  dates: string[];
}

export const DateColumn: FC<IDateColumn> = ({ dates }) => {
  const { timeline } = useAppSelector((state: RootState) => state.diff);

  const countTheDaysInAMonth = (dates: string) => {
    const date = moment(dates, "MMM YYYY");
    return date.daysInMonth();
  };

  const columnView = (date: string) => {
    switch (timeline) {
      case "day":
        return `80px`;
      case "week":
        return `140px`;
      case "month":
        const daysInMonth = countTheDaysInAMonth(date);
        return `${daysInMonth * 10}px`;
      default:
        throw new Error(`Invalid timeline: ${timeline}`);
    }
  };

  return (
    <div className="flex flex-col">
      {dates.map((date: string) => {
        return (
          <div
            id={date}
            key={date}
            style={{ height: columnView(date) }}
            className={`text-center w-28 flex items-center justify-center bg-gray-50 border border-b-gray-100 border-t-gray-100`}
          >
            <span className={`text-sm font-normal text-gray-400 px-4`}>
              {date}
            </span>
          </div>
        );
      })}
    </div>
  );
};
