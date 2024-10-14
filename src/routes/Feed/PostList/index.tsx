import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PostCard from "src/routes/Feed/PostList/PostCard";
import { DEFAULT_CATEGORY } from "src/constants";
import usePostsQuery from "src/hooks/usePostsQuery";
import styled from "@emotion/styled";

type Props = {
  q: string;
};

const PostList: React.FC<Props> = ({ q }) => {
  const router = useRouter();
  const data = usePostsQuery();
  const [filteredPosts, setFilteredPosts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6); // 默认6篇

  const currentTag = `${router.query.tag || ``}` || undefined;
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY;
  const currentOrder = `${router.query.order || ``}` || "desc";

  // 根据屏幕大小动态调整每页文章数量
  useEffect(() => {
    const updatePostsPerPage = () => {
      if (window.innerWidth > 1024) {
        setPostsPerPage(8); // 大于1024px时显示8篇
      } else {
        setPostsPerPage(6); // 默认显示6篇
      }
    };

    updatePostsPerPage(); // 初始化时执行一次
    window.addEventListener("resize", updatePostsPerPage);

    return () => window.removeEventListener("resize", updatePostsPerPage);
  }, []);

  // 根据页码和每页文章数量进行分页
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  useEffect(() => {
    setFilteredPosts(() => {
      let newFilteredPosts = data;

      // 关键字过滤
      newFilteredPosts = newFilteredPosts.filter((post) => {
        const tagContent = post.tags ? post.tags.join(" ") : "";
        const searchContent = post.title + post.summary + tagContent;
        return searchContent.toLowerCase().includes(q.toLowerCase());
      });

      // 标签过滤
      if (currentTag) {
        newFilteredPosts = newFilteredPosts.filter(
          (post) => post && post.tags && post.tags.includes(currentTag)
        );
      }

      // 分类过滤
      if (currentCategory !== DEFAULT_CATEGORY) {
        newFilteredPosts = newFilteredPosts.filter(
          (post) =>
            post && post.category && post.category.includes(currentCategory)
        );
      }

      // 排序
      if (currentOrder !== "desc") {
        newFilteredPosts = newFilteredPosts.reverse();
      }

      return newFilteredPosts;
    });
    // 每次过滤或排序后重置页码为第一页
    setCurrentPage(1);
  }, [q, currentTag, currentCategory, currentOrder, setFilteredPosts, data]);

  return (
    <>
      <StyledPostList>
        {!paginatedPosts.length && (
          <p className="text-gray-500 dark:text-gray-300">没找到！</p>
        )}
        {paginatedPosts.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
      </StyledPostList>

      {/* 分页按钮 */}
      <PaginationContainer>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          上一页
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          下一页
        </button>
      </PaginationContainer>
    </>
  );
};

const StyledPostList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 两列布局
  grid-column-gap: 1.2rem; // 设置左右间距
  grid-row-gap: 2rem; // 设置上下间距
  max-width: 100%; // 防止被拉长
  max-height: 0%; // 保持比例


  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); // 小于1024px时为三列
    grid-column-gap: 1.2rem; // 设置左右间距
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); // 小于768px时为两列
    grid-column-gap: 1rem; // 设置左右间距
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  gap: 0.5rem;

  button {
    padding: 0.2rem 0.7rem;
    background-color: ; // 按钮背景色
    border: none;
    border-radius: 0px; // 边角圆度
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray10}; // 默认颜色

    font-size: 0.875rem; // 设置文字大小，可以根据需要调整

    &.active {
      color: #20973A; // 选中颜色
    }

    &:hover {
      text-decoration: underline; // 鼠标悬停下划线
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.2; // 禁用时的透明度
    }
  }
`;

export default PostList;
