import { User, CreditCard, Tag, HelpCircle, GitMerge } from 'lucide-react';
import type { ElementType } from 'react';

export interface AccountMenuItem {
  icon: ElementType;
  label: string;
  href: string;
}

export const ACCOUNT_MENU_ITEMS: AccountMenuItem[] = [
  { icon: User,      label: 'My Account',         href: '/settings/account' },
  { icon: CreditCard,label: 'Billing',             href: '/billing' },
  { icon: Tag,       label: 'Pricing',             href: '/pricing' },
  { icon: HelpCircle,label: 'Support',             href: '/support' },
  { icon: GitMerge,  label: 'Linked Restaurants',  href: '/settings/linked-restaurants' },
];
