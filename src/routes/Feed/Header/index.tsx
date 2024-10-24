import { useEffect, useRef, useState, useCallback } from "react";
import Contact from "./Contact";
import Logo from "./Logo";
import styled from "@emotion/styled";
import SearchInput from "./SearchInput";
import Close from "./Close";
import usePostsQuery from "src/hooks/usePostsQuery";
import { TPost } from "src/types"; // 确保引入 TPost
import Link from "next/link";
import { CONFIG } from "site.config"; // 导入配置文件中的配置
import { formatDate } from "src/libs/utils";
import TagList from "./TagList";

interface StyledWrapperProps {
  isExpanded: boolean; // 添加 isExpanded 属性
}

const Header: React.FC<{ fullWidth: boolean }> = ({ fullWidth }) => {
  const [q, setQ] = useState("");
  const [filteredResults, setFilteredResults] = useState<TPost[]>([]);
  const [visibleResults, setVisibleResults] = useState(5);
  const [showResults, setShowResults] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const data = usePostsQuery();
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (q.length === 0) {
      setFilteredResults([]);
      setShowResults(false);
      setIsExpanded(false);
      return;
    }

    const results = data.filter((post) => {
      const searchContent = post.title + post.summary;
      return searchContent.toLowerCase().includes(q.toLowerCase());
    });

    results.sort((a, b) => new Date(b.date.start_date).getTime() - new Date(a.date.start_date).getTime());

    setFilteredResults(results);
    setVisibleResults(5);
    setShowResults(true);
    setIsExpanded(true);
  }, [q, data]);

  const loadMore = () => {
    setVisibleResults((prev) => prev + 5);
  };

  const hideResults = useCallback(() => {
    setShowResults(false);
    setIsExpanded(false);
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (event.clientY > 640) {
      hideResults();
    }
  }, [hideResults]);

  const handleScroll = useCallback(() => {
    hideResults();
  }, [hideResults]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  return (
    <StyledWrapper>
      <div ref={backdropRef} className={`backdrop ${isExpanded ? 'expanded' : ''}`} />
      <div data-full-width={fullWidth} className="container">
        <div className="logo">
          <Logo />
        </div>

        <div className="search">
          <div className="close" style={{ height: '20px' }}>
            <Close onClick={() => setQ("")} symbol={q.length === 0 ? "magnifying-glass" : "cross"} />
          </div>
          <div className="search-input">
            <SearchInput
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => setIsExpanded(true)}
            />
          </div>
        </div>

        <div className="contact">
          <Contact />
        </div>
      </div>

      {showResults && (
        <div className="search-results" ref={resultsRef}>
          {filteredResults.length === 0 ? (
            <p style={{ marginLeft: '24px' }}>没有找到相关结果！请换个搜索词试试。</p>
          ) : (
            <>
              {filteredResults.slice(0, visibleResults).map((post) => (
                <Link key={post.id} href={`/${post.slug}`} passHref>
                  <div className="result-item">
                    <div style={{ display: 'flex' }}>
                      <svg
                        style={{ marginTop: '2.5px', marginRight: '10px' }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        width="14"
                        height="14"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{post.title.length > 17 ? `${post.title.slice(0, 17)}...` : post.title}</span>
                    </div>
                    <div className="nametime">
                      {formatDate(post.date?.start_date || post.createdTime, CONFIG.lang)} @
                      {post.author?.map((author) => author.name).join(', ')}
                      {post.name}
                    </div>
                  </div>
                </Link>
              ))}

              <div className="loadMore">
                {visibleResults < filteredResults.length && (
                  <button onClick={loadMore}>加载更多</button>
                )}
                {visibleResults >= filteredResults.length && (
                  <p>已无更多</p>
                )}
              </div>
            </>
          )}
        </div>
      )}
      {isExpanded && (
        <div className="tag-list-container">
          <TagList />
        </div>
      )}
    </StyledWrapper>
  );
};

export default Header;


const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 6rem;


  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 6rem;
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(20px);
    z-index: -1;
    transition: height 0.3s ease;
  }

  .backdrop.expanded {
    height: 40rem;
    background-color: ${({ theme }) => theme.colors.gray2};

  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-grow: 1;
    }

    .search {
      display: flex;
      justify-content: flex-end;
      .close {
        margin-top: auto;
      }
      .search-input {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }

    .contact {
      flex: 0 0 auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-left: 0rem;
    }
  }

  .search-results {
    display: flex; /* 使用flex布局 */
    flex-direction: column; /* 纵向排列每条结果 */
    position: absolute; /* 绝对定位 */
    top: 10rem;
    z-index: 1;
    margin-right: rem;
    width: 100%; /* 100% 宽度 */
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray11};
  }

  .result-item {
    font-size: 14px;
    display: flex; /* 使用flex布局 */
    margin-top: 1rem;
    gap: 1rem;
    line-height: 1.2rem;; /* 设置行距，可以根据需要调整 */
    justify-content: space-between; /* 元素之间的间距 */
    color: ${({ theme }) => theme.colors.gray12};



    &:hover {
      color: #20973A; /* 悬停时的文字颜色 */
      font-weight: 600;
    }
    .nametime {
       font-size: 12px;
       color: ${({ theme }) => theme.colors.gray9};
       white-space: nowrap; /* 不换行 */
       margin-top: auto; // 推到底部
      &:hover {
       color: ${({ theme }) => theme.colors.gray12}; /* 悬停时的文字颜色 */
    }
    }
  }

  .loadMore {
    font-size: 14px;
    margin-top: 1rem;
    margin-left: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray11};
    &:hover {
      color: #20973A; /* 悬停时的文字颜色 */
      font-weight: 600;
    }
  }

  .tag-list-container {
    position: absolute; /* 绝对定位以固定位置 */
    margin-top: 9.3rem;
    margin-left: 1.1rem;
    display: flex; /* 可以根据需要调整 */
    overflow-x: auto; /* 水平溢出时出现滚动条 */
    overflow-y: hidden; /* 隐藏垂直溢出 */
  }
`;
