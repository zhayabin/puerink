import { TPost } from 'src/types'
import { CONFIG } from 'site.config'
import dynamic from 'next/dynamic'

// 动态导入 Waline 组件
const WalineComponent = dynamic(
  () => {
    return import('./Waline') // 指向你的 Waline 组件路径
  },
  { ssr: false } // 在客户端渲染
)

type Props = {
  data: TPost
}

const CommentBox: React.FC<Props> = ({ data }) => {
  return (
    <div>
      {CONFIG.waline.enable && (
        <WalineComponent id={data.id} slug={data.slug} title={data.title} />
      )}
    </div>
  )
}

export default CommentBox
