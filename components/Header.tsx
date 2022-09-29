import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { firebaseApp } from '../firebase.config';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store';
import { authActions } from '../store/auth-slice';

function Header() {
    const userData = useSelector((state: RootState) => state.auth);
    const userName = userData.username;
    const isSignedIn = userData.isSignedIn;
    const dispatch = useDispatch();
    const firebaseAuth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    const [ modalOpen, setModalOpen ] = useState(false);
    
    const signIn = async () => {
        const { user } = await signInWithPopup(firebaseAuth, provider);
        const { refreshToken, providerData } = user;
        if(user.displayName){
            dispatch(authActions.signIn(user.displayName));
            localStorage.setItem('userName', user.displayName);
        }
        localStorage.setItem('user', JSON.stringify(providerData))
        localStorage.setItem('accessToken', JSON.stringify(refreshToken));
    }

    const signOutFromSite = () => {
        const auth = getAuth(firebaseApp);
        signOut(auth).then(() => {
            console.log("Signed out successfully");
            dispatch(authActions.signOut());
            setModalOpen(false);
            localStorage.clear();
        }).catch((error) => {
            // An error happened.
            console.error(error);
            setModalOpen(false);
        });

    }

    useEffect(() => {
        if(localStorage.getItem('user')) dispatch(authActions.signIn(localStorage.getItem('userName')));
    },[]);
    return (
        <div>
            <header className="flex justify-between p-5 max-w-7xl mx-auto">
                <div className="flex items-center space-x-5">
                    <Link href='/'>
                        <img
                            className="w-44 object-contain cursor-pointer"
                            src="https://links.papareact.com/yvf"
                            alt=""
                        />
                    </Link>
                </div>
                {!isSignedIn?
                <div className="flex items-center space-x-5 text-green-600">
                    <h3 className="cursor-pointer" onClick={signIn}>Sign In</h3>
                </div>:
                <div className="flex items-center space-x-3">
                    <h3 className="text-sm md:text-base">{userName}</h3>
                    <h3 onClick={() => setModalOpen(true)} className="text-green-600 cursor-pointer">Sign Out</h3>
                </div>}
                {modalOpen ? 
                    <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-2 max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Sign Out
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setModalOpen(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                                </span>
                            </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                            <div className="my-4 text-slate-500 text-lg leading-relaxed">
                                Are you sure, you want to sign out?
                            </div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setModalOpen(false)}
                            >
                                No
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => signOutFromSite()}
                            >
                                Yes
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
                : null}
            </header>
        </div>
    )
}

export default Header