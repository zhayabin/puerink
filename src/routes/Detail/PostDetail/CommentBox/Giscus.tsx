import { CONFIG } from "site.config"
import { useCallback, useEffect, useState } from "react"
import styled from "@emotion/styled"
import useScheme from "src/hooks/useScheme"
import { useRouter } from "next/router"
import Giscus from "@giscus/react"

type Props = {
  id: string
  slug: string
  title: string
}

const GiscusComments: React.FC<Props> = ({ id, slug, title }) => {
  const [value, setValue] = useState(0)
  const [scheme] = useScheme()

  const onDocumentElementChange = useCallback(() => {
    setValue((value) => value + 1)
  }, [])

  useEffect(() => {
    const changesObserver = new MutationObserver(
      (mutations: MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord) => {
          onDocumentElementChange()
        })
      }
    )

    changesObserver.observe(document.documentElement, {
      attributeFilter: ["class"],
    })

    return () => {
      changesObserver.disconnect()
    }
  }, [onDocumentElementChange])

  return (
    <>
      <StyledWrapper id="comments">
        <Giscus
          key={value}
          repo="zhayabin/puerink"
          repoId={CONFIG.giscus.config.repoId}
          category={CONFIG.giscus.config.category}
          categoryId={CONFIG.giscus.config.categoryId}
          reactionsEnabled="0"
          mapping="pathname"
          emitMetadata="0"
          inputPosition="top"
          theme= {scheme}
          lang="zh-CN"
          loading="lazy"
        />
      </StyledWrapper>
    </>
  )
}
export default GiscusComments

const StyledWrapper = styled.div`
  margin-top: 2.5rem;

  .giscus {
    font-family: 'Pixel', 'Source Han Sans', Arial, sans-serif; // 使用特定字体
  }

`
