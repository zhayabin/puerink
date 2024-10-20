import { Global as _Global, css, useTheme } from "@emotion/react";
import { ThemeProvider as _ThemeProvider } from "@emotion/react";

export const Global = () => {
  const theme = useTheme();

  return (
    <_Global
      styles={css`
        @font-face {
          font-family: 'Pixel';
          src: url('/pixel.woff2') format('woff2'); // 去掉public前缀
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        body {
          margin: 0;
          padding: 0;
          color: ${theme.colors.gray12};
          background-color: ${theme.colors.gray2};
          font-family:  'Pixel', Arial, sans-serif; // 使用本地Pixel字体
          letter-spacing: 0em; // 调整字间距
        }

        * {
          color-scheme: ${theme.scheme};
          box-sizing: border-box;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          font-weight: inherit;
          font-style: inherit;
        }

        a {
          all: unset;
          cursor: pointer;
        }

        ul {
          padding: 0;
        }

        // init button
        button {
          all: unset;
          cursor: pointer;
        }

        // init input
        input {
          all: unset;
          box-sizing: border-box;
        }

        // init textarea
        textarea {
          border: none;
          background-color: transparent;
          font-family: inherit;
          padding: 0;
          outline: none;
          resize: none;
          color: inherit;
        }

        hr {
          width: 100%;
          border: none;
          margin: 0;
          border-top: 1px solid ${theme.colors.gray6};
        }
      `}
    />
  );
};
