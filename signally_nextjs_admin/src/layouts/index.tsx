import { ReactNode } from 'react';
import LayoutMain from './layout_admin/LayoutAdmin';

type Props = {
  children: ReactNode;
  variant?: 'logoOnly' | 'admin';
};

export default function Layout({ children, variant = 'admin' }: Props) {
  if (variant === 'admin') return <LayoutMain>{children}</LayoutMain>;
  return <LayoutMain>{children}</LayoutMain>;
}
