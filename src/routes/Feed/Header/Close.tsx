import styled from "@emotion/styled";

type CloseProps = {
  onClick: () => void;
  symbol: string; // 用于显示 "+" 或 "x"
};

const Close: React.FC<CloseProps> = ({ onClick, symbol }) => {
  return (
    <StyledClose onClick={onClick}>
      {symbol} {/* 动态显示 "+" 或 "x" */}
    </StyledClose>
  );
};

export default Close;

const StyledClose = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray9};
  font-size: 1.1rem;
  cursor: pointer;
  outline: none;
  padding: 0;
  margin-left: 0rem;

  &:hover {
    color: #20973a; /* 悬停时的颜色 */
  }
`;
