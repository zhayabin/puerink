import styled from "@emotion/styled";
import React, { InputHTMLAttributes, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: React.FC<Props> = ({ ...props }) => {
  const [isFocused, setIsFocused] = useState(false); // 管理输入框聚焦状态

  return (
    <StyledWrapper isFocused={isFocused}>
      <input
        className="mid"
        type="text"
        placeholder="搜索..."
        onFocus={() => setIsFocused(true)} // 当输入框被聚焦时
        onBlur={() => setIsFocused(false)} // 当输入框失去聚焦时
        {...props}
      />
      <div className={`underline ${isFocused ? 'active' : ''}`} /> {/* 动态应用类名 */}
    </StyledWrapper>
  );
};

export default SearchInput;

const StyledWrapper = styled.div<{ isFocused: boolean }>`
  margin-top: 0rem;
  margin-bottom: 0rem;
  position: relative;

  > .mid {
    padding: 0.2rem 0;
    font-size: 1rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    line-height: 1.5;
    border: none;
    background-color: transparent;
    width: 100%;
    box-shadow: none;
    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray9};
      opacity: 1;
      line-height: 1.5;
    }
  }

  .underline {
    position: absolute;
    bottom: 0;
    height: 1.5px;
    background-color: ${({ theme }) => theme.colors.gray9}; // 默认颜色
    width: 100%;
    transition: background-color 0.3s; // 添加过渡效果
  }

  // 鼠标悬停时的效果
  &:hover .underline {
    background-color: #20973A; // 悬停时的颜色
  }

  // 点击后保持颜色
  ${({ isFocused }) => isFocused && `
    .underline {
      background-color: #20973A; // 点击后保持的颜色
    }
  `}
`;
