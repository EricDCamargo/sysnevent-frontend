import { Logs, LucideProps } from 'lucide-react'
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
    subHref: '/detailManageEvents',
    icon: Logs,
    label: 'Gerenciar Eventos'
  },
  { href: '/administration/users', icon: Logs, label: 'Gerenciar Usuarios' },
  {
    href: '/administration/categories',
    icon: Logs,
    label: 'Gerenciar Categorias'
  }
]

export { menuItems }
