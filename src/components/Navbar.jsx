"use client"
import Link from "next/link";
import logo from "@/app/assets/logo.png";
import profile from "@/app/assets/profile.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signOut, signIn, getProviders } from "next-auth/react";

const Navbar = () => {

  // en esta variable se simula que el ususario esta logeado
  const isUserLoggedIn = true;

  // con este hook estamos alamcenando y modificando el estado de providers
  const [providers, setProviders] = useState(null);

  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setProviders();
  },[]);

  //

  return (
    <nav className="flex justify-between w-full pt-6 bg-zinc-800">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={logo}
          alt="logo"
          width={50}
          height={50}
          className="object-contain ml-8 mb-8"
        />
        <p className="logo_text mt-2">opiniON</p>
      </Link>

      {/* Desktop navigation */}

      <div className="max-sm:hidden">
        {isUserLoggedIn ? (
          // si el usuarion esta logeado mostrar estos links
          // en caso no este logeado mostrara la otra condicion
          
            <div className="flex gap-3 md:gap-5 mr-6">

              <Link href="/create-post" className="black_btn">
                Create Post
              </Link>

              <button
                type="button"
                onClick={signOut}
                className="outline_btn"
              >
                Sign Out
              </button>

              <Link href="/profile">
                <Image
                  src={profile}
                  alt="profile"
                  width={50}
                  height={50}
                  className="object-contain rounded-full"
                />
              </Link>
            </div>

        ) : (
          <>
            {providers && 
              object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              )
              )
            }
          </>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src={profile}
              alt="profile"
              width={50}
              height={50}
              className="object-contain rounded-full mb-12 mr-4"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My profile
                </Link>
                <Link
                  href="/create-post"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => { setToggleDropdown(false); signOut(); }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ):(
          <>
            {providers && 
              object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              )
              )
            }
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
