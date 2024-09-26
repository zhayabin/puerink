import { AnimatePresence, motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import React from 'react';
import { travelImages } from 'public/images/travel';

const possibleRotations = [1.3, -1.3, 1.3, -1.3, 1.3, -1.3];

// 单个照片组件
const Photo = ({
  img,
  title,
  alt,
  idx,
}: {
  img: StaticImageData;
  title: string;
  alt: string;
  idx: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouched, setIsTouched] = useState(false); // 用于触摸设备的状态

  // 当手指触摸时显示效果
  const handleTouchStart = () => {
    setIsTouched(true);
  };

  // 当手指离开时还原效果
  const handleTouchEnd = () => {
    setIsTouched(false);
  };

  return (
    <motion.div
      key={img.src}
      initial={{ scale: 1, rotate: possibleRotations[idx % possibleRotations.length], opacity: 0 }}
      animate={
        isTouched
          ? { scale: 1.1, rotate: 0, transition: { duration: 0.2 } }
          : { opacity: 1 }
      }
      whileHover={{ scale: 1.1, rotate: 0, transition: { duration: 0.2 } }}
      whileInView={{ opacity: 1, transition: { delay: idx / 100 } }}
      viewport={{ once: true }}
      onHoverStart={() => setIsVisible(true)} // 鼠标悬停时显示文字
      onHoverEnd={() => setIsVisible(false)} // 鼠标离开时隐藏文字
      onTouchStart={handleTouchStart} // 手指触摸时显示效果
      onTouchEnd={handleTouchEnd} // 手指离开时还原效果
      onContextMenu={(e) => e.preventDefault()} // 禁用右键菜单
      onDragStart={(e) => e.preventDefault()} // 禁用拖动
      style={{
        position: 'relative',
        width: '120px',
        height: '150px', // 控制图片框的大小
        overflow: 'hidden',
        clipPath: 'inset(0 round 12px)', // 使用 clip-path 实现圆角
        backgroundColor: '#f0f0f0',
        flex: 'none', // 防止图片随容器缩放
        imageRendering: 'crisp-edges',
      }}
    >
      <Image
        src={img}
        alt={alt}
        sizes="120px" // 根据屏幕宽度指定不同的图片宽度
        fill
        style={{
          objectFit: 'cover',
          userSelect: 'none', // 禁止选择
          pointerEvents: 'none', // 禁止鼠标操作
        }}
        placeholder="blur"
        draggable="false" // 禁止拖拽
        onDragStart={(e) => e.preventDefault()} // 捕获图片拖拽事件并阻止默认行为
      />
      <AnimatePresence>
        {(isVisible || isTouched) && ( // 悬停或触摸时显示文字
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))',
              display: 'flex',
              alignItems: 'flex-end',
              pointerEvents: 'none', // 禁止用户选中
              userSelect: 'none', // 禁止文字选中
            }}
          >
            <h3 style={{
              padding: '8px',
              fontSize: '14px',
              color: 'white',
              fontWeight: 'bold',
              wordWrap: 'break-word', // 自动换行
              whiteSpace: 'normal', // 强制多行显示
              pointerEvents: 'none', // 禁止用户选中
              userSelect: 'none', // 禁止文字选中
            }}>
              {title}
            </h3>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 照片墙组件，包含惯性滑动效果
export const Photos = () => {
  const scrollableRef = useRef<HTMLDivElement>(null); // 获取容器引用
  const isDragging = useRef(false); // 标记是否正在拖拽
  const startX = useRef(0); // 记录鼠标按下时的 X 坐标
  const scrollLeft = useRef(0); // 记录容器的初始滚动位置
  const velocity = useRef(0); // 记录滑动的速度

  // 鼠标按下时触发
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollableRef.current!.offsetLeft;
    scrollLeft.current = scrollableRef.current!.scrollLeft;
    velocity.current = 0; // 重置速度
  };

  // 鼠标移动时触发
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return; // 如果没有拖拽，则返回
    const x = e.pageX - scrollableRef.current!.offsetLeft;
    const walk = (x - startX.current) * 0.2; // 拖拽的距离，乘以 2 增强滑动效果
    scrollableRef.current!.scrollLeft = scrollLeft.current - walk;
    velocity.current = walk; // 记录当前速度
  };

  // 鼠标抬起或离开容器时触发，启动惯性滑动
  const handleMouseUpOrLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // 使用 requestAnimationFrame 实现惯性滑动
    const animateInertia = () => {
      if (Math.abs(velocity.current) < 1) return; // 如果速度很小，停止滑动
      scrollableRef.current!.scrollLeft -= velocity.current; // 更新滚动位置
      velocity.current *= 0.95; // 逐渐减小速度，实现减速
      requestAnimationFrame(animateInertia); // 递归调用实现连续动画
    };

    animateInertia(); // 启动惯性滑动动画
  };

  return (
    <ScrollableContainer
      ref={scrollableRef}
      onMouseDown={handleMouseDown} // 监听鼠标按下事件
      onMouseMove={handleMouseMove} // 监听鼠标移动事件
      onMouseUp={handleMouseUpOrLeave} // 监听鼠标抬起事件
      onMouseLeave={handleMouseUpOrLeave} // 监听鼠标离开事件
      onDragStart={(e) => e.preventDefault()} // 禁止容器的拖拽行为
    >
      {travelImages.map((travelImage, index) => (
        <Photo
          key={travelImage.img.src}
          img={travelImage.img}
          title={travelImage.title}
          alt={travelImage.alt}
          idx={index}
        />
      ))}
    </ScrollableContainer>
  );
};

// 样式部分
const ScrollableContainer = styled.div`
  display: flex;
  gap: 16px; // 图片间距
  overflow-x: auto; // 允许水平滚动
  padding: 16px; // 整体容器的内边距
  padding-bottom: 4rem;
  white-space: nowrap; // 禁止图片换行，确保所有图片在同一行
  cursor: grab; // 当鼠标在容器上时显示抓手光标
  &::-webkit-scrollbar {
    display: none; // 隐藏滚动条
  }

  &:active {
    cursor: grabbing; // 当拖动时显示抓取光标
  }
`;
export default Photos;
