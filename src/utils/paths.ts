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
    subHref: '/events',
    icon: Presentation,
    label: 'Gerenciar Eventos'
  },
  { href: '/administration/users', icon: User, label: 'Gerenciar Usuarios' },
  {
    href: '/administration/categories',
    icon: Layers2,
    label: 'Gerenciar Categorias'
  }
]

export { menuItems }
