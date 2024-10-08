import NavBar from "./NavBar"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"
import styled from "@emotion/styled"
import { zIndexes } from "src/styles/zIndexes"

type Props = {
  fullWidth: boolean
}

const Header: React.FC<Props> = ({ fullWidth }) => {
  return (
    <StyledWrapper>
      <div data-full-width={fullWidth} className="container">
        <Logo />
        <div className="nav">
          <ThemeToggle />
          <NavBar />
        </div>
      </div>
    </StyledWrapper>
  )
}

export default Header

const StyledWrapper = styled.div`
  z-index: ${zIndexes.header}; // 设置 z-index，用于控制层叠顺序
  position: sticky; // 设置为粘性定位，保持在视口顶部
  top: 0; // 粘性元素距离顶部的距离
  background-color: ${({ theme }) => theme.colors.gray2}; // 背景颜色，使用主题中的 gray2
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0); // 设置阴影效果
  opacity: 0.95; // 整个元素的透明度为 50%

  .container {
    display: flex; // 使用 Flexbox 布局
    padding-left: 1.2rem; // 左侧内边距
    padding-right: 1rem; // 右侧内边距
    justify-content: space-between; // 子元素间隔均匀分布
    align-items: center; // 子元素垂直居中对齐
    width: 100%; // 容器宽度占满父元素
    max-width: 1120px; // 最大宽度限制
    height: 3rem; // 容器高度
    margin: 0 auto; // 自动左右外边距使容器居中

    &[data-full-width="true"] { // 根据 data 属性调整样式
      @media (min-width: 768px) { // 大屏幕样式
        padding-left: 6rem; // 左侧内边距
        padding-right: 6rem; // 右侧内边距
      }
    }

    .nav {
      display: flex; // 使用 Flexbox 布局
      gap: 0.75rem; // 子元素之间的间距
      align-items: center; // 子元素垂直居中对齐
    }
  }
    &::after {
    content: ''; // 创建伪元素
    display: block; // 使其为块级元素
    height: 1px; // 设置高度
    background-color: ${({ theme }) => theme.colors.gray7}; // 设置背景颜色
    margin-top: 0rem; // 上外边距，调整位置
  }
`

