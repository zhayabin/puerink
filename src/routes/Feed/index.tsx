import { useState } from "react"
import SearchInput from "./SearchInput"
import Footer from "./Footer"
import Header from "./Header"
import ThemeToggle from "./ThemeToggle"
import styled from "@emotion/styled"
import TagList from "./TagList"
import MobileGallery from "./MobileGallery"
import MobileTagList from "./MobileTagList"
import Gallery from "./Gallery"
import ContactCard from "./ContactCard"
import PostList from "./PostList"
import PinnedPosts from "./PostList/PinnedPosts"

const HEADER_HEIGHT = 73

type Props = {}

const Feed: React.FC<Props> = () => {
  const [q, setQ] = useState("")

  return (
    <StyledWrapper>
      <div className="guding">
      <Header fullWidth={false} />

      </div>

      <div
        className="lt"
        css={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <PinnedPosts q={q} />
        <SearchInput value={q} onChange={(e) => setQ(e.target.value)} />
        <TagList />
        <ContactCard />

      </div>

      {/* 新增的布局区域 */}
      <div className="new-section">

        <div className="left"> {/* 左侧内容 */}
         <MobileTagList />
        </div>
        <div className="right"> {/* 右侧内容 */}
        <MobileGallery />
        </div>
      </div>

      <div className="mid">


        <div className="tags">
          <PinnedPosts q={q} />
          <SearchInput value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <PostList q={q} />

      </div>
      <div className="footer">
          <Footer />
          <ThemeToggle />
        </div>
    </StyledWrapper>
  )
}

export default Feed

const StyledWrapper = styled.div`
  grid-template-columns: repeat(12, minmax(0, 1fr));
  padding: 1rem 0;  //顶部标题距离内容的距离
  display: grid;
  gap: 1.5rem;
  position: relative; // 添加相对定位

  @media (max-width: 768px) {
    display: block;
    padding: 1rem 0; //顶部标题距离内容的距离
  }

  @media (max-width: 1024px) {
    display: block;
    padding: 1rem 0; //顶部标题距离内容的距离
  }

  > .guding {

    top: 0; // 顶部对齐
    left: 0;
    right: 0;
    z-index: 10; // 确保在最上层
    display: grid;
    grid-column: span 12;
  }

  > .lt {
    display: none;
    overflow: scroll;
    position: sticky;
    grid-column: span 2 / span 2;

    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    @media (min-width: 1025px) {
      display: block;
    }

  }

  /* 新增的布局样式 */
  > .new-section {
    display: grid;
    grid-column: span 12 / span 12;
    grid-template-columns: 2fr 1fr; //调整左右的比例
    gap: 1rem;

    @media (min-width: 1025px) {
      display: none; /* 大于1024px时隐藏 */
    }

    .left {
      padding: 0rem;
    }

    .right {

      position: relative; // 确保这个区域可以相对定位
      margin-right: -14px; // 试图将右边距设为负值以拉近
    }
  }

  > .mid {
    grid-column: span 12 / span 12;
    padding-top: 0rem;

    @media (min-width: 1024px) {
      display: grid;
      grid-column: span 10 / span 10;
      padding-top: 0rem;
    }

    > .tags {
      display: block;

      @media (min-width: 1025px) {
        display: none;
      }
    }
  }

  > .footer {
      display: grid;
      grid-column: span 12 / span 12;
      grid-template-columns: 6fr 1fr; //调整左右的比例
      padding-bottom: 0rem;


    }
  }

`
