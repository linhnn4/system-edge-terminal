import styled from "styled-components";
import SideBar from "./SideBar";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  background: linear-gradient(180deg, #06090E 0%, #151F36 100%);
`;

const Container = ({ children }) => {
  return <Wrapper>
    <SideBar />
    <div className="container-content">{children}</div>
  </Wrapper>;
}

export default Container;