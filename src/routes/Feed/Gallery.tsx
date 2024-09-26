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
                你好，欢迎！我是草哥，一个爱喝茶的设计师。<br />
                <br />
                如您所见，本站分享一些个人的思考与喝茶的乐趣。偶有爆论，请多指教。
                <br /> <br />
                祝您健康！
                <br /> <br />
                2023/09/26, YunNan.
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
  width: 100vw; /* 占满整个视口宽度 */
  margin-left: calc(-50vw + 50%); /* 确保从屏幕边缘开始 */
  padding: 0;
  position: relative;
  user-select: none; /* 禁止选中 */
  pointer-events: none; /* 禁止拖动和交互 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhotoCard = styled.div`
  width: 215px;
  height: 280px;
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
  bottom: 2rem;
  left: 1rem;
  right: 0.5rem;
  color: black;
  font-family: 'DZPM', sans-serif;
  font-size: 0.6rem;
  line-height: 1.55;
  text-align: left;
  user-select: none; /* 禁止选中 */
  pointer-events: none; /* 禁止交互 */
`;

export default Gallery;

const StyledWrapper = styled.div`
  display: flex;
  padding: 1rem; /* 上下左右的内边距，调整为合适的值 */
  flex-direction: column; /* 垂直布局 */
  margin: 2rem auto; /* 调整上下的外边距，并居中显示 */
  box-sizing: border-box; /* 确保 padding 不影响宽度计算 */
  width: 90%; /* 设置宽度，比如占据90%的父容器宽度 */
  max-width: 1200px; /* 可设置一个最大宽度 */
  user-select: none; /* 禁止选中 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none; /* 禁止长按弹出菜单 */
`;