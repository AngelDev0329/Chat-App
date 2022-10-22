import styled from '@emotion/styled'

import { theme } from '../../../styles/theme'

export const Error = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: ${theme.LightGrey};
`
export const Text = styled.p`
  font-size: calc(18 / 16 * 1rem);
`

export const Users = styled.div`
  height: 280px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  padding: 0 15px 30px 15px;
`

export const Title = styled.h1`
  font-weight: 600;
  padding: 15px;
  text-align: center;
  margin-bottom: 15px;
  font-size: calc(20 / 16 * 1rem);
  border-bottom: 1px solid ${theme.Border};
`

export const User = styled.div`
  width: 350px;
  display: flex;
  padding: 10px 0;
  cursor: pointer;
  align-items: center;
`

export const Image = styled.img`
  width: 40px;
  margin: 0 10px 0 15px;
  border-radius: 50%;
`

export const Name = styled.p`
  font-size: 1rem;
  font-weight: 500;
`

export const Wrapper = styled.p`
  display: flex;
  padding: 15px;
  justify-content: end;
  border-top: 1px solid ${theme.Border};
`

export const Button = styled.button`
  border: none;
  font-weight: 500;
  padding: 8px 10px;
  font-size: 0.9rem;
  border-radius: 4px;
  background-color: ${theme.Border};
`
