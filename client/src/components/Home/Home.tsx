import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, [navigate])

  return (
    <div>
      <div>
        <h2>Main Table</h2>
      </div>
    </div>
  );
};
