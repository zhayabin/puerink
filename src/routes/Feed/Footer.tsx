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
        Copyright © {from === y || !from ? y : `${from} - ${y}`}  {CONFIG.profile.name}. All rights reserved.
      </a>
    </StyledWrapper>
  )
}

export default Footer

const StyledWrapper = styled.div`
  a {
    margin-top: 0.1rem;
    font-size: 0.75rem;
    padding-left: 1.45rem;
    line-height: 1.25rem;
    letter-spacing: 0.005rem;  // 设置字母之间的间距
    color: ${({ theme }) => theme.colors.gray10};
    opacity: 0.5; /* 0.0 到 1.0 之间的值，0.0 为完全透明，1.0 为完全不透明 */
  }
`
