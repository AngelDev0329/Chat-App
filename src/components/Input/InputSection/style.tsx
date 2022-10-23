import styled from '@emotion/styled'

import { theme } from '../../../styles/theme'

export const Container = styled.div`
  display: flex;
  margin-top: 10px;
  padding: 15px 20px;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${theme.Border};
`

export const Form = styled.form`
  gap: 1;
  flex-grow: 1;
  display: flex;
  align-items: stretch;
`

export const ImageButton = styled.button`
  border: none;
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  background: transparent;
  color: ${theme.DarkGrey};
`

export const FileButton = styled.button`
  border: none;
  display: flex;
  padding: 0 15px;
  font-size: 1.3rem;
  align-items: center;
  background: transparent;
  color: ${theme.DarkGrey};
`

export const InputWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  position: relative;
  align-items: center;
`

export const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 5px 15px;
  border-radius: 30px;
  background-color: ${theme.Border};

  ::placeholder {
    color: ${theme.DarkGrey};
  }
`

export const SendButton = styled.button`
  border: none;
  display: flex;
  font-size: 1.6rem;
  padding-left: 10px;
  align-items: center;
  background: transparent;
  color: ${theme.DarkGrey};
`

export const DragFile = styled.div`
  z-index: 20;
  width: 100vh;
  display: flex;
  height: 100vh;
  position: fixed;
  user-select: none;
  align-items: center;
  pointer-events: none;
  justify-content: center;
  transition: all 0.3s ease;

  background-color: #3333331b;
`

export const Title = styled.div`
  z-index: 30;
  color: ${theme.Black};
  font-size: calc(30 / 16 * 1rem);
`