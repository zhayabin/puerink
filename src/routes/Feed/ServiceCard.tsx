import { CONFIG } from "site.config";
import React from "react";
import styled from "@emotion/styled";
import { Emoji } from "src/components/Emoji";

const ServiceCard: React.FC = () => {
  if (!CONFIG.projects || !Array.isArray(CONFIG.projects)) return null; // 确保 CONFIG.projects 是一个数组

  return (
    <>
      <StyledTitle>
      <Emoji> </Emoji>
      </StyledTitle>
      <StyledWrapper>
        {CONFIG.projects.map((project,idx) => (
          <a
            key={idx} // 使用 index 作为 key
            href={project.href}
            rel="noreferrer"
            target="_blank"
            className="project" // 添加 className
          >
            <div className="name">{project.name}</div>
          </a>
        ))}
      </StyledWrapper>
    </>
  );
};

export default ServiceCard;

const StyledTitle = styled.div`
  padding: 0.25rem;
  margin-bottom: 0.75rem;
  text-align: center; /* 标题居中 */
`;

const StyledWrapper = styled.div`
  max-width: 100px; /* 设置最大宽度 */
  margin: 0 auto; /* 居中对齐 */
  opacity: 0; /透明度0隐藏暂时

  .project {
    display: flex; /* 让项目行使用 flex */
    justify-content: center; /* 居中对齐内容 */
    align-items: center; /* 垂直居中对齐 */
    margin-bottom: 0.5rem; /* 增加项目之间的间距 */
    color: ${({ theme }) => theme.colors.gray11};
    cursor: pointer;
    text-decoration: none; /* 去掉默认的链接下划线 */

    :hover {
      color: #2997ff; /* 悬停时的文字颜色 */
    }

    .name {
      font-size: 0.875rem;
      line-height: 1.25rem;
      position: relative;

      ::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0.5px; /* 控制直线距离文字的距离 */
        height: 1px; /* 直线的高度 */
        background-color: #2997ff; /* 直线的颜色 */
        transform: scaleX(0); /* 初始隐藏 */
        transform-origin: left;
        transition: transform 0.1s ease; /* 动画效果 */
      }
    }

    :hover .name::after {
      transform: scaleX(1); /* 悬停时显示直线 */
    }
  }
`;
