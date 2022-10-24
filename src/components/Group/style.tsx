import styled from '@emotion/styled'

import { theme } from '../../styles/theme'

export const Header = styled.div`
  display: flex;
  padding: 30px 0 25px;
  position: relative;
  align-items: center;
  justify-content: center;
`

export const Title = styled.h1`
  font-weight: 500;
  font-size: calc(24 / 16 * 1rem);
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
  width: 130px;
  padding: 8px 0;
  font-size: 1rem;
  border-left: none;
  border-right: none;
  transition: all 0.3s ease;
  justify-content: space-between;
  border-top: 1px solid ${theme.Border};
  border-bottom: 1px solid ${theme.Border};
`
