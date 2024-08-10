import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import PagesRotater from "@/components/PagesRotater";
import { ReduxProvider } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Free PDF Page Rotator - Rotate Individual or All Pages</title>
        <meta
          name="description"
          content="Rotate individual or all pages in your PDF effortlessly. No downloads or sign-ups. Fast, secure, and user-friendly. Try now!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <ReduxProvider>
          <PagesRotater />
        </ReduxProvider>
      </main>
    </>
  );
}
