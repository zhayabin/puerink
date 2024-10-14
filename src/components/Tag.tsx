import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"

type Props = {
  children: string
}

const Tag: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const handleClick = (value: string) => {
    router.push(`/?tag=${value}`)
  }
  return (
    <StyledWrapper onClick={() => handleClick(children)}>
      {children}
    </StyledWrapper>
  )
}

export default Tag

const StyledWrapper = styled.div`
  padding-top: 0rem;
  padding-bottom: 0rem;
  padding-left: 0rem;
  padding-right: 0rem;
  border-radius: 0px;
  font-size: 0.875rem;
  line-height: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray9};
  background-color: ;
  cursor: pointer;
  overflow: hidden; /* 隐藏页面滚动 */
  }
`
