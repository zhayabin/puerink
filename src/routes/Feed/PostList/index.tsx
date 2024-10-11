import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PostCard from "src/routes/Feed/PostList/PostCard";
import { DEFAULT_CATEGORY } from "src/constants";
import usePostsQuery from "src/hooks/usePostsQuery";
import styled from "@emotion/styled"; // 确保导入 styled

type Props = {
  q: string;
};

const PostList: React.FC<Props> = ({ q }) => {
  const router = useRouter();
  const data = usePostsQuery();
  const [filteredPosts, setFilteredPosts] = useState(data);

  const currentTag = `${router.query.tag || ``}` || undefined;
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY;
  const currentOrder = `${router.query.order || ``}` || "desc";

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
          (post) => post && post.category && post.category.includes(currentCategory)
        );
      }

      // 排序
      if (currentOrder !== "desc") {
        newFilteredPosts = newFilteredPosts.reverse();
      }

      return newFilteredPosts;
    });
  }, [q, currentTag, currentCategory, currentOrder, setFilteredPosts, data]);

  return (
    <StyledPostList>
      {!filteredPosts.length && (
        <p className="text-gray-500 dark:text-gray-300">没找到！</p>
      )}
      {filteredPosts.map((post) => (
        <PostCard key={post.id} data={post} />
      ))}
    </StyledPostList>
  );
};

const StyledPostList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 两列布局
  grid-column-gap: 1.5rem; // 设置左右间距
  grid-row-gap: 4rem; // 设置上下间距
  max-width: 100%; // 防止被拉长
  max-height: 0%; // 保持比例

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // 小于1024px时变为单列
  }
`;

export default PostList;
