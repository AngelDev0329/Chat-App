import styled from "@emotion/styled";
import { theme } from "../../styles/theme";

export const Text = styled.p`
  font-size: calc(18 / 16 * 1rem);
`;

export const Image = styled.img`
  width: 90px;
  margin-bottom: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const HomeWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  height: 100vh;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: ${theme.LightGrey};

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
