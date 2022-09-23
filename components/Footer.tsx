import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>
        <hr />
        <div className="flex items-center justify-center">
            <Link href='/'>
                <img 
                    className="h-20 w-44 object-contain cursor-pointer" 
                    src="https://links.papareact.com/yvf"
                    alt=""
                />
            </Link>
        </div>
        <div className="flex items-center justify-center">
            <p className="text-sm font-serif p-3 underline cursor-pointer">Terms</p>
            <p className="text-sm font-serif p-3 underline cursor-pointer">Privacy</p>
            <p className="text-sm font-serif p-3 underline cursor-pointer">Help</p>
        </div>
    </div>
    
  )
}

export default Footer