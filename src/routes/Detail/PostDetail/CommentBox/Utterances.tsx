import { CONFIG } from "site.config";
import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import useScheme from "src/hooks/useScheme";
import { useRouter } from "next/router";

type Props = {
  issueTerm: string;
};

const Utterances: React.FC<Props> = ({ issueTerm }) => {
  const [scheme] = useScheme();
  const router = useRouter();
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const theme = `github-${scheme}`;
    const script = document.createElement("script");

    // 确保 commentsRef.current 不为 null
    if (commentsRef.current === null) return;

    // 清空之前的内容
    commentsRef.current.innerHTML = "";

    // 设置 Utterances 配置
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("issue-term", issueTerm);
    script.setAttribute("theme", theme);
    const config: Record<string, string> = CONFIG.utterances.config;
    Object.keys(config).forEach((key) => {
      script.setAttribute(key, config[key]);
    });

    commentsRef.current.appendChild(script);

    // 监听 iframe 的消息事件，调整高度
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://utteranc.es") return;
      const { type, height } = event.data;
      if (type === "resize" && commentsRef.current) {
        commentsRef.current.style.height = `${height}px`;
      }
    };

    window.addEventListener("message", handleMessage);

    // 使用局部变量来存储 commentsRef.current 的值
    const currentRef = commentsRef.current;

    return () => {
      window.removeEventListener("message", handleMessage);
      if (currentRef) {
        currentRef.innerHTML = "";
      }
    };
  }, [scheme, router, issueTerm]);

  return (
    <StyledWrapper>
      <div id="comments" ref={commentsRef} />
    </StyledWrapper>
  );
};

export default Utterances;

const StyledWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 768px) {
    margin-left: 2rem;
  }
`;
