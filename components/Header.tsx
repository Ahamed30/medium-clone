import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, deleteUser } from 'firebase/auth';
import { firebaseApp } from '../firebase.config';
function Header() {
    
    const firebaseAuth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userName, setUsername] = useState<String | null>(null);
    
    const signIn = async () => {
        // console.log("Helloo");
    
        const { user } = await signInWithPopup(firebaseAuth, provider);
        // console.log(user.displayName);
        const { refreshToken, providerData } = user;
        if(user.displayName){
            setUsername(user.displayName);
            setIsSignedIn(true);
            localStorage.setItem('userName', user.displayName);
        }
        
        localStorage.setItem('user', JSON.stringify(providerData))
        localStorage.setItem('accessToken', JSON.stringify(refreshToken));
        
    }

    const _signOut = () => {
        const auth = getAuth(firebaseApp);
        signOut(auth).then(() => {
            console.log("Signed out successfully");
            setIsSignedIn(false);
        }).catch((error) => {
            // An error happened.
            console.error(error);
        });

    }

    useEffect(() => {
        setIsSignedIn(localStorage.getItem('user') ? true : false);
        setUsername(localStorage.getItem('userName') ? localStorage.getItem('userName'): '');
    },[]);
    return (
        <header className="flex justify-between p-5 max-w-7xl mx-auto">
            <div className="flex items-center space-x-5">
                <Link href='/'>
                    <img
                        className="w-44 object-contain cursor-pointer"
                        src="https://links.papareact.com/yvf"
                        alt=""
                    />
                </Link>
                <div className="hidden md:inline-flex items-center space-x-5">
                    <h3 className="cursor-pointer">About</h3>
                    <h3 className="cursor-pointer">Contact</h3>
                    <h3 className="text-white bg-green-600 px-4 py-1 rounded-full cursor-pointer">Follow</h3>
                </div>
            </div>
            {!isSignedIn?
            <div className="flex items-center space-x-5 text-green-600">
                <h3 className="cursor-pointer" onClick={signIn}>Sign In</h3>
            </div>:
            <div className="flex items-center space-x-5">
                <h3>{userName}</h3>
                <h3 onClick={() => _signOut()} className="pl-5 items-center text-green-600 cursor-pointer">Sign Out</h3>
            </div>
            }
        </header>
    )
}

export default Header