import { TPost } from 'src/types';
import { CONFIG } from 'site.config';
import dynamic from 'next/dynamic';

const TwikooComponent = dynamic(() => import('./Twikoo'), { ssr: false });

const CommentBox: React.FC<{ data: TPost }> = ({ data }) => (
  <div>
    {CONFIG.twikoo.enable && (
      <TwikooComponent id={data.id} slug={data.slug} title={data.title} />
    )}
  </div>
);

export default CommentBox;
