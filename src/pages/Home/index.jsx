import IconDashboard from "@/assets/svgs/dashboard.svg?react";
import Containner from "@/components/Container";
import useUser from "@/reducers/user";
import { ROUTERS } from "@/utils/routers";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useShallow } from "zustand/react/shallow";

const Wrapper = styled.div`
  display: flex;
  height: 18.75rem;
  padding: 1.75rem 0;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 0.75rem;
  background: var(--color-grey-80050, rgba(30, 41, 59, 0.5));
  backdrop-filter: blur(12px);
  flex-direction: column;
  justify-content: center;
`;

const Home = () => {
  const navigate = useNavigate();
  const info = useUser(useShallow((state) => state.user.info));
  return (
    <Containner>
      <div className="page-title mb-2">Dashboard</div>
      <div className="page-sub-title mb-6">
        Welcome, {info?.username}. Your system is evolving.
      </div>
      <Wrapper>
        <IconDashboard />
        <div className="text-desc mb-2">
          Upload your first trades to generate and review the data analysis
        </div>
        <div
          className="text-link"
          onClick={() => navigate(ROUTERS.IMPORT_DATA)}
        >
          Go To Import
        </div>
      </Wrapper>
    </Containner>
  );
};

export default Home;
