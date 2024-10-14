import Detail from "src/routes/Detail"
import { filterPosts } from "src/libs/utils/notion"
import { CONFIG } from "site.config"
import { NextPageWithLayout } from "../types"
import CustomError from "src/routes/Error"
import { getRecordMap, getPosts } from "src/apis"
import MetaConfig from "src/components/MetaConfig"
import { GetServerSideProps } from "next" // 修改为动态生成
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { dehydrate } from "@tanstack/react-query"
import usePostQuery from "src/hooks/usePostQuery"
import { FilterPostsOptions } from "src/libs/utils/notion/filterPosts"

// 筛选选项，用于过滤文章
const filter: FilterPostsOptions = {
  acceptStatus: ["Public", "PublicOnDetail"],
  acceptType: ["Paper", "Post", "Page"],
}

// 动态生成文章详情页的 props
export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug

  const posts = await getPosts()

  // 预加载所有文章以便于后续处理
  const feedPosts = filterPosts(posts)
  await queryClient.prefetchQuery(queryKey.posts(), () => feedPosts)

  const detailPosts = filterPosts(posts, filter)
  const postDetail = detailPosts.find((t: any) => t.slug === slug)

  // 如果找不到文章，返回404
  if (!postDetail) {
    return {
      notFound: true,
    }
  }

  // 获取文章的记录映射
  const recordMap = await getRecordMap(postDetail?.id!)

  // 预加载当前文章的详细数据
  await queryClient.prefetchQuery(queryKey.post(`${slug}`), () => ({
    ...postDetail,
    recordMap,
  }))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    // revalidate: CONFIG.revalidateTime, // 注释掉，以便于测试动态生成
  }
}

// 动态页面组件
const DetailPage: NextPageWithLayout = () => {
  const post = usePostQuery()

  // 如果没有获取到文章，返回错误页面
  if (!post) return <CustomError />

  const image =
    post.thumbnail ??
    CONFIG.ogImageGenerateURL ??
    `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(post.title)}.png`

  const date = post.date?.start_date || post.createdTime || ""

  // 元数据配置
  const meta = {
    title: post.title,
    date: new Date(date).toISOString(),
    image: image,
    description: post.summary || "",
    type: post.type[0],
    url: `${CONFIG.link}/${post.slug}`,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <Detail />
    </>
  )
}

// 布局配置
DetailPage.getLayout = (page) => {
  return <>{page}</>
}

export default DetailPage
