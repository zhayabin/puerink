import { AppPropsWithLayout } from "../types";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { RootLayout } from "src/layouts";
import { queryClient } from "src/libs/react-query";
<<<<<<< HEAD
=======
import 'src/styles/waline.css'; // 引入 waline.css 到全局

>>>>>>> af156cbb68124db3cf7846f159eb83e77ec6aa11

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default App;
