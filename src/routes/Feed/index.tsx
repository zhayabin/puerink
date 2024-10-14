import { useState } from "react"

import Header from "./Header"
import styled from "@emotion/styled"
import Gif from "./Gif"
import TagList from "./TagList"
import Gallery from "./Gallery"
import PostList from "./PostList"
import PinnedPosts from "./PostList/PinnedPosts"

const HEADER_HEIGHT = 73

type Props = {}

const Feed: React.FC<Props> = () => {
  const [q, setQ] = useState("")

  return (
    <StyledWrapper>
      <div className="header">
      <Header fullWidth={false} q={q} setQ={setQ}/>
      </div>

      <div className="new-section">

        <div className="left"> {/* 左侧内容 */}
         <TagList />
        </div>
        <div className="right"> {/* 右侧内容 */}
         <Gif />
        </div>
      </div>

      <div className="mid">


        <div className="tags">
        </div>
        <PostList q={q} />

      </div>

    </StyledWrapper>
  )
}

export default Feed

const StyledWrapper = styled.div`
  grid-template-columns: repeat(16, minmax(0, 1fr));
  padding: 0rem 0;  //顶部标题距离内容的距离
  padding-left: 0rem;
  padding-right: 0rem;
  display: grid;
  position: relative; // 添加相对定位

  @media (max-width: 768px) {
    display: block;
    padding: 0rem 0; //顶部标题距离内容的距离
    padding-left: 0rem;
    padding-right: 0rem;
  }

  @media (max-width: 1024px) {
    display: block;
    padding: 0rem 0; //顶部标题距离内容的距离
    padding-left: 0rem;
    padding-right: 0rem;
  }

  > .header {
    position: sticky;
    top: 0; // 顶部对齐
    left: 0;
    right: 0;
    z-index: 10; // 确保在最上层
    display: grid;
    grid-column: span 16;
  }

  /* 新增的布局样式 */
  > .new-section {
    display: grid;
    grid-column: span 16 / span 16;
    grid-template-columns: 2fr 1fr; //调整左右的比例
    gap: 1rem;
    height: 3.5rem;
    margin-bottom: 1rem;

    .left {
     margin-top: 1rem;
     margin-bottom: 0rem;

    }

    .right {
      margin-top: 0;
      margin-bottom: 0rem;
      display: flex;
      justify-content: flex-end;

      @media (min-width: 768px) {
      display: none; /* 大于1024px时隐藏 */
      }

      position: relative; // 确保这个区域可以相对定位
      margin-right: -16px; // 试图将右边距设为负值以拉近
    }
  }

  > .mid {
    grid-column: span 16 / span 16;
    padding-top: 0rem;
    margin-bottom: 3rem; // 底部间距

    @media (min-width: 1024px) {
      display: grid;
      grid-column: span 16 / span 16;
      padding-top: 0rem;
    }

    > .tags {
      display: block;

      @media (min-width: 1025px) {
        display: none;
      }
    }
  }



`
