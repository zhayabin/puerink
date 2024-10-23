import Document, { Html, Head, Main, NextScript } from "next/document";
import { CONFIG } from "site.config";

class MyDocument extends Document {
  render() {
    return (
      <Html lang={CONFIG.lang}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/apple-touch-icon.png"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS 2.0"
            href="/feed"
          />
          {/* google search console */}
          {CONFIG.googleSearchConsole.enable && (
            <meta
              name="google-site-verification"
              content={CONFIG.googleSearchConsole.config.siteVerification}
            />
          )}
          {/* naver search advisor */}
          {CONFIG.naverSearchAdvisor.enable && (
            <meta
              name="naver-site-verification"
              content={CONFIG.naverSearchAdvisor.config.siteVerification}
            />
          )}
          {/* Twikoo script */}
<<<<<<< HEAD
          <script src="/twikoo.min.js" defer></script> {/* 修改为本地路径 */}
=======
          <script src="/waline.js" defer></script> {/* 修改为本地路径 */}
>>>>>>> af156cbb68124db3cf7846f159eb83e77ec6aa11
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
