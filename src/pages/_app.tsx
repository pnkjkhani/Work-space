import { AppProps } from "next/app";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ClerkProvider>
      <Theme accentColor="mint" appearance="dark">
        {/* <SignedIn>
          <UserButton />
        </SignedIn> */}
        <Component {...pageProps} />
      </Theme>
    //</ClerkProvider>
  );
}

export default MyApp;
