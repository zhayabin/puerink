import styled from "@emotion/styled";
import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWrapper>
      <input
        className="mid"
        type="text"
        placeholder="搜索..."
        {...props}
      />
      <div className="underline" /> {/* 如果需要，可以考虑动态应用类名 */}
    </StyledWrapper>
  );
};

export default SearchInput;

const StyledWrapper = styled.div`
  margin-top: 0rem;
  margin-bottom: 0rem;
  position: relative;

  > .mid {
    font-size: 16px;
    border: none;
    background-color: transparent;
    box-shadow: none;
    width: 7rem;
    outline: none;
    color: ${({ theme }) => theme.colors.gray12};
    @media (min-width: 540px) {
      width: 12rem;
    }
  }
`;
