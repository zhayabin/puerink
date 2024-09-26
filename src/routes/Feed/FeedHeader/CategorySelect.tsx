import { useRouter } from "next/router";
import React, { useRef } from "react";
import styled from "@emotion/styled";
import { useCategoriesQuery } from "src/hooks/useCategoriesQuery";

// 默认类别
export const DEFAULT_CATEGORY = "all";

type Props = {};

const CategorySelect: React.FC<Props> = () => {
  const router = useRouter();
  const data = useCategoriesQuery();

  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY;

  const handleOptionClick = (category: string) => {
    router.push({
      query: {
        ...router.query,
        category,
      },
    });
  };

  // 引入ref来获取content元素
  const contentRef = useRef<HTMLDivElement>(null);

  // 拖拽的初始值
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown = true;
    contentRef.current!.classList.add("active");
    startX = e.pageX - contentRef.current!.offsetLeft;
    scrollLeft = contentRef.current!.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isDown = false;
    contentRef.current!.classList.remove("active");
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - contentRef.current!.offsetLeft;
    const walk = (x - startX) * 2; // 调整移动速度
    contentRef.current!.scrollLeft = scrollLeft - walk;
  };

  return (
    <StyledWrapper>
      <div
        className="content"
        ref={contentRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
      >
        {Object.keys(data).map((key, idx) => (
          <div
            className={`item ${currentCategory === key ? "active" : ""}`}
            key={idx}
            onClick={() => handleOptionClick(key)}
          >
            {`${key} (${data[key]})`}
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
};

export default CategorySelect;

const StyledWrapper = styled.div`
  position: relative;
  overflow: hidden;

  .content {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.3rem;
    padding: 0rem;
    padding-left: 0.5rem;
    padding-right: 0rem;
    margin-top: 0rem;
    margin-bottom: 1rem;
    background-color: ${({ theme }) => theme.colors.gray2};
    color: ${({ theme }) => theme.colors.gray10};
    overflow-x: auto;

    /* 隐藏滚动条 */
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    /* 拖拽样式 */
    cursor: grab;
    &.active {
      cursor: grabbing;
    }

    /* 渐变效果 */
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      width: 20px;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    &::before {
      left: 0;
      background: linear-gradient(
        to right,
        ${({ theme }) => theme.colors.gray2} 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    &::after {
      right: 0;
      background: linear-gradient(
        to left,
        ${({ theme }) => theme.colors.gray2} 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    > .item {
      padding: 0.25rem 0.5rem;
      border-radius: 0.1rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      white-space: nowrap;
      cursor: pointer;

      :hover {
        background-color: ;
      }

      &.active {
        font-weight: 700;
        color: ${({ theme }) => theme.colors.gray12};
      }
    }
  }
`;
