import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>Adroad</title>

      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@10.16.0/dist/sweetalert2.min.css" />
      <script defer src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
