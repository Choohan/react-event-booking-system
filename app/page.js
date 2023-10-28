'use client'
import * as React from 'react'
import { useAuthContext } from './hooks/useAuthContext'
import Herobanner from './components/home/herobanner'
import HomeListing from './components/home/home-listing'


export default function ColumnsGrid() {

  const { user, authIsReady } = useAuthContext()

  return (

    <>
      {authIsReady && (
        <>
          <Herobanner />
          <HomeListing />
        </>
      )}
    </>

  );
}