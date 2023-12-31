'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const isUserLoggedIn = true;
    const [ providers, setProviders ] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false)
    useEffect(()=>{
        const setProviders = async ()=>{
            const response = await getProviders()
            setProviders(response)
        }
        setProviders();
    }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex flex-center gap-2">
            <Image src="/assets/images/logo.svg" className='object-contain' alt='Logo' width={30} height={30}/>
            <p className="logo_text">PromptMania</p>
        </Link>
        {/* {Desktop Navigation} */}
        <div className="sm:flex hidden">
            {isUserLoggedIn?(
                <div className="flex gap-3 md:gap-5">
                    <Link className="black_btn" href="/create-prompt">Create Post</Link>
                    <button type="button" className='outline_btn' onClick={signOut}>SignOut</button>
                    <Link href="/profile">
                        <Image className="rounded-full" width={37} height={37} src="/assets/images/logo.svg" />
                    </Link>
                </div>
            ):(
                <>
                    {providers && Object.values(providers).map((provider)=>(
                        <button type="button" key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn'>
                            SignIn
                        </button>
                    ))}
                </>
            )}
        </div>
        {/* {Mobile Navigation} */}
        <div className="sm:hidden flex relative">
            {isUserLoggedIn?(
                <div className="flex gap-3 md:gap-5">
                    {/* <Link className="black_btn" href="/create-prompt">Create Post</Link>
                    <button type="button" className='outline_btn' onClick={signOut}>SignOut</button> */}
                    <Image className="rounded-full" width={37} height={37} src="/assets/images/logo.svg" onClick={()=>{setToggleDropdown((prev)=>!prev)}} />
                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link className="dropdown_link" href="/profile" onClick={()=>{setToggleDropdown(false)}}>
                                My Profile
                            </Link>
                            <Link className="dropdown_link" href="/create-prompt" onClick={()=>{setToggleDropdown(false)}}>
                                Create Prompt
                            </Link>
                            <button type="button" className='mt-5 w-full black_btn' onClick={()=>{setToggleDropdown(false);signOut();}}>SignOut</button>
                        </div>
                    )}
                </div>
            ):(
                <>
                    {providers && Object.values(providers).map((provider)=>(
                        <button type="button" key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn'>
                            SignIn
                        </button>
                    ))}
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav