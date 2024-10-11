import styled from "@emotion/styled"
import React, { InputHTMLAttributes, ReactNode } from "react"
import { Emoji } from "src/components/Emoji"

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWrapper>
      <div className="top">
        <Emoji> </Emoji>
      </div>
      <input
        className="mid"
        type="text"
        placeholder="搜索关键词..."
        {...props}
      />
    </StyledWrapper>
  )
}

export default SearchInput

const StyledWrapper = styled.div`
  margin-top: 0;
  margin-bottom: 1rem;
  > .mid {
    padding-top: 0.55rem; // 顶部内边距
    padding-bottom: 0.5rem; // 底部内边距
    padding-left: 0.65rem; // 左侧内边距
    padding-right: 1.25rem; // 右侧内边距
    font-size: 0.875rem;
    border-radius: 0rem; // 搜索框圆角，调整此值以更改圆角大小
    width: 100%; // 宽度占满父元素; // 背景颜色
    border: 1px solid ${({ theme }) => theme.colors.gray5}; // 添加灰色描边
  }
`
