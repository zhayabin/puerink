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
import Image from "next/image"

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const data = usePostQuery()

  if (!data) return null

  const category = (data.category && data.category?.[0]) || undefined

  // 检查是否包含 '#留言' 标签
  const hasCommentTag = data.tags?.includes("#留言")

  return (
    <StyledWrapper>
      {category && (
          <div css={{ marginBottom: "1.5rem" }}>
            <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
              {category}
            </Category>
          </div>
        )}
      {data.type[0] === "Post" && <PostHeader data={data} />}

      <article>
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
        <div>
          <NotionRenderer recordMap={data.recordMap} />
        </div>
        <div className="tags">
          {data.tags?.map((tag: string, idx: number) => (
          <Tag key={idx}>{tag}</Tag>
          ))}
        </div>


      </article>
      <PostFooter />
      {data.type[0] === "Post" && (
        <>
          {/* 仅在包含 '#留言' 标签时渲染 CommentBox */}
          {hasCommentTag && <CommentBox data={data} />}
        </>
      )}
      <div className="footer">
        <Footer />
        <ThemeToggle />
      </div>
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  padding-left: 0rem;
  padding-right: 0rem;
  padding-top: 0rem; // 整个阅读页面的上下左右
  padding-bottom: 0rem;
  background-color: ;
  margin: 0 auto;

  > article {
    margin: 0 auto;
    column-count: 2; // 将内容分为两栏
    column-gap: 2rem; // 栏之间的间距

    @media (max-width: 767px) {
    column-count: 1; // 将内容分为两栏
  }

   .tags {
     display: flex; /* 使用 flex 布局 */
     margin-top: 2rem; /* 推到底部 */
     align-items: flex-end; /* 垂直对齐到底部 */
     flex-grow: 1;
     max-width: 100%;
     align-items: center; /* 保持垂直居中 */
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
  > .footer {
    display: grid;
    grid-column: span 12 / span 12;
    grid-template-columns: 6fr 1fr; // 调整左右的比例
    padding-bottom: 2rem;
    padding-top: 3rem;
    margin-top: auto;
  }
`
