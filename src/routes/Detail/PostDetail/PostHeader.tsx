import { TPost } from "src/types"
import React from "react"
import styled from "@emotion/styled"
import { CONFIG } from "site.config" // 导入配置文件中的配置
import { formatDate } from "src/libs/utils"
import Image from 'next/image';

type Props = {
  data: TPost
}

const PostHeader: React.FC<Props> = ({ data }) => {
  return (
    <StyledWrapper>
      <h1 className="title">{data.title}</h1>
      {data.type[0] !== "Paper" && (
        <nav>
          <div className="top">
            {data.author && data.author[0] && data.author[0].name ? (
              <div className="author">
                <Image
                  css={{ borderRadius: "10" }}
                  src={data.author[0].profile_photo || CONFIG.profile.image}
                  alt="profile_photo"
                  width={20}
                  height={20}
                />
                <div className="">{data.author[0].name}</div>
              </div>
            ) : (
              data.logo && (
                <div className="author">
                  <Image
                    css={{ borderRadius: "10%" }}
                    src={data.logo}
                    alt="logo"
                    width={20}
                    height={20}
                  />
                  <div className="">{data.name}</div>
                </div>
              )
            )}

            <div className="date">
              <div className="content">
                {formatDate( // 格式化日期并显示
                  data?.date?.start_date || data.createdTime,
                  CONFIG.lang
                )}
              </div>
            </div>

            <div className="time">
              <p>{data.time}</p> {/* 显示时间 */}
            </div>

          </div>
        </nav>
      )}
    </StyledWrapper>
  )
}

export default PostHeader

const StyledWrapper = styled.div`
  .title {
    font-size: 1.5rem; //标题字体大小
    line-height: 2.45rem;
  }
  nav {
    margin-top: 0.5rem;
    > .top {
      display: flex;
      margin-bottom: 1rem;
      gap: 0.5rem;
      justify-content: space-between;
      margin-top: auto;
      align-items: center;
      color: ${({ theme }) => theme.colors.gray11};
      font-size: 12px; // 字体大小

      .author {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        flex-grow: 1;
      }

      .date,
      .time {
        display: flex;
        p {
          margin: 0;
        }
      }
    }
  }
`
