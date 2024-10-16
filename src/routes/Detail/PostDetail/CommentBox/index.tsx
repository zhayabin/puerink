import { TPost } from 'src/types'
import { CONFIG } from 'site.config'
import dynamic from 'next/dynamic'

const GiscusComponent = dynamic(
  () => {
    return import('./Giscus')
  },
  { ssr: false }
)

const TwikooComponent = dynamic(
  () => {
    return import('./Twikoo')
  },
  { ssr: false }
)

type Props = {
  data: TPost
}

const CommentBox: React.FC<Props> = ({ data }) => {
  return (
    <div>
      {CONFIG.giscus.enable && (
        <GiscusComponent id={data.id} slug={data.slug} title={data.title} />
      )}
      {CONFIG.twikoo.enable && (
        <TwikooComponent id={data.id} slug={data.slug} title={data.title} />
      )}
    </div>
  )
}

export default CommentBox
