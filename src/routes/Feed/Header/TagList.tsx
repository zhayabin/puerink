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
        {Object.keys(data)
        .filter((key) => key !== "#留言") // 过滤掉“留言”标签
        .map((key) => (
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
  display: block;

  .list {
    display: flex;
    flex-wrap: wrap; /* 使标签换行 */

    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    a {
      display: block;
      font-size: 14px;
      padding: 0.4rem;
      color: ${({ theme }) => theme.colors.gray10};
      white-space: nowrap; /* 防止文字换行 */
      flex-shrink: 0;
      text-decoration: none; /* 默认无下划线 */

      &:hover {
        color: #20973A; /* 悬停时的文字颜色 */
        font-weight: 600;
      }

      &[data-active="true"] {
        color: #20973A; /* 激活状态下的文字颜色 */
        font-weight: 600;
      }
    }
  }

`
