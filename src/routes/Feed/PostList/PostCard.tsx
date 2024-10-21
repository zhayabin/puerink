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

        <div className="topthumbnail">
          <div className="comment">
            <div className="date">
            {formatDate( // 格式化日期并显示
              data?.date?.start_date || data.createdTime,
              CONFIG.lang
               )}
            </div>
            <div className="time">
              <p>{data.time}</p> {/* 显示时间 */}
            </div>
          </div>

          <div className="authorname">
            {data.author && data.author[0] && data.author[0].name ? (
              <div className="author">
                <Image
                  css={{ borderRadius: "100%" }}
                  src={data.author[0].profile_photo || CONFIG.profile.image}
                  alt="profile_photo"
                  width={18}
                  height={18}
                />
                <div className="name">{data.author[0].name}</div>
              </div>
            ) : (
              data.logo && (
                <div className="author">
                  <Image
                    css={{ borderRadius: "100%" }}
                    src={data.logo}
                    alt="logo"
                    width={18}
                    height={18}
                  />
                  <div className="">{data.name}</div>
                </div>
              )
            )}
          </div>

          {data.thumbnail && (
            <div className="thumbnail">
              <Image
                src={data.thumbnail}
                fill
                alt={data.title}
                css={{ objectFit: "cover", borderRadius: "3px" }}
              />
            </div>
          )}
        </div>

        <div data-thumb={!!data.thumbnail} data-category={!!category} className="content"> {/* 传递缩略图和类别存在状态 */}
          <header className="top">
            <h2>{data.title}</h2> {/* 显示帖子标题 */}
          </header>

          <div className="summary">
            <p>{data.summary}</p>
          </div>

          <div className="tagsdate">
            <div className="tags">
              {data.tags?.map((tag: string, idx: number) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
            </div>
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

    .topthumbnail {
     position: relative; /* 使其父元素相对定位 */
    }
    .comment {
      display: flex; /* 使用flex布局 */
      flex-wrap: wrap; /* 允许换行 */
      position: absolute; /* 绝对定位 */
      bottom: 0; /* 向下对齐 */
      right: 0; /* 向右对齐 */
      z-index: 1; /* 确保标签在缩略图上方 */
      padding: 0 0.5rem 0.5rem 0;

      .date,
      .time {
        display: flex;
        font-size: 14px; /* 字体大小 */
        margin-left: 0.3rem;
        white-space: nowrap; /* 防止换行 */
        color: ${({ theme }) => theme.colors.gray11}; /* 字体颜色 */
        p {
          margin: 0;
        }
      }
    }
    .authorname {
      display: flex; /* 使用flex布局 */
      flex-wrap: wrap; /* 允许换行 */
      position: absolute; /* 绝对定位 */
      bottom: 0; /* 向下对齐 */
      ltft: 0; /* 向左对齐 */
      z-index: 1; /* 确保标签在缩略图上方 */
      justify-content: space-between;
      color: ${({ theme }) => theme.colors.gray11};
      font-size: 14px; /* 字体大小 */
      padding: 0.5rem;

      .author {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        white-space: nowrap; /* 防止换行 */
      }
    }

    .thumbnail {
      position: relative; /* 相对定位缩略图 */
      width: 100%; /* 100% 宽度 */
      background-color: ${({ theme }) => theme.colors.gray2}; /* 背景颜色 */
      padding-bottom: 50%; /* 调整手机显示图片高度 */

      @media (min-width: 540px) {
        padding-bottom: 61.8%; /* 调整 PC 图显示高度 */
      }
    }

    .thumbnail::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      bottom: -1px;
      background: linear-gradient(to top, ${({ theme }) => theme.colors.gray2}, transparent);
    }
    > .content {
      padding: 0.5rem;
      &[data-category="false"] {
        padding-top: 0.875rem; // 标题与图片边距
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
          0rem; /* 底部间距 */
          font-size: 17px; /* 字体大小 */
          line-height: 1.5rem; /* 行高 */
          cursor: pointer; /* 鼠标指针变为手型 */

        }

        @media (min-width: 540px) {
          h2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1; /* 大于768px时显示的行数 */
            min-height: 1rem;
            text-overflow: ellipsis; /* 添加省略号 */
            overflow: hidden; /* 超出隐藏 */
          }
        }
      }

     .tagsdate {
       display: flex; // 使用flex布局
       justify-content: space-between; // 标签和日期之间的间距
       margin-top: auto; // 推到底部
       align-items: flex-end; // 垂直对齐到底部

       .date,
       .time {
         display: flex;
         font-size: 14px; // 字体大小
         margin-left: 0.3rem;
         white-space: nowrap;
         color: ${({ theme }) => theme.colors.gray11}; // 字体颜色
         p {
           margin: 0;
         }
        }

       .tags {
         display: flex; // 使用flex布局
         flex-grow: 1;
        }
      }

      > .summary {
        font-size: 14px; // 字体大小
        p {
          line-height: 1.2rem; // 行高
          color: ${({ theme }) => theme.colors.gray10}; // 字体颜色
          margin-top: 0.5rem; // 取消默认上下边距
          margin-bottom: 0.875rem; // 取消默认上下边距

          @media (min-width: 540px) {
           display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; /* 大于768px时显示的行数 */
            min-height: 2.4rem;
            text-overflow: ellipsis; /* 添加省略号 */
            overflow: hidden; /* 超出隐藏 */
          }
        }
      }
    }
  }
`
