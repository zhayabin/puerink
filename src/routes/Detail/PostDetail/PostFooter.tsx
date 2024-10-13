import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"

type Props = {}

const Footer: React.FC<Props> = () => {
  const router = useRouter()
  return (
    <StyledWrapper>
      <a onClick={() => router.push("/")}> </a>
      <a onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      ▲ 回到顶部
      </a>
    </StyledWrapper>
  )
}

export default Footer

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray10};
  a {
    margin-top: 3rem; //评论区到文章的距离
    cursor: pointer;

    :hover {
      color: #20973A;
      text-decoration: underline; /* 添加下划线 */
      text-underline-offset: 3px; /* 设置下划线与文字的距离 */
    }
  }
`
