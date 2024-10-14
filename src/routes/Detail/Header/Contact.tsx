import styled from "@emotion/styled";
import React from "react";
import { CONFIG } from "site.config";
import { Emoji } from "src/components/Emoji";
import Link from "next/link"; // 引入 Link 组件

const ContactCard: React.FC = () => {
  return (
    <>
      <StyledTitle>
        <Emoji> </Emoji>
      </StyledTitle>
      <StyledWrapper>
        {CONFIG.profile.email && (
          <a
            href={`mailto:${CONFIG.profile.email}`}
            rel="noreferrer"
            target="_blank"
            css={{ overflow: "hidden" }}
          >
            <div className="name"></div>
          </a>
        )}
        {CONFIG.profile.linkedin && (
          <a
            href={`https://space.bilibili.com/24683954`}
            rel="noreferrer"
            target="_blank"
          >
            <div className="name">哔站</div>
          </a>
        )}
        {/* 添加“关于”链接 */}
        <Link href="/about">
          <div className="name">关于</div>
        </Link>
      </StyledWrapper>
    </>
  );
};

export default ContactCard;

const StyledTitle = styled.div`
  padding: 0.25rem;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.875rem;
  margin-bottom: 0rem;
  gap: 0.5rem; /* 调整标签之间的间距 */

  a, a:hover, a:active {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.gray11};
  }

  a:hover, a:active {
    color: #20973A; /* 悬停时的文字颜色 */
    text-decoration: underline; /* 添加下划线 */
    text-underline-offset: 3px; /* 设置下划线与文字的距离 */
  }

  .name {
    display: block;
    white-space: nowrap; /* 不允许换行 */
  }
`;
