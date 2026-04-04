import localFont from 'next/font/local'

export const druk = localFont({
  src: [
    {
      path: '../public/fonts/Druk-Medium-Trial.woff2',
      weight: '500',
      style: 'normal',
    },
     {
      path: '../public/fonts/Druk-Medium-Trial.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Druk-Bold-Trial.woff2',
      weight: '700',
      style: 'normal',
    },
     {
      path: '../public/fonts/Druk-Heavy-Trial.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-druk',
})