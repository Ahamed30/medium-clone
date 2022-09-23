import React from 'react'

const TitleCard = () => {
  return (
    <div className="flex justify-between items-center bg-yellow-400 border-y-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className='text-6xl max-w-xl  font-serif'>
            <span className='underline decoration-black decoration-4'>Medium</span> is a place to write, read and connect 
          </h1>
          <h2>
            Discover stories, thinking, and expertise from writers on any topic.
          </h2>
        </div>
        <img className="hidden md:inline-flex h-32 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt=""
        ></img>
      </div>
  )
}

export default TitleCard