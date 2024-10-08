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
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem; // 大屏幕时的下边距
  }

  > .top {
    padding: 0.25rem; // 顶部内边距
    margin-bottom: 0.75rem; // 底部外边距
  }

  > .mid {
    padding-top: 0.5rem; // 顶部内边距
    padding-bottom: 0.5rem; // 底部内边距
    padding-left: 1.25rem; // 左侧内边距
    padding-right: 1.25rem; // 右侧内边距
    border-radius: 2rem; // 搜索框圆角，调整此值以更改圆角大小
    outline-style: none; // 移除轮廓样式
    width: 100%; // 宽度占满父元素
    background-color: ${({ theme }) => theme.colors.gray4}; // 背景颜色
    border: 1px solid ${({ theme }) => theme.colors.gray6}; // 添加灰色描边
  }
`
