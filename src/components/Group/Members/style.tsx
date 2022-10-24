import styled from '@emotion/styled'

import { theme } from '../../../styles/theme'

export const Container = styled.div`
  overflow-y: scroll;
  max-height: 300px;
`

export const Wrapper = styled.div`
  display: flex;
  padding: 15px 20px;
  position: relative;
  align-items: center;
  justify-content: space-between;
  :first-child {
    padding-top: 20px;
  }
  :not(:last-child) {
    border-bottom: 1px solid ${theme.Border};
  }
`

export const User = styled.div`
  display: flex;
  align-items: center;
`

export const Image = styled.img`
  width: 38px;
  margin-right: 10px;
  border-radius: 50%;
`

export const Name = styled.p`
  font-size: 0.92rem;
  font-weight: 500;
`

export const Menu = styled.div`
  right: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* width: 100px; */
`

export const Button = styled.button`
  border: none;
  padding: 3px 10px;
  border-radius: 4px;
  border: 1px solid #e2e8ef;
  background-color: ${theme.Border};
  display: flex;
  font-weight: 500;
  align-items: center;
  font-size: 0.75rem;
  transition: all 0.3s ease;
  :not(:last-child) {
    margin-bottom: 5px;
  }
  :hover {
    background-color: #cfd7e1;
  }
`
