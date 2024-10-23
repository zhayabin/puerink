import { useState } from "react";
import Contact from "./Contact";
import Logo from "./Logo";
import styled from "@emotion/styled";
import SearchInput from "./SearchInput";
import Close from "./Close"; // 导入 Close 组件

type Props = {
  fullWidth: boolean;
  q: string;
  setQ: React.Dispatch<React.SetStateAction<string>>;
};

const Header: React.FC<Props> = ({ fullWidth, q, setQ }) => {
  return (
    <StyledWrapper>
      <div className="backdrop" /> {/* 添加背景虚化层 */}
      <div data-full-width={fullWidth} className="container">
        <div className="logo">
          <Logo />
        </div>

        <div className="search" >
          <div className="close" style={{ height: '20px'}}>
            <Close onClick={() => setQ("")} symbol={q.length === 0 ? "magnifying-glass" : "cross"} />
          </div>
          <div className="search-input" >
            <SearchInput value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>

        <div className="contact">
          <Contact />
        </div>

      </div>
    </StyledWrapper>
  );
};

export default Header;

const StyledWrapper = styled.div`
  position: relative; /* 使得后面的内容可以在这个元素上面 */
  display: flex; /* 使用flex布局 */
  flex-direction: column; /* 垂直方向 */
  justify-content: center; /* 垂直居中 */
  height: 6rem; /* 确保父容器有高度 */

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 6rem;
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(20px);
    z-index: -1;
  }

  .container {
    display: flex; /* 使用flex布局 */
    align-items: center; /* 垂直居中 */
    justify-content: space-between; /* 标签和日期之间的间距 */

    .logo {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-grow: 1;
    }

    .search {
      display: flex;
      justify-content: flex-end;
      .close {
        margin-top: auto; /* 推到底部 */
      }
      .search-input {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }

    .contact {
      flex: 0 0 auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-left: 0rem;
    }
  }
`;
