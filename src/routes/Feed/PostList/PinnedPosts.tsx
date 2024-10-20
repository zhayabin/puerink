import PostContent from "src/routes/Feed/PostList/PostContent"
import React, { useMemo } from "react"
import usePostsQuery from "src/hooks/usePostsQuery"
import styled from "@emotion/styled"
import { filterPosts } from "./filterPosts"
import { DEFAULT_CATEGORY } from "src/constants"

type Props = {
  q: string
}

const PinnedPosts: React.FC<Props> = ({ q }) => {
  const data = usePostsQuery()

  const filteredPosts = useMemo(() => {
    const baseFiltered = filterPosts({
      posts: data,
      q,
      category: DEFAULT_CATEGORY,
      order: "desc",
    })
    return baseFiltered.filter((post) => post.tags?.includes("#置顶"))
  }, [data, q])

  if (filteredPosts.length === 0) return null

  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="header"> 置顶文章⇪</div>
      </div>
      <div className="PostContent">
        {filteredPosts.map((post) => (
          <PostContent key={post.slug} data={post} />
        ))}
      </div>
    </StyledWrapper>
  )
}

export default PinnedPosts

const StyledWrapper = styled.div`
 .PostContent {
    position: relative; // 设置为相对定位
  }

  .header {
    position: absolute; // 绝对定位
    z-index: 1; // 确保在上方
    background-color: ${({ theme }) => theme.colors.green8}; // 半透明背景
    padding: 3px 3px 4px 7px; // 内边距
    border-radius: 3px 0 2px 0; // 圆角
    font-size: 12px
  }

`
