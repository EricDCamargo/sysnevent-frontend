import { NextRequest, NextResponse } from 'next/server'
import { getCookieServer } from '@/lib/cookieServer'
import { getUserServer } from './services/retriveSSRData/retriveUserData'
import { ErrorMessages } from './services/errors/AuthTokenErorr'
import { UserRole } from './utils/enums'

const protectedRoutesForUser = ['/administration']
const protectedRoutesForAdmin = [
  '/administration/users',
  '/administration/categories'
]

const roles: UserRole[] = [
  UserRole.DOCENT_ASSISTANT,
  UserRole.COORDINATOR,
  UserRole.ADMIN
]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/_next') || pathname === '/') {
    return NextResponse.next()
  }

  const token = await getCookieServer()

  if (pathname.startsWith('/administration')) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`/?error=${ErrorMessages.TOKEN_EXPIRED}`, req.url)
      )
    }

    const user = await getUserServer()

    if (!user || !user.id) {
      return NextResponse.redirect(
        new URL(`/?error=${ErrorMessages.SERVICE_UNAVAILABLE}`, req.url)
      )
    }
    if (
      !roles.includes(user.role) &&
      protectedRoutesForUser.includes(pathname)
    ) {
      return NextResponse.redirect(
        new URL(`/?error=${ErrorMessages.UNAUTHORIZED}`, req.url)
      )
    }
    if (
      user.role !== UserRole.ADMIN &&
      protectedRoutesForAdmin.includes(pathname)
    ) {
      return NextResponse.redirect(
        new URL(`/?error=${ErrorMessages.UNAUTHORIZED}`, req.url)
      )
    }
  }

  return NextResponse.next()
}
