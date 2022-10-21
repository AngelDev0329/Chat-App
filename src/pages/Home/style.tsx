import styled from "@emotion/styled";
import { theme } from "../../styles/theme";

export const Wrapper = styled.div`
  display: flex;
`;

export const HomeWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  height: 100vh;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: ${theme.LightGrey};

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
