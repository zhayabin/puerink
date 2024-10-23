import Feed from "src/routes/Feed"
import { Photos } from "src/pages/Photos"
import { CONFIG } from "../../site.config"
import { NextPageWithLayout } from "../types"
import { getPosts } from "../apis"
import MetaConfig from "src/components/MetaConfig"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { GetServerSideProps } from "next" // 修改为动态生成
import { dehydrate } from "@tanstack/react-query"
import { filterPosts } from "src/libs/utils/notion"
import Footer from "src/routes/Feed/Footer"
import ThemeToggle from "src/routes/Feed/ThemeToggle"
import styled from "@emotion/styled"; // 引入 styled 用于创建新的容器

// 动态生成页面的 props
export const getServerSideProps: GetServerSideProps = async () => {
  // 从 API 获取文章并过滤
  const posts = filterPosts(await getPosts())
  await queryClient.prefetchQuery(queryKey.posts(), () => posts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    // revalidate: CONFIG.revalidateTime, // 注释掉，以便于测试动态生成
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
    <StyledWrapper>
      <MetaConfig {...meta} />
      <Feed />
      <div className="footertoggle">
        <div className="footer">
         <Footer />
        </div>
        <div className="toggle">
         <ThemeToggle />
        </div>
      </div>
      <FullWidthContainer>
        {/* 可在这里添加全宽内容 */}
      </FullWidthContainer>
    </StyledWrapper>
  )
}

export default FeedPage

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; // 让整个页面高度至少为视口高度
  justify-content: space-between; // 确保内容和footer之间有空间
  padding-left: 1rem;
  padding-right: 1rem;

  @media (max-width: 540px) {
    padding-left: 0rem;
    padding-right: 0rem;
  }

 > .footertoggle {
    display: flex; /* 使用flex布局 */
    align-items: center; /* 垂直居中 */
    justify-content: space-between; /* 标签和日期之间的间距 */
    padding-bottom: 2rem;

    .footer {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-grow: 1;
    }

    .toggle {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 0px;
    }
  }
}
`
