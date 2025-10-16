import React from 'react'

const Hero = () => {
  return (
      <div className='flex flex-col md:flex-row justify-between items-center bg-base-200 rounded-lg shadow-lg p-10 m-10'>
        <main className="p-8 ">
        <h1 className="text-2xl font-bold italic justify-center h-full items-center ">Welcome to PeoplePulse</h1>
        <button className="btn rounded-3xl btn-primary ">Learn More</button>
      </main>
    </div>
  )
}

export default Hero