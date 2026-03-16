import styled from "styled-components";
import SideBar from "./SideBar";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  background: linear-gradient(180deg, #06090e 0%, #151f36 100%);
  .container-content {
    display: flex;
    padding: 3rem 2rem;
    flex-direction: column;
    align-self: stretch;
    width: 100%;
    height: 100%;
    .page-title {
      color: var(--general-White, var(--color-white-solid, #fff));
      font-family: var(--font-family-Font-1, Inter);
      font-size: var(--font-size-24, 1.5rem);
      font-style: normal;
      font-weight: var(--font-weight-700, 700);
      line-height: var(--line-height-32, 2rem); /* 133.333% */
    }
    .page-sub-title {
      color: var(--general-Gull-Gray, var(--color-grey-400, #94a3b8));

      /* general/Regular */
      font-family: var(--font-family-Font-1, Inter);
      font-size: var(--font-size-14, 0.875rem);
      font-style: normal;
      font-weight: var(--font-weight-400, 400);
      line-height: var(--line-height-20, 1.25rem); /* 142.857% */
    }
  }
`;

const Container = ({ children }) => {
  return (
    <Wrapper>
      <SideBar />
      <div className="container-content">{children}</div>
    </Wrapper>
  );
};

export default Container;
