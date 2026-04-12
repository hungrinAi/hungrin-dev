import { User, Settings, CreditCard, Tag, HelpCircle } from 'lucide-react';
import type { ElementType } from 'react';

export interface AccountMenuItem {
  icon: ElementType;
  label: string;
  href: string;
}

export const ACCOUNT_MENU_ITEMS: AccountMenuItem[] = [
  { icon: User,       label: 'My Account', href: '/settings/account' },
  { icon: Settings,   label: 'Settings',   href: '/settings' },
  { icon: CreditCard, label: 'Billing',    href: '/billing' },
  { icon: Tag,        label: 'Pricing',    href: '/pricing' },
  { icon: HelpCircle, label: 'Support',    href: '/support' },
];
