'use client';

import Image from 'next/image';
import React from 'react';
import { NavItem } from './nav-item';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { MobileNav } from '../../src/components/MobileNav';
import Link from 'next/link';
import { headerLogo } from "@/assets/images";
import { useSession, signOut } from "next-auth/react";

import { navItems } from '@/assets/constants';

export const Header = () => {
  const { data: session, status } = useSession();

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="flex items-center justify-between px-4 py-2 md:px-24 md:py-7">
      <Image
        src={headerLogo}
        alt="Logo" width={80} height={80}
      />

      <div className="hidden items-center md:flex">
        {navItems.map((item) => (
          <NavItem key={item.label} title={item.label} href={item.href} />
        ))}

        <div className="ml-10 flex gap-2">
          {status === "authenticated" ? (
            <div className="flex items-center gap-4">
              {/* Display profile picture */}
              {session.user?.image ? (
                <Image
                  src={session.user.image || '/default-avatar.png'}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border border-border"
                />
              ) : (
                <div className="flex items-center justify-center rounded-full outline w-[40px] h-[40px] font-semibold text-center text-black bg-white">
                  <span className="space-x-2">
                    {session.user?.name ? `${session.user.name[0]} ${session.user.name[1]}` : 'U'}
                  </span>
                </div>
              )}
              {/* Sign Out Button */}
              <Button
                onClick={() => signOut()}
                className="h-[33px] border border-border text-primary"
                variant={'outline'}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              {/* Show Login and Sign Up buttons if not authenticated */}
              <Link href="/login">
                <Button
                  className="h-[33px] border border-border text-primary"
                  variant={'outline'}
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

      <Button
        variant={'ghost'}
        size={'icon'}
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={20} />
      </Button>
      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};
