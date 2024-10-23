import { TPost } from 'src/types';
import { CONFIG } from 'site.config';
import dynamic from 'next/dynamic';

<<<<<<< HEAD
const TwikooComponent = dynamic(() => import('./Twikoo'), { ssr: false });

const CommentBox: React.FC<{ data: TPost }> = ({ data }) => (
  <div>
    {CONFIG.twikoo.enable && (
      <TwikooComponent id={data.id} slug={data.slug} title={data.title} />
    )}
  </div>
);

export default CommentBox;
=======
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
>>>>>>> af156cbb68124db3cf7846f159eb83e77ec6aa11
