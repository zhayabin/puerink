import React from "react"
import PostHeader from "./PostHeader"
import PostFooter from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"
import Tag from "src/components/Tag"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import Footer from "src/routes/Feed/Footer"
import ThemeToggle from "src/routes/Feed/ThemeToggle"

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const data = usePostQuery()

  if (!data) return null

  const category = (data.category && data.category?.[0]) || undefined

  // 检查是否包含 '#评论' 标签
  const hasCommentTag = data.tags?.includes("#评论")

  return (
    <StyledWrapper>
      <article>
        {category && (
          <div css={{ marginBottom: "1.5rem" }}>
            <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
              {category}
            </Category>
          </div>
        )}
        {data.type[0] === "Post" && <PostHeader data={data} />}
        <div>
          <NotionRenderer recordMap={data.recordMap} />
        </div>
        <div className="mid">
          {data.tags && (
            <div className="tags">
              {data.tags.map((tag: string) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </div>

        <div className="date">
          {formatDate(
            data?.date?.start_date || data.createdTime,
            CONFIG.lang
          )}
        </div>

        {data.type[0] === "Post" && (
          <>
            <PostFooter />
            <div className="footer">
              <Footer />
              <ThemeToggle />
            </div>
            {/* 仅在包含 '#评论' 标签时渲染 CommentBox */}
            {hasCommentTag && <CommentBox data={data} />}
          </>
        )}
      </article>
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  padding-left: 0rem;
  padding-right: 0rem;
  padding-top: 0rem; // 整个阅读页面的上下左右
  padding-bottom: 3rem;
  background-color: ;
  margin: 0 auto;
  > article {
    margin: 0 auto;
    max-width: 45rem; // 显示内容宽度

    > .footer {
      display: grid;
      grid-column: span 12 / span 12;
      grid-template-columns: 6fr 1fr; // 调整左右的比例
      padding-bottom: 1rem;
      padding-top: 3rem;
      margin-top: auto;
    }

    > .mid {
      display: flex;
      margin-bottom: 0.3rem;
      margin-top: 2rem;
      align-items: center;
      .tags {
        display: flex;
        overflow-x: auto;
        flex-wrap: nowrap;
        gap: 0.5rem;
        max-width: 100%;
      }
    }

    > .date {
      font-size: 0.8rem;
      color: ${({ theme }) => theme.colors.gray9};
      @media (min-width: 768px) {
        margin-left: 0;
      }
    }
  }
`
