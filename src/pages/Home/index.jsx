import IconDashboard from "@/assets/svgs/dashboard.svg?react";
import { ContentWrapper } from "@/components/Container";
import useUser from "@/reducers/user";
import { ROUTERS } from "@/utils/routers";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

const Home = () => {
  const navigate = useNavigate();
  const info = useUser(useShallow((state) => state.user.info));
  return (
    <>
      <div className="page-title mb-2">Dashboard</div>
      <div className="page-sub-title mb-6">
        Welcome, {info?.username}. Your system is evolving.
      </div>
      <ContentWrapper>
        <IconDashboard />
        <div className="text-desc mb-2">
          Upload your first trades to generate and review the data analysis
        </div>
        <div
          className="text-link-a"
          onClick={() => navigate(ROUTERS.IMPORT_DATA)}
        >
          Go To Import
        </div>
      </ContentWrapper>
    </>
  );
};

export default Home;
