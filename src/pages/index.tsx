import Head from "next/head";
import Image from "next/image";
import Button from "@/components/button";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Link href="/custom">
          <Button className="bg-red-700 text-white hover:bg-[white] border hover:border-red-500 hover:text-black animate-pulse">Enter site</Button>
        </Link>
      </main>
    </>
  );
}

export default Home;