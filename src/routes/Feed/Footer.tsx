import { CONFIG } from "site.config"
import React from "react"
import styled from "@emotion/styled"

const d = new Date()
const y = d.getFullYear()
const from = +CONFIG.since

type Props = {
  className?: string
}

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <StyledWrapper className={className}>
      <a
        href={`https://github.com/${CONFIG.profile.github}`}
        target="_blank"
        rel="noreferrer"
      >
        ©2021-{from === y || !from ? y : `${from} - ${y}`}{CONFIG.profile.name}. 版权所有
      </a>
    </StyledWrapper>
  )
}

export default Footer

const StyledWrapper = styled.div`
  a {
    font-size: 12px;
    line-height: 0rem;
    color: ${({ theme }) => theme.colors.gray10};
    opacity: 1; /* 0.0 到 1.0 之间的值，0.0 为完全透明，1.0 为完全不透明 */
  }
`
