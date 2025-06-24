import { Layers2, Logs, LucideProps, Presentation, User } from 'lucide-react'
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
    href: '/administration/categories',
    subHref: '/administration/categories',
    icon: Layers2,
    label: 'Categorias'
  },
  {
    href: '/administration/users',
    subHref: '/administration/users',
    icon: User,
    label: 'Usuários'
  }
]

export { menuItems }
