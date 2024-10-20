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

    // 如果标签是“#留言”，则返回 null，不渲染任何内容
  if (children === "#留言") {
    return null;
  }

  return (
    <StyledWrapper onClick={() => handleClick(children)}>
      {children}
    </StyledWrapper>
  )
}

export default Tag

const StyledWrapper = styled.div`
  white-space: nowrap; // 禁止换行
  font-size: 10px; // 字体大小
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray12};
  background-color: ;
  cursor: pointer;
  overflow: hidden; /* 隐藏页面滚动 */
  margin-right: 0.5rem;
  margin-top: 0.1rem;
  }
`
