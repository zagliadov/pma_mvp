import { FC } from "react";

export const UsersListButton: FC = () => {
  const users = [
    { id: 1, avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 4, avatar: "https://i.pravatar.cc/150?img=4" },
    { id: 5, avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 6, avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 7, avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 8, avatar: "https://i.pravatar.cc/150?img=4" },
    { id: 9, avatar: "https://i.pravatar.cc/150?img=5" },
  ];

  const truncatedUsers = users.length > 3 ? users.slice(0, 3) : users;

  return (
    <div className="flex relative">
      {truncatedUsers.map((user, index) => (
        <button key={user.id}>
          <img
            className={`absolute w-10 h-10 z-[10] top-0 rounded-full ${
              index !== 0 ? `ml-[${index * 20}px]` : ""
            } border-2 border-white`}
            src={user.avatar}
            alt={`User ${user.id}`}
          />
        </button>
      ))}
      {users.length > 3 && (
        <button className="flex items-center justify-center w-10 h-10 z-[11] ml-[60px] rounded-full bg-gray-300 border-2 border-white">
          <span className="font-medium text-xs">
            + {users.length - truncatedUsers.length}
          </span>
        </button>
      )}
    </div>
  );
};
