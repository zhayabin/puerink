import styled from "@emotion/styled";
import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWrapper>
      <input
        className="mid"
        type="text"
        placeholder=" 搜索关键词/#标签..."
        {...props}
      />
      <div className="underline" />
    </StyledWrapper>
  );
};

export default SearchInput;

const StyledWrapper = styled.div`
  margin-top: 0rem;
  margin-bottom: 0rem;
  position: relative; // 确保下划线的绝对定位相对于父容器

  > .mid {
    padding: 0.2rem 0; // 添加适当的内边距以使输入框高度更好
    font-size: 0.875rem; // 设置字体大小
    padding-left: 0rem;
    padding-right: 0.35rem;
    line-height: 1.5; // 设置行高以确保文字垂直居中
    border: none; // 去除边框
    background-color: transparent; // 背景颜色设置为透明
    width: 100%; // 宽度占满父元素
    box-shadow: none; // 去除阴影
    outline: none; // 去除聚焦时的轮廓
    touch-action: manipulation; /* 禁用缩放 */

    // 下面是确保占位符文本样式的控制
    &::placeholder {
      color: ${({ theme }) => theme.colors.gray9}; // 设置占位符的颜色
      opacity: 1; // 确保占位符不透明
      line-height: 1.5; // 确保占位符的行高一致
    }
  }

  .underline {
    position: absolute; // 绝对定位线
    bottom: 0; // 线的位置相对于输入框的底部
    height: 1.5px; // 线的高度
    background-color: ${({ theme }) => theme.colors.gray9}; // 线的颜色
    width: 100%; // 线的宽度与输入框一致
  }
`;
