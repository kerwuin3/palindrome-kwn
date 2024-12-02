import Head from "next/head";
import Palindrome from './palindrome'

export default function Home() {
  return (
    <>
      <Head>
        <title>Palindrome</title>
        <meta name="description" content="Palindrome create by kwn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Palindrome />
    </>    
  );
}