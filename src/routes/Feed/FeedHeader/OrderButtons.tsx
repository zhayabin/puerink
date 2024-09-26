import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"

type TOrder = "asc" | "desc"

type Props = {}

const OrderButtons: React.FC<Props> = () => {
  const router = useRouter()

  const currentOrder = `${router.query.order || ``}` || ("desc" as TOrder)

  const handleClickOrderBy = (value: TOrder) => {
    router.push({
      query: {
        ...router.query,
        order: value,
      },
    })
  }
  return (
    <StyledWrapper>
      <a
        data-active={currentOrder === "desc"}
        onClick={() => handleClickOrderBy("desc")}
      >
        NEW
      </a>
      <a
        data-active={currentOrder === "asc"}
        onClick={() => handleClickOrderBy("asc")}
      >
        OLD
      </a>
    </StyledWrapper>
  )
}

export default OrderButtons

const StyledWrapper = styled.div`
  display: flex;
  justify-content: flex-end;  // 使内容靠右对齐
  padding: 0rem;
  padding-left: 0rem;
  padding-right: 0rem;
  margin-top: 0.88rem;
  margin-bottom: 0rem;
  gap: 1.3rem;
  font-size: 0.875rem;
  line-height: 0rem;
  a {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray10};

    &[data-active="true"] {
      font-weight: 700;

      color: ${({ theme }) => theme.colors.gray12};
    }
  }

  @media (min-width: 1024px) {
    justify-content: flex-end;  // 大于1024px时仍然右对齐
  }
`
