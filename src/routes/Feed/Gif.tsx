import Image from 'next/image';
import styled from '@emotion/styled';

const MobileGallery: React.FC = () => {
  return (

    <StyledImage
      src="/gallery/nyan-cat-1.gif" // 确保路径正确
      alt="Nyan Cat"
      width={100.8} // 设置图片的宽度
      height={58.28} // 设置图片的高度
      unoptimized // 添加 unoptimized 属性以禁用优化
    />

  );
};


const StyledImage = styled(Image)`
  object-fit: contain; // 确保图片保持原始比例不失真
`;

export default MobileGallery;
