import styled from '@emotion/styled'

import { theme } from '../../styles/theme'

export const SideBar = styled.div`
  width: 350px;
  border-right: 1px solid ${theme.Border};

  @media screen and (max-width: 768px) {
    width: 100%;
    border-right: none;
  }
`

export const Navbar = styled.div`
  display: flex;
  padding: 15px 30px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.Border};
`

export const Wrapper = styled.div`
  display: flex;
`

export const ProfileButton = styled.button`
  border: none;
  background-color: transparent;
`

export const ChatButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  display: flex;
  margin-right: 20px;
  border-radius: 50%;
  align-items: center;
  color: ${theme.Black};
  justify-content: center;
  background-color: ${theme.Border};
`

export const ProfilePicture = styled.img`
  width: 40px;
  border-radius: 50%;
`

export const SecondaryContainer = styled.div`
  position: relative;
`

export const PrimaryContainer = styled.div`
  position: relative;
`

export const ShowProfileButton = styled.button`
  display: block;
  width: 100%;
  color: ${theme.Black};
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 500;
  background-color: transparent;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${theme.Border};
  }
`

export const SignOutButton = styled.button`
  display: flex;
  align-items: center;
  color: #eb4e4e;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 500;
  background-color: transparent;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${theme.Border};
  }
`
