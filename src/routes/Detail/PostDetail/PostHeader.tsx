import { CONFIG } from "site.config"
import Tag from "src/components/Tag"
import { TPost } from "src/types"
import { formatDate } from "src/libs/utils"
import Image from "next/image"
import React from "react"
import styled from "@emotion/styled"

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
            {data.author && data.author[0] && data.author[0].name && (
              <>
                <div className="author">

                  <div className="">作者：{data.author[0].name}</div>
                </div>

              </>
            )}

          </div>

          {data.thumbnail && (
            <div className="thumbnail">
              <Image
                src={data.thumbnail}
                css={{ objectFit: "cover" }}
                fill
                alt={data.title}
              />
            </div>
          )}
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
    font-weight: 700;
  }
  nav {
    margin-top: 0.5rem;
    color: ${({ theme }) => theme.colors.gray9};
    > .top {
      display: flex;
      margin-bottom: 0.75rem;
      gap: 0.75rem;
      align-items: center;
      .author {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        font-size: 0.875rem;
      }
    }

    .thumbnail {
      overflow: hidden;
      position: relative;
      margin-bottom: 0rem; //标题距离图片距离
      border-radius: 0.2rem; //图片圆角
      width: 100%;
      background-color: ${({ theme }) => theme.colors.gray4};
      padding-bottom: 33%; //调整进入帖子的图谱高度手机
      @media (min-width: 1024px) {
        padding-bottom: 33%; //调整进入帖子的图谱高度手机pc
      }
    }
  }
`
