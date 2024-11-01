import React, { ReactNode } from 'react'
import { Footer, Subscribe } from './sections';
import  Nav  from './Nav';

const Structure = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative overflow-hidden">
    <Nav />
    <>
      {children}
    </>
    <section className="padding-x sm:py-32 py-16 w-full">
      <Subscribe />
    </section>
    <section className="padding bg-black padding-x padding-y pb-8">
      <Footer/>
    </section>
  </main>
  )
}

export default Structure;