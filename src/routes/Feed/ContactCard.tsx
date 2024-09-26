import styled from "@emotion/styled"
import React from "react"
import {
  AiFillLinkedin,
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai"
import { CONFIG } from "site.config"
import { Emoji } from "src/components/Emoji"

const ContactCard: React.FC = () => {
  return (
    <>
      <StyledTitle>
        <Emoji> </Emoji>
      </StyledTitle>
      <StyledWrapper>
        {CONFIG.profile.github && (
          <a
            href={`zhayabin`}
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineGithub className="icon" />
            <div className="name"> • 微信 LinkeTea</div>
          </a>
        )}
        {CONFIG.profile.instagram && (
          <a
            href={`https://www.instagram.com/${CONFIG.profile.instagram}`}
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineInstagram className="icon" />
            <div className="name">instagram</div>
          </a>
        )}
        {CONFIG.profile.email && (
          <a
            href={`mailto:${CONFIG.profile.email}`}
            rel="noreferrer"
            target="_blank"
            css={{ overflow: "hidden" }}
          >
            <AiOutlineMail className="icon" />
            <div className="name"> • 邮箱 zhayabin@outlook.com</div>
          </a>
        )}
        {CONFIG.profile.linkedin && (
          <a
            href={`https://space.bilibili.com/24683954`}
            rel="noreferrer"
            target="_blank"
          >
            <AiFillLinkedin className="icon" />
            <div className="name"> • 哔哩哔哩 24683954</div>
          </a>
        )}
      </StyledWrapper>
    </>
  )
}

export default ContactCard

const StyledTitle = styled.div`
  padding: 0.25rem;
  margin-bottom: 0.75rem;
`
const StyledWrapper = styled.div`
  display: flex;
  padding: 0.25rem;
  flex-direction: column;
  border-radius: 0.3rem; //联系我圆角
  background-color: ;
  a {
    display: flex;
    padding: 0.5rem;
    gap: 0.75rem;
    align-items: center;
    border-radius: 2rem;
    color: ${({ theme }) => theme.colors.gray11};
    cursor: pointer;

    :hover {
      color: ${({ theme }) => theme.colors.gray12};
      background-color: ${({ theme }) => theme.colors.gray5};
    }
    .icon {
      font-size: 0rem;
      line-height: 0rem;
    }
    .name {
      font-size: 0.85rem;
      line-height: 1rem;
    }
  }
`
