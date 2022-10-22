import styled from '@emotion/styled'

import { theme } from '../../../styles/theme'

export const Container = styled.div`
  margin-top: 10px;
  padding: 15px 20px;
  display: flex;
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

export const EmojiButton = styled.button`
  top: 5px;
  right: 10px;
  border: none;
  font-size: 1.3rem;
  position: absolute;
  color: ${theme.DarkGrey};
  background-color: transparent;
`

export const SendButton = styled.button`
  border: none;
  display: flex;
  padding-left: 10px;
  font-size: 1.6rem;
  align-items: center;
  background: transparent;
  color: ${theme.DarkGrey};
`
