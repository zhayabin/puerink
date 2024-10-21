import { TPost } from "../../../types";
import { formatDate } from "src/libs/utils";
import Tag from "../../../components/Tag";
import Category from "../../../components/Category";
import styled from "@emotion/styled";
import { CONFIG } from "site.config" // 导入配置文件中的配置
import Image from "next/image" // 导入 Next.js 的 Image 组件，用于图片优化
import Link from "next/link"

type Props = {
  data: TPost;
};

const PostContent: React.FC<Props> = ({ data }) => {
  const category = (data.category && data.category?.[0]) || undefined;

  return (
    <StyledWrapper href={`/${data.slug}`}>
      {data.thumbnail && ( // 如果存在缩略图，则渲染图片
        <div className="thumbnail">
            <Image
              src={data.thumbnail} // 图片源
              fill // 使图片充满容器
              alt={data.title} // 图片替代文本
              css={{ objectFit: "cover", borderRadius: "3px" }} // 确保图片按比例裁剪
            />
          </div>
      )}
      <div className="content">
        {category && (
          <div className="category">
            <Category>{category}</Category>
          </div>
        )}
        <header className="top">
          <h2>{data.title}</h2>
        </header>
        <div className="summary">
         <p>{data.summary}</p>
        </div>


        <div className="tagsdate">
          <div className="authorname">
            {data.author && data.author[0] && data.author[0].name ? (
              <div className="author">
                <Image
                  css={{ borderRadius: "100%" }}
                  src={data.author[0].profile_photo || CONFIG.profile.image}
                  alt="profile_photo"
                  width={15}
                  height={15} />
                <div className="name">{data.author[0].name}</div>
              </div>
            ) : (
              data.logo && (
                <div className="author">
                  <Image
                    css={{ borderRadius: "100%" }}
                    src={data.logo}
                    alt="logo"
                    width={15}
                    height={15} />
                  <div className="">{data.name}</div>
                </div>
              )
            )}
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
    </StyledWrapper>
  );
};

export default PostContent;

const StyledWrapper = styled(Link)`
  display: flex; // 设置为flex布局
  gap: 1rem;
  @media (min-width: 820px) {
   width: 65.973%; // 调整 PC 显示
  }



  .thumbnail {
    position: relative; // 相对定位缩略图
    overflow: hidden; // 隐藏溢出内容
    width: 50%;
    background-color: ${({ theme }) => theme.colors.gray2}; // 背景颜色
  }

  .content {
    width: 50%; // 右侧内容占据50%宽度
    display: flex;
    flex-direction: column; // 垂直排列


    .top {
      display: flex;
      justify-content: flex-start;

      h2 {
        margin-bottom: 0rem; /* 底部间距 */
        font-size: 17px; /* 字体大小 */
        line-height: 1.5rem; /* 行高 */
        cursor: pointer; /* 鼠标指针变为手型 */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis; /* 添加省略号 */
        overflow: hidden; /* 超出隐藏 */
      }
    }

    > .summary {
      font-size: 12px; // 字体大小
      p {
        line-height: 1.2rem; // 行高
        color: ${({ theme }) => theme.colors.gray10}; // 字体颜色
        margin-top: 0.5rem; // 取消默认上下边距
        margin-bottom: 0.5rem; // 取消默认上下边距
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* 默认显示的行数 */
        min-height: 2.4rem;
        text-overflow: ellipsis; /* 添加省略号 */
        overflow: hidden; /* 超出隐藏 */
      }

      @media (min-width: 540px) {
        p {
          -webkit-line-clamp: 3; /* 大于768px时显示的行数 */
          min-height: 4.8rem;
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
        font-size: 12px; // 字体大小
        margin-left: 0.2rem;
        white-space: nowrap;
        color: ${({ theme }) => theme.colors.gray11}; // 字体颜色
        p {
         margin: 0;
        }
      }
      .authorname {
       display: flex; /* 使用flex布局 */
       flex-wrap: wrap; /* 允许换行 */
       z-index: 1; /* 确保标签在缩略图上方 */
       justify-content: space-between;
       color: ${({ theme }) => theme.colors.gray11};
       font-size: 12px; /* 字体大小 */
       flex-grow: 1;

       .author {
         display: flex;
         gap: 0.3rem;
         align-items: center;
         white-space: nowrap; /* 防止换行 */
        }
      }
    }
  }
`;
