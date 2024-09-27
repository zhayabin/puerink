import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';

const Gallery = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  // 处理鼠标悬停和触摸事件
  const handleMouseEnter = () => setIsFlipped(true);
  const handleMouseLeave = () => setIsFlipped(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // 阻止长按时弹出的选项框
    setIsFlipped(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault(); // 阻止触摸时的浏览器默认行为
    setIsFlipped(false);
  };

  return (
    <>
      {/* 引入全局字体 */}
      <Global
        styles={css`
          @font-face {
            font-family: 'DZPM';
            src: url('/gallery/DZPM.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
          }
        `}
      />

      <GalleryContainer
        onContextMenu={(e) => e.preventDefault()} // 禁止右键菜单
        onDragStart={(e) => e.preventDefault()}   // 禁止拖动
      >
        <PhotoCard
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="photo-inner"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.15 }}
            style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
          >
            {/* 正面 */}
            <PhotoFront className="photo-face">
              <TiltedImage>
                <Image
                  src="/gallery/1.jpg" // 正面照片路径
                  alt="正面照片"
                  fill
                  style={{
                    objectFit: 'cover',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    borderRadius: '5px',
                    boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.3)' // 添加阴影效果
                }}
                />
              </TiltedImage>
            </PhotoFront>

            {/* 背面 */}
            <PhotoBack className="photo-face">
              <TiltedImage>
                <Image
                  src="/gallery/2.jpg" // 背面照片路径
                  alt="背面照片"
                  fill
                  style={{
                    objectFit: 'cover',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    borderRadius: '5px',
                    boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.2)' // 添加阴影效果
                }}
                />
                <TextOverlay>
                你好，欢迎！
                <br /> <br />
                我是草哥，一个爱喝茶的设计师。如您所见，本站分享一些个人的思考与喝茶的乐趣。偶有爆论，请多指教。
                <br /> <br />祝您健康！
                2023/09/26, KM.
                </TextOverlay>
              </TiltedImage>
            </PhotoBack>
          </motion.div>
        </PhotoCard>
      </GalleryContainer>
    </>
  );
};

// 样式部分
const GalleryContainer = styled.div`
  padding: 0rem;
  padding-left: 0rem;
  padding-right: 0.5rem;
  margin-top: 0.8rem;
  margin-bottom: 0rem;
  user-select: none; /* 禁止选中 */
  pointer-events: none; /* 禁止拖动和交互 */
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1024px) {
    display: none; /* 视口宽度大于等于1024px时隐藏组件 */
  }
`;

const PhotoCard = styled.div`
  width: 130px;
  height: 180px;
  perspective: 1000px;
  position: relative;
  pointer-events: all; /* 允许卡片本身有交互 */
  user-select: none; /* 禁止选中 */
`;

const PhotoFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

const PhotoBack = styled(PhotoFront)`
  transform: rotateY(180deg);
`;

const TiltedImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform: rotate(1.5deg); /* 照片倾斜角度 */
`;

const TextOverlay = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  right: 0.05rem;
  color: black;
  font-family: 'DZPM', sans-serif;
  font-size: 0.55rem;
  line-height: 1.5;
  text-align: left;
  user-select: none; /* 禁止选中 */
  pointer-events: none; /* 禁止交互 */
`;

export default Gallery;

