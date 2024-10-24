import useMermaidEffect from "./hooks/useMermaidEffect"
import PostDetail from "./PostDetail"
import PageDetail from "./PageDetail"
import styled from "@emotion/styled"
import usePostQuery from "src/hooks/usePostQuery"
import Header from "src/routes/Feed/Header"
import { useState } from "react"

type Props = {}

const Detail: React.FC<Props> = () => {
  const data = usePostQuery()
  const [q, setQ] = useState("")
  useMermaidEffect()

  if (!data) return null
  return (

    <StyledWrapper data-type={data.type}>
      <div className="header">
       <Header fullWidth={false} />
      </div>
      {data.type[0] === "Page" && <PageDetail />}
      {data.type[0] !== "Page" && <PostDetail />}
    </StyledWrapper>
  )
}

export default Detail

const StyledWrapper = styled.div`
  padding: 0rem 0;
  padding-bottom: 0rem;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (max-width: 540px) {
    padding-left: 0rem;
    padding-right: 0rem;
  }

  > .header {
    position: sticky;
    top: 0; // 顶部对齐
    left: 0;
    right: 0;
    z-index: 10; // 确保在最上层
    display: grid;
    grid-column: span 12;
  }

  &[data-type="Paper"] {
    padding: 40px 0;
  }
  /** Reference: https://github.com/chriskempson/tomorrow-theme **/
  code[class*="language-mermaid"],
  pre[class*="language-mermaid"] {
    background-color: ${({ theme }) => theme.colors.gray5};
  }
`
