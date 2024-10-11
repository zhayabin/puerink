import styled from "@emotion/styled";
import Link from "next/link";
import React, { useState } from "react";

const NavBar: React.FC = () => {
  const [hovered, setHovered] = useState(false); // 悬停状态

  const links = [{ id: 1, name: "关于", to: "/about" }];

  return (
    <StyledWrapper>
      <ul>
        {links.map((link) => (
          <li
            key={link.id}
            onMouseEnter={() => setHovered(true)} // 悬停时触发
            onMouseLeave={() => setHovered(false)} // 离开时触发
          >
            <Link href={link.to}>
              <span className={hovered ? "hovered" : ""}>
                {hovered ? "关于" : link.name}
              </span>
            </Link> {/* 根据状态切换显示内容 */}
          </li>
        ))}
      </ul>
    </StyledWrapper>
  );
};

export default NavBar;

const StyledWrapper = styled.div`
  flex-shrink: 0;
  font-size: 0.85rem; /* 设置字体大小 */

  ul {
    display: flex;
    flex-direction: row;

    li {
      display: block;
      margin-left: rem;
      margin-right: rem;
      color: ${({ theme }) => theme.colors.gray11};

      :hover {
        color: #2997ff; /* 悬停时的文字颜色 */
      }

      .hovered {
        text-decoration: underline; /* 悬停时为“你好”添加下划线 */
        text-underline-offset: 3px; /* 设置下划线与文字的距离 */
      }
    }
  }
`;
