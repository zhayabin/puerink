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
    font-size: 16px;
    border: none;
    background-color: transparent;
    box-shadow: none;
    width: 6rem;
    outline: none;
    color: ${({ theme }) => theme.colors.gray11};
    @media (min-width: 540px) {
     width: 8rem;
    }
  }
`;
