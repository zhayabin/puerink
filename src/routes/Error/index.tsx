import styled from "@emotion/styled";
import React from "react";

type Props = {};

const CustomError: React.FC<Props> = () => {
  const handleRedirect = () => {
    window.location.href = 'https://puer.ink'; // 跳转到首页
  };

  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="top">
          <div>4</div>
          <div>0</div>
          <div>4</div>
        </div>
        <div className="text" onClick={handleRedirect}>
          找不到文章，点此返回首页。
        </div>
      </div>
    </StyledWrapper>
  );
};

export default CustomError;

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 3rem 1.5rem;
  border-radius: 1.5rem;
  max-width: 56rem;

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .top {
    display: flex;
    align-items: center;
    font-size: 3.75rem;
    line-height: 1;
  }

  .text {
    font-size: 1.875rem;
    color: ${({ theme }) => theme.colors.gray11};
    cursor: pointer; // 显示为手形光标
    &:hover {
      text-decoration: underline; // 添加下划线
      color: #2997ff; // 更改字体颜色
    }
  }
`;
