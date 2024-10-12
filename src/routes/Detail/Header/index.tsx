
import Contact from "./Contact";
import Logo from "./Logo";
import styled from "@emotion/styled";

type Props = {
  fullWidth: boolean;
  q: string; // 添加 q 属性
  setQ: React.Dispatch<React.SetStateAction<string>>; // 添加 setQ 属性
};

const Header: React.FC<Props> = ({ fullWidth, q, setQ }) => {
  return (
    <StyledWrapper>
      <div className="backdrop" /> {/* 添加背景虚化层 */}
      <div data-full-width={fullWidth} className="container">
        <div className="logo">
          <Logo />
        </div>
        <div className="search-contact">
          <div className="search-input">
          </div>
          <div className="contact">
            <Contact />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default Header;

const StyledWrapper = styled.div`
  position: relative; /* 使得后面的内容可以在这个元素上面 */
  top: 0;

  .backdrop {
    position: fixed; /* 固定定位，使其覆盖整个视口 */
    top: 0;
    left: 0;
    right: 0;
    height: 6rem; /* 限制背景的高度，与 Header 的高度相同 */
    background-color: rgba(255, 255, 255, 0); /* 半透明背景色 */
    backdrop-filter: blur(10px); /* 设置模糊效果 */
    z-index: -1; /* 确保背景在内容后面 */
  }

  .container {
    display: grid;
    grid-template-columns: repeat(12, 1fr); /* 创建 12 列网格 */
    align-items: center; /* 垂直居中对齐 */
    max-width: 1120px;
    height: 6rem;
    margin: 0 auto;

    .logo {
      grid-column: 1 / span 4; /* Logo 占 4 列，靠左对齐 */
      display: flex;
      justify-content: flex-start; /* Logo 靠左对齐 */
      align-items: center; /* 垂直居中 */
    }

    .search-contact {
      grid-column: 5 / span 8; /* SearchInput 和 Contact 占 8 列 */
      display: flex;
      justify-content: flex-end; /* 靠右对齐 */
      align-items: center; /* 垂直居中 */

      .search-input {
        flex: 1; /* SearchInput 占据剩余空间 */
        display: flex;
        justify-content: flex-end; /* SearchInput 靠右对齐 */
        align-items: center; /* 垂直居中 */
      }

      .contact {
        flex: 0 0 auto; /* Contact 不随容器缩放，保持自身宽度 */
        display: flex;
        justify-content: flex-end; /* Contact 靠右对齐 */
        align-items: center; /* 垂直居中 */
        margin-left: 1rem; /* 可选：添加间距 */
      }
    }

    &[data-full-width="true"] {
      @media (min-width: 768px) {
        padding-left: 6rem;
        padding-right: 6rem;
      }
    }
  }
`;
