'use client';

import { motion, Variants } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { navItems } from '@/assets/constants';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const itemVariants: Variants | undefined = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
};

// const navItems = [
//   { label: 'Product', href: '/' },
//   { label: 'Pricing', href: '/' },
//   { label: 'API Docs', href: 'http://34.208.225.113:8000/docs' },
// ];

export const MobileNav = ({ isOpen, setIsOpen }: Props) => {
  return (
    <motion.nav
      variants={{
        open: {
          clipPath: 'circle(141.4% at 100% 0)',
          transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.7,
            delayChildren: 0.3,
            staggerChildren: 0.05,
          },
        },
        closed: {
          clipPath: 'circle(0.0% at 100% 0)',
          transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.3,
          },
        },
      }}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      className="fixed inset-0 z-20 h-screen bg-white px-6 pt-[92px] transition-transform"
    >
      <motion.button
        whileHover={{ rotate: [0, 90] }}
        className="absolute right-3 top-3 cursor-pointer lg:hidden"
        onClick={() => setIsOpen(false)}
      >
        <X className="size-6" />
      </motion.button>
      <motion.ul className="flex flex-col text-xl font-medium text-gray-200">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            name={item.label}
            link={item.href}
            isExternal={item.href.startsWith('http')}
          />
        ))}

        <NavItem name="Log In" link="/login" />
        <NavItem name="Sign Up" link="/register" />
      </motion.ul>
    </motion.nav>
  );
};

type NavItemProps = {
  name: string;
  link: string;
  active?: boolean;
  isExternal?: boolean;
};

function NavItem({ name, link, active, isExternal }: NavItemProps) {
  return (
    <motion.li variants={itemVariants} className="border-b py-8">
      <Link
        href={link}
        className={active ? 'text-primary' : 'text-primary'}
        target={isExternal ? '_blank' : undefined}
      >
        {name}
      </Link>
    </motion.li>
  );
}
