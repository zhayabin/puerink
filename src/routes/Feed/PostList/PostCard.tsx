import Link from "next/link" // 导入 Next.js 的 Link 组件，用于页面导航
import { CONFIG } from "site.config" // 导入配置文件中的配置
import { formatDate } from "src/libs/utils" // 导入日期格式化工具
import Tag from "../../../components/Tag" // 导入标签组件
import { TPost } from "../../../types" // 导入 TPost 类型定义
import Image from "next/image" // 导入 Next.js 的 Image 组件，用于图片优化
import Category from "../../../components/Category" // 导入分类组件
import styled from "@emotion/styled" // 导入 Emotion 的 styled 组件，用于样式化

// 定义 Props 类型，包含 data 属性
type Props = {
  data: TPost // 接收的帖子数据
}

// 定义 PostCard 组件
const PostCard: React.FC<Props> = ({ data }) => {
  // 获取类别，默认为 undefined
  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper href={`/${data.slug}`}> {/* 使用 StyledWrapper 包裹内容 */}
      <article>
        {category && ( // 如果存在类别，则渲染类别组件
          <div className="category">
            <Category>{category}</Category>
          </div>
        )}
        {data.thumbnail && ( // 如果存在缩略图，则渲染图片
          <div className="thumbnail">
            <Image
              src={data.thumbnail} // 图片源
              fill // 使图片充满容器
              alt={data.title} // 图片替代文本
              css={{ objectFit: "cover" }} // 确保图片按比例裁剪
            />
          </div>
        )}
        <div data-thumb={!!data.thumbnail} data-category={!!category} className="content"> {/* 传递缩略图和类别存在状态 */}
          <header className="top">
            <h2>{data.title}</h2> {/* 显示帖子标题 */}
          </header>
          <div className="date">
            <div className="content">
              {formatDate( // 格式化日期并显示
                data?.date?.start_date || data.createdTime,
                CONFIG.lang
              )}
            </div>
          </div>
          <div className="summary">
            <p>{data.summary}</p> {/* 显示帖子摘要 */}
          </div>
          <div className="tags">
            {data.tags && // 渲染标签
              data.tags.map((tag: string, idx: number) => (
                <Tag key={idx}>{tag}</Tag> // 使用 Tag 组件显示每个标签
              ))}
          </div>
        </div>
      </article>
    </StyledWrapper>
  )
}

export default PostCard // 导出 PostCard 组件

// StyledWrapper 是一个样式化的 Link 组件
const StyledWrapper = styled(Link)`
  article {
    overflow: hidden; // 隐藏溢出内容
    position: relative; // 相对定位
    margin-bottom: 1rem; // 底部间距
    border-radius: 0.3rem; // 首页卡片圆角
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4}; // 根据主题设置背景颜色
    transition-property: box-shadow; // 设置过渡属性
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); // 设置过渡效果
    transition-duration: 300ms; // 设置过渡持续时间

    @media (min-width: 768px) {
      margin-bottom: 2rem; // 在大屏幕上增加底部间距
    }

    :hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0),
        0 4px 6px -2px rgba(0, 0, 0, 0); // 鼠标悬停时的阴影效果
    }
    > .category {
      position: absolute; // 绝对定位类别
      top: 1rem; // 距离顶部 1rem
      left: 1rem; // 距离左侧 1rem
      z-index: 10; // 提高 z-index 使其位于上层
    }

    > .thumbnail {
      position: relative; // 相对定位缩略图
      width: 100%; // 100% 宽度
      background-color: ${({ theme }) => theme.colors.gray2}; // 背景颜色
      padding-bottom: 33%; // 调整手机显示图片高度

      @media (min-width: 1024px) {
        padding-bottom: 33%; // 调整 PC 图显示高度
      }
    }
    > .content {
      padding: 1rem; // 内边距

      &[data-thumb="false"] {
        padding-top: 3.5rem; // 如果没有缩略图，增加顶部内边距
      }
      &[data-category="false"] {
        padding-top: 1.5rem; // 如果没有类别，增加顶部内边距
      }
      > .top {
        display: flex; // 使用 flexbox
        flex-direction: column; // 垂直方向排列
        justify-content: space-between; // 在主轴方向分散排列

        @media (min-width: 768px) {
          flex-direction: row; // 在大屏幕上切换为横向排列
          align-items: baseline; // 基线对齐
        }
        h2 {
          margin-bottom: 0.5rem; // 底部间距
          font-size: 1.125rem; // 字体大小
          line-height: 1.75rem; // 行高
          font-weight: 500; // 字体加粗

          cursor: pointer; // 鼠标指针变为手型

          @media (min-width: 768px) {
            font-size: 1.25rem; // 在大屏幕上增加字体大小
            line-height: 1.75rem; // 行高
          }
        }
      }
      > .date {
        display: flex; // 使用 flexbox
        margin-bottom: 1rem; // 底部间距
        gap: 0.5rem; // 间距
        align-items: center; // 垂直居中对齐
        .content {
          font-size: 0.875rem; // 字体大小
          line-height: 1.25rem; // 行高
          color: ${({ theme }) => theme.colors.gray10}; // 字体颜色
          @media (min-width: 768px) {
            margin-left: 0; // 在大屏幕上重置左边距
          }
        }
      }
      > .summary {
        margin-bottom: 1rem; // 底部间距
        p {
          display: none; // 默认不显示摘要
          line-height: 2rem; // 行高
          color: ${({ theme }) => theme.colors.gray11}; // 字体颜色

          @media (min-width: 768px) {
            display: block; // 在大屏幕上显示摘要
          }
        }
      }
      > .tags {
        display: flex; // 使用 flexbox
        gap: 0.5rem; // 间距
      }
    }
  }
`
