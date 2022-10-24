import styled from '@emotion/styled'

import { theme } from '../../styles/theme'

export const Header = styled.div`
  display: flex;
  padding: 20px 0;
  position: relative;
  align-items: center;
  justify-content: center;
`

export const Title = styled.h1`
  font-weight: 500;
  font-size: calc(22 / 16 * 1rem);
`

export const CloseButton = styled.button`
  top: 10px;
  right: 10px;
  border: none;
  font-size: 0.9rem;
  position: absolute;
  background-color: transparent;
`

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Button = styled.button`
  width: 150px;
  padding: 5px;
  font-size: 1rem;
  font-weight: 500;
  border-left: none;
  border-right: none;
  color: ${theme.DarkGrey};
  transition: all 0.3s ease;
  justify-content: space-between;
  border-top: 1px solid ${theme.Border};
  border-bottom: 1px solid ${theme.Border};
`
