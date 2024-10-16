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
        <div className="search-contact">
          <div className="search-input">
            <SearchInput value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          {/* 根据 q 的值显示不同的按钮 */}
          <Close onClick={() => setQ("")} symbol={q.length === 0 ? "☺" : "☓"} />
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
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    align-items: center;
    max-width: 1120px;
    height: 6rem;
    margin: 0 auto;

    .logo {
      grid-column: 1 / span 4;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .search-contact {
      grid-column: 6 / span 8;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .search-input {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 0.5rem;
      }

      .contact {
        flex: 0 0 auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-left: 1rem;
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
