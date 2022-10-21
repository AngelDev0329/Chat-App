import styled from "@emotion/styled";
import { theme } from "../../styles/theme";

export const SideBar = styled.div`
  width: 350px;
  border-right: 1px solid ${theme.Border};

  @media screen and (max-width: 768px) {
    width: 100%;
    border-right: none;
  }
`;

export const Navbar = styled.div`
  display: flex;
  padding: 15px 30px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.Border};
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const ProfileButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

export const ChatButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  display: flex;
  cursor: pointer;
  margin-right: 20px;
  border-radius: 50%;
  align-items: center;
  color: ${theme.Black};
  justify-content: center;
  background-color: ${theme.Border};
`;

export const ProfilePicture = styled.img`
  width: 40px;
  border-radius: 50%;
`;

export const SecondaryContainer = styled.div`
  position: relative;
`;
