import React from "react";
import CategorySelect from "./CategorySelect";
import OrderButtons from "./OrderButtons";
import styled from "@emotion/styled";

type Props = {};

const FeedHeader: React.FC<Props> = () => {
  return (
    <StyledWrapper>
      <CategorySelectWrapper>
        <CategorySelect />
      </CategorySelectWrapper>
      <OrderButtonsWrapper>
        <OrderButtons />
      </OrderButtonsWrapper>
    </StyledWrapper>
  );
};

export default FeedHeader;

const StyledWrapper = styled.div`
  display: grid;
  grid-column: span 12 / span 12;
  grid-template-columns: 4fr 1fr; // 左右比例4:1
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};

  @media (min-width: 1024px) {
    display: flex; // 大于1024px时改为flex布局
  }
`;

const CategorySelectWrapper = styled.div`
  overflow: hidden; // 隐藏超出部分
  white-space: nowrap; // 防止换行

  /* 禁止选中和复制 */
  user-select: none; // 禁止选择文本
`;

const OrderButtonsWrapper = styled.div`
  padding: 0; // 设置内边距
  @media (min-width: 1024px) {
    margin-left: auto;  // 大于1024px时自动靠右
  }
`;
