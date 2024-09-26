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

  @media (min-width: 1024px) {
    display: block; /* 在大于1024px时显示 */

    .top {
      padding: 0.25rem;
      margin-bottom: 0.75rem;
    }

    .list {
      display: flex;
      flex-wrap: wrap; /* 使标签换行 */
      margin-bottom: 1.5rem;
      gap: 0rem; /* 调整标签之间的间距 */

      a {
        display: block;
        padding: 0.25rem 1rem;
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
        border-radius: 2rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: ${({ theme }) => theme.colors.gray10};
        cursor: pointer;
        white-space: nowrap; /* 防止文字换行 */

        :hover {
          background-color: ${({ theme }) => theme.colors.gray4};
        }

        &[data-active="true"] {
          color: ${({ theme }) => theme.colors.gray12};
          background-color: ${({ theme }) => theme.colors.gray4};

          :hover {
            background-color: ${({ theme }) => theme.colors.gray4};
          }
        }
      }
    }
  }
`
