import Link from "next/link"
import { CONFIG } from "site.config"
import styled from "@emotion/styled"

const Logo = () => {
  return (
    <StyledWrapper href="/" aria-label={CONFIG.blog.title}>
      {CONFIG.blog.title}
    </StyledWrapper>
  )
}

export default Logo

const StyledWrapper = styled(Link)`
  font-size: 2rem; /* 调整 Logo 的字体大小 */
  font-weight: 600; /* 设置字体粗细 */
  text-decoration: none; /* 移除下划线 */
  color: inherit; /* 继承父元素的颜色 */
  display: inline-block; /* 保持它是一个行内块元素 */
  padding: 0rem 0rem; /* 给 Logo 添加内边距 */
  height: auto; /* 保持宽高比 */
  white-space: nowrap; /* 不允许换行 */
`;
