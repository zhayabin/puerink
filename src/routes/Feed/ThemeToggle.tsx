import styled from "@emotion/styled"
import React from "react"
import useScheme from "src/hooks/useScheme"

type Props = {}

const ThemeToggle: React.FC<Props> = () => {
  const [scheme, setScheme] = useScheme()

  const handleClick = () => {
    setScheme(scheme === "light" ? "dark" : "light")
  }

  return (
    <StyledWrapper onClick={handleClick}>

      {scheme === "light" ? "☀" : "☀"} {/* 将文本移到这里 */}
    </StyledWrapper>
  )
}

export default ThemeToggle

const StyledWrapper = styled.div`
  cursor: pointer;
  font-size: 20px; /* 这里设置字体大小 */
  display: flex;
  justify-content: flex-end; /* 内容靠右 */
  align-items: center; /* 垂直居中对齐 */
`
