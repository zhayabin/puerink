import Link from "next/link"
import Image from "next/image"
import { CONFIG } from "site.config"
import styled from "@emotion/styled"

const Logo = () => {
  return (
    <StyledWrapper href="/" aria-label={CONFIG.blog.title}>
      <Image
        src="/favicon2.png" // 替换为你的logo路径
        alt="logo"
        width={31} // 可以根据需要调整宽高
        height={31}
      />
      <span>{CONFIG.blog.title}</span>
    </StyledWrapper>
  )
}

export default Logo

const StyledWrapper = styled(Link)`
  font-size: 2rem; /* 调整 Logo 的字体大小 */
  font-weight: 600; /* 设置字体粗细 */
  color: inherit; /* 继承父元素的颜色 */
  display: flex; /* 使用 flex 布局，让 logo 和文字水平排列 */
  align-items: center; /* 使图像和文字垂直居中 */
  padding: 0rem rem; /* 给 Logo 添加内边距 */
  height: auto; /* 保持宽高比 */
  white-space: nowrap; /* 不允许换行 */
  gap: 0.5rem; /* 图像和文字之间的间距 */
  img {
    margin-top: 0.2rem; /* 根据需要微调 */
  }
`;
