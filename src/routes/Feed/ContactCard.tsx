import styled from "@emotion/styled"
import React from "react"
import { CONFIG } from "site.config"
import { Emoji } from "src/components/Emoji"

const ContactCard: React.FC = () => {
  return (
    <>
      <StyledTitle>
        <Emoji> </Emoji>
      </StyledTitle>
      <StyledWrapper>
        {CONFIG.profile.email && (
          <a
            href={`mailto:${CONFIG.profile.email}`}
            rel="noreferrer"
            target="_blank"
            css={{ overflow: "hidden" }}
          >
            <div className="name"> 邮箱</div>
          </a>
        )}
        {CONFIG.profile.linkedin && (
          <a
            href={`https://space.bilibili.com/24683954`}
            rel="noreferrer"
            target="_blank"
          >
            <div className="name"> 哔哩哔哩</div>
          </a>
        )}
      </StyledWrapper>
    </>
  )
}

export default ContactCard

const StyledTitle = styled.div`
  padding: 0.25rem;

`
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  margin-bottom: 2.5rem;
  gap: 0.5rem; /* 调整标签之间的间距 */
`
