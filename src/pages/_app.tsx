import { AppProps } from "next/app";
import { Theme } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme accentColor="mint" appearance="dark">
        <Component {...pageProps} />
    </Theme>
  );
}

export default MyApp;
