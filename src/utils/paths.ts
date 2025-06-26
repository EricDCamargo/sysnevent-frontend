import { Image, Layers2, LucideProps, Presentation, User } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

export interface MenuItemsProps {
  href: string
  subHref?: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  label: string
}

const menuItems: MenuItemsProps[] = [
  {
    href: '/administration',
    subHref: '/administration/events',
    icon: Presentation,
    label: 'Gerenciar Eventos'
  },

  {
    href: '/administration/banners',
    subHref: '/administration/banners',
    icon: Image,
    label: 'Gerenciar Baners'
  },

  {
    href: '/administration/categories',
    subHref: '/administration/categories',
    icon: Layers2,
    label: 'Gerenciar Categorias'
  },
  {
    href: '/administration/users',
    subHref: '/administration/users',
    icon: User,
    label: 'Gerenciar Usuários'
  }
]

export { menuItems }
