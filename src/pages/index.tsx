import Feed from "src/routes/Feed"
import { Photos } from "src/pages/Photos"
import { CONFIG } from "../../site.config"
import { NextPageWithLayout } from "../types"
import { getPosts } from "../apis"
import MetaConfig from "src/components/MetaConfig"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { GetStaticProps } from "next"
import { dehydrate } from "@tanstack/react-query"
import { filterPosts } from "src/libs/utils/notion"
import styled from "@emotion/styled"; // 引入 styled 用于创建新的容器

export const getStaticProps: GetStaticProps = async () => {
  const posts = filterPosts(await getPosts())
  await queryClient.prefetchQuery(queryKey.posts(), () => posts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: CONFIG.revalidateTime,
  }
}

// 创建一个全宽的容器
const FullWidthContainer = styled.div`
  width: 100vw; /* 占满整个视口宽度 */
  margin-left: calc(-50vw + 50%); /* 确保从屏幕边缘开始 */
  padding: 0;
`;

const FeedPage: NextPageWithLayout = () => {
  const meta = {
    title: CONFIG.blog.title,
    description: CONFIG.blog.description,
    type: "website",
    url: CONFIG.link,
  }

  return (
    <>

      <MetaConfig {...meta} />
      <Feed />
      <FullWidthContainer>
        <Photos /> {/* Photos 模块在全宽容器内 */}
      </FullWidthContainer>
    </>
  )
}

export default FeedPage
