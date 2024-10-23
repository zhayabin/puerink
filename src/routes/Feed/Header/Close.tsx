import styled from "@emotion/styled";

type CloseProps = {
  onClick: () => void;
  symbol: "magnifying-glass" | "cross"; // 定义更具体的 symbol 类型
};

const Close: React.FC<CloseProps> = ({ onClick, symbol }) => {
  const renderIcon = (iconColor: string) => {
    if (symbol === "magnifying-glass") {
      return (
        <svg
          style={{ marginTop: '0.1px', transform: 'scale(0.9)', transformOrigin: 'center' }} // 向下移动 1rem
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          width="20"         // 可以直接设置宽度
          height="20"        // 可以直接设置高度
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
            clipRule="evenodd"
          />
        </svg>


      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          width="20"         // 可以直接设置宽度
          height="20"        // 可以直接设置高度
        >
          <path
            fillRule="evenodd"
            d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  };

  return (
    <StyledClose onClick={onClick}>
      {renderIcon("currentColor")} {/* 使用 currentColor 来继承父元素的颜色 */}
    </StyledClose>
  );
};

export default Close;

const StyledClose = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray12}; // 从主题获取颜色
  cursor: pointer;
  outline: none;
  padding: 0;
  margin-right: 0.2rem;

  &:hover {
    color: #20973a; /* 悬停时的颜色 */
  }
`;
