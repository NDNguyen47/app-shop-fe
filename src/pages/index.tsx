'use client'
import Head from 'next/head'
// import Button from '@mui/material/Button'
// import axios from 'axios'
// import { useEffect } from 'react'
import { useTheme } from '@emotion/react'
import { useSettings } from 'src/hooks/useSettings'


export default function Home() {

  const theme = useTheme()
  const { settings } = useSettings()
  console.log("theme", { theme, settings })

  return (
    <>
      <Head>
        <title>NGUYENDUCTUAN</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </>
  )
}
