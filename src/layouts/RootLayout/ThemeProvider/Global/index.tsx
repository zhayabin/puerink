import { Global as _Global, css, useTheme } from "@emotion/react"
import { ThemeProvider as _ThemeProvider } from "@emotion/react"

export const Global = () => {
  const theme = useTheme()

  return (
    <_Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=Source+Han+Sans:wght@400;500;600;700&display=swap');

        body {
          margin: 0;
          padding: 0;
          color: ${theme.colors.gray12};
          background-color: ${theme.colors.gray1};
          font-family: 'Source Han Sans', Arial, sans-serif; // 替换为思源字体
          letter-spacing: 0.07em; // 调整字间距
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
  )
}
