import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <style>
          {`@import url(https://fonts.googleapis.com/css?family=Quicksand:300,500,400,600|Inter:300,400,600|Epilogue:500,400|Poppins:400,var(--body-caption-s-regular-font-weight));`}
        </style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}