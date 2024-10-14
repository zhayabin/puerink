declare module 'prismjs/components/prism-*.js';
declare module 'prismjs/prism';
// global.d.ts
declare global {
    interface Window {
      gtag: (...args: any[]) => void; // 声明 gtag 方法，参数类型可以根据需要调整
    }
  }

  // 确保这个文件是一个模块
  export {};
