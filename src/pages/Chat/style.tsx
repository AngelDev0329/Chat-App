import styled from '@emotion/styled'

import { theme } from '../../styles/theme'

export const Wrapper = styled.div`
  display: flex;
`

export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
  align-items: stretch;
`

export const Error = styled.div`
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
`

export const Text = styled.p`
  font-size: calc(18 / 16 * 1rem);
`

export const Image = styled.img`
  width: 90px;
  margin-bottom: 20px;
`

export const Line = styled.div`
  border-bottom: 1px solid ${theme.Border};
  height: 80px;
`

export const Grow = styled.div`
  flex-grow: 1;
`
