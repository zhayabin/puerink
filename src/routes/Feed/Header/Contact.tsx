import styled from "@emotion/styled";
import React from "react";
import { CONFIG } from "site.config";
import { Emoji } from "src/components/Emoji";
import Link from "next/link"; // 引入 Link 组件

const ContactCard: React.FC = () => {
  return (
    <>

      <StyledWrapper>

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
          <div className="name">留言</div>
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
  font-size: 14px;
  margin-bottom: 0rem;
  gap: 0.5rem; /* 调整标签之间的间距 */

  a, a:hover, a:active {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.gray12};
  }

  a:hover, a:active {
    color: #20973A; /* 悬停时的文字颜色 */
    font-weight: 600;
  }

  .name {
    display: block;
    white-space: nowrap; /* 不允许换行 */
  }
`;
