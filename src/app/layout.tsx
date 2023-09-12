import { ChakraProvider } from '@chakra-ui/react'
import { bgColors } from '../utils/background-colors'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Geo Quiz</title>
        <link rel="manifest" href="/manifest.json" />
        <link href="/icon_72x72.png" rel="icon" type="image/png" sizes="72x72" />
        <link href="/icon_144x144.png" rel="icon" type="image/png" sizes="144x144" />
        <link rel="apple-touch-icon" href="/icon_192x192.png"></link>
        <meta name="theme-color" content={bgColors.question} />
      </head>
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  )
}
