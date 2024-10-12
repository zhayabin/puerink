import useMermaidEffect from "./hooks/useMermaidEffect"
import PostDetail from "./PostDetail"
import PageDetail from "./PageDetail"
import styled from "@emotion/styled"
import usePostQuery from "src/hooks/usePostQuery"
import Header from "./Header"
import { useState } from "react"

type Props = {}

const Detail: React.FC<Props> = () => {
  const data = usePostQuery()
  const [q, setQ] = useState("")
  useMermaidEffect()

  if (!data) return null
  return (

    <StyledWrapper data-type={data.type}>
      <div className="guding">
       <Header fullWidth={false} q={q} setQ={setQ}/>
      </div>
      {data.type[0] === "Page" && <PageDetail />}
      {data.type[0] !== "Page" && <PostDetail />}
    </StyledWrapper>
  )
}

export default Detail

const StyledWrapper = styled.div`
  padding: 0rem 0;

  > .guding {
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
