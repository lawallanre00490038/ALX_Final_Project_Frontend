import Link from 'next/link';
import React from 'react';

type Props = {
  title: string;
  href: string;
  isExternal?: boolean;
};

export const NavItem = ({ href, title, isExternal }: Props) => {
  return (
    <Link
      href={href}
      className="inline-flex h-[33px] items-center rounded-lg px-3 py-1 font-medium text-foreground hover:bg-gray-200"
      target={isExternal ? '_blank' : undefined}
    >
      {title}
    </Link>
  );
};
