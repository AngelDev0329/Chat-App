import styled from "@emotion/styled";
import { theme } from "../../../styles/theme";

export const Container = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  padding: 15px;
`;
export const Title = styled.h1`
  padding: 15px 0;
  font-size: 1.3em;
  font-weight: 500;
  text-align: center;
  color: ${theme.Black};
  border-bottom: 1px solid ${theme.Border};
`;

export const CloseButton = styled.button`
  top: 6px;
  right: 8px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  position: absolute;
  background-color: transparent;
`;

export const Image = styled.img`
  border-radius: 50%;
`;

export const Thick = styled.span`
  font-weight: 600;
  padding-right: 5px;
`;

export const Text = styled.p`
  font-size: 1rem;
  line-height: 2;
`;

export const Info = styled.p`
  margin: 0 auto;
  padding-bottom: 20px;
  text-align: center;
  color: ${theme.LightGrey};
  font-size: 0.9rem;
  width: 500px;
`;
