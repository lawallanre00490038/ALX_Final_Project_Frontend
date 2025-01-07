'use client';

import React, { useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, ShoppingCart } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { headerLogo } from '@/assets/images';
import { navItems } from '@/assets/constants';
import { NavItem } from './nav-item';
import { Button } from './ui/button';
import { MobileNav } from '../../src/components/MobileNav';
import { useCart } from '@/context/CartContext';

export const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const { cart } = useCart(); // Access the cart context
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <header className="flex items-center justify-between px-4 py-2 md:px-24 md:py-7">
      {/* Logo */}
      <Link href="/">
        <Image src={headerLogo} alt="Logo" width={80} height={80} />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center">
        {navItems.map((item) => (
          <NavItem key={item.label} title={item.label} href={item.href} />
        ))}

         {/* Cart Icon */}
         <Link href="/cart" className="relative flex items-center ml-4">
            <ShoppingCart className="w-6 h-6 text-primary" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cart.length}
              </span>
            )}
          </Link>

        <div className="ml-10 flex gap-2 items-center">
          {status === 'authenticated' ? (
            <div className="flex items-center gap-4">
              {/* User Profile Picture */}
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border border-border"
                />
              ) : (
                <div className="flex items-center justify-center rounded-full w-[40px] h-[40px] bg-white text-black font-semibold">
                  {session.user?.name?.[0]}
                </div>
              )}
              {/* Sign Out Button */}
              <Button
                onClick={() => signOut()}
                className="h-[33px] border border-border text-primary"
                variant="outline"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              {/* Login and Sign Up for Unauthenticated Users */}
              <Link href="/login">
                <Button
                  className="h-[33px] border border-border text-primary"
                  variant="outline"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="h-[33px]">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={handleToggle}
      >
        <Menu size={20} />
      </Button>

      {/* Mobile Navigation Drawer */}
      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};






// 'use client';

// import Image from 'next/image';
// import React from 'react';
// import { NavItem } from './nav-item';
// import { Button } from './ui/button';
// import { Menu } from 'lucide-react';
// import { MobileNav } from '../../src/components/MobileNav';
// import Link from 'next/link';
// import { headerLogo } from "@/assets/images";
// import { useSession, signOut } from "next-auth/react";

// import { navItems } from '@/assets/constants';

// export const Header = () => {
//   const { data: session, status } = useSession();

//   const [isOpen, setIsOpen] = React.useState(false);

//   return (
//     <header className="flex items-center justify-between px-4 py-2 md:px-24 md:py-7">
//       <Image
//         src={headerLogo}
//         alt="Logo" width={80} height={80}
//       />

//       <div className="hidden items-center md:flex">
//         {navItems.map((item) => (
//           <NavItem key={item.label} title={item.label} href={item.href} />
//         ))}

//         <div className="ml-10 flex gap-2">
//           {status === "authenticated" ? (
//             <div className="flex items-center gap-4">
//               {/* Display profile picture */}
//               {session.user?.image ? (
//                 <Image
//                   src={session.user.image || '/default-avatar.png'}
//                   alt="Profile"
//                   width={40}
//                   height={40}
//                   className="rounded-full border border-border"
//                 />
//               ) : (
//                 <div className="flex items-center justify-center rounded-full outline w-[40px] h-[40px] font-semibold text-center text-black bg-white">
//                   <span className="space-x-2">
//                     {session.user?.name ? `${session.user.name[0]} ${session.user.name[1]}` : 'U'}
//                   </span>
//                 </div>
//               )}
//               {/* Sign Out Button */}
//               <Button
//                 onClick={() => signOut()}
//                 className="h-[33px] border border-border text-primary"
//                 variant={'outline'}
//               >
//                 Sign Out
//               </Button>
//             </div>
//           ) : (
//             <>
//               {/* Show Login and Sign Up buttons if not authenticated */}
//               <Link href="/login">
//                 <Button
//                   className="h-[33px] border border-border text-primary"
//                   variant={'outline'}
//                 >
//                   Log In
//                 </Button>
//               </Link>

//               <Link href="/signup">
//                 <Button className="h-[33px]">Sign Up</Button>
//               </Link>
//             </>
//           )}
//         </div>
//       </div>

//       <Button
//         variant={'ghost'}
//         size={'icon'}
//         className="md:hidden"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <Menu size={20} />
//       </Button>

      
//       <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
//     </header>
//   );
// };


