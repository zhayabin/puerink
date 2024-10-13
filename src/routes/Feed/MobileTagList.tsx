import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"
import { Emoji } from "src/components/Emoji"
import { useTagsQuery } from "src/hooks/useTagsQuery"

type Props = {}

const TagList: React.FC<Props> = () => {
  const router = useRouter()
  const currentTag = router.query.tag || undefined
  const data = useTagsQuery()

  const handleClickTag = (value: any) => {
    // delete
    if (currentTag === value) {
      router.push({
        query: {
          ...router.query,
          tag: undefined,
        },
      })
    }
    // add
    else {
      router.push({
        query: {
          ...router.query,
          tag: value,
        },
      })
    }
  }

  return (
    <StyledWrapper>
      <div className="top">
        <Emoji> </Emoji>
      </div>
      <div className="list">
        {Object.keys(data).map((key) => (
          <a
            key={key}
            data-active={key === currentTag}
            onClick={() => handleClickTag(key)}
          >
            {key}
          </a>
        ))}
      </div>
    </StyledWrapper>
  )
}

export default TagList

const StyledWrapper = styled.div`
  display: none; /* 默认隐藏 */

  @media (max-width: 1024px) {
    display: block; /* 在小于1024px时显示 */

    .top {
      padding: 0rem;
      margin-bottom: 1.3rem;
    }

    .list {
      display: flex;
      flex-wrap: wrap; /* 使标签换行 */
      margin-bottom: 3rem;
      gap: 1rem; /* 调整标签之间的间距 */

      scrollbar-width: none;
      -ms-overflow-style: none;
      ::-webkit-scrollbar {
        width: 0;
        height: 0;
      }

      a {
        display: block;
        padding: 0rem;
        padding-left: 0rem;
        padding-right: 0rem;
        margin-top: 0rem;
        margin-bottom: 0rem;
        font-size: 0.875rem;
        line-height: 0.5rem;
        color: ${({ theme }) => theme.colors.gray10};
        white-space: nowrap; /* 防止文字换行 */
        flex-shrink: 0;
        text-decoration: none; /* 默认无下划线 */

        &:hover {
          text-decoration: underline; /* 悬停时显示下划线 */
          color: #20973A; /* 悬停时文字颜色 */
        }

        &[data-active="true"] {
          text-decoration: underline; /* 激活状态下显示下划线 */
          color: #20973A; /* 激活状态下的文字颜色 */
        }
      }
    }
  }
`
