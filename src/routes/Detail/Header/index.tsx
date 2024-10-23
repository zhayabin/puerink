import { useState } from "react";
import Contact from "./Contact";
import Logo from "./Logo";
import styled from "@emotion/styled";

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

    .contact {
      flex: 0 0 auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-left: 0rem;
    }
  }
`;
