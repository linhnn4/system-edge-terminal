import Lottie from "lottie-react";
import styled from "styled-components";

import loadingAnimation from "./loading.json";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background-color: #151f365e;
`;
const LoadingIndicator = () => (
  <Wrapper>
    <Lottie
      animationData={loadingAnimation}
      loop={true}
      style={{ width: 300, margin: "auto", padding: "20px" }}
    />
  </Wrapper>
);

export default LoadingIndicator;
