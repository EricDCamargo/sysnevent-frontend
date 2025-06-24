import { NextRequest, NextResponse } from 'next/server'
import { getCookieServer } from '@/lib/cookieServer'
import { getUserServer } from './services/retriveSSRData/retriveUserData'
import { ErrorMessages } from './services/errors/AuthTokenErorr'
import { UserRole } from './utils/enums'

const deniedControl: Record<UserRole, string[]> = {
  DOCENT_ASSISTANT: ['/administration/categories', '/administration/users'],
  COORDINATOR: ['/administration/users'],
  ADMIN: []
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/_next') || pathname === '/') {
    return NextResponse.next()
  }

  const isProtected = pathname.startsWith('/administration')
  if (!isProtected) {
    return NextResponse.next()
  }
  const token = await getCookieServer()

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
  // pega as rotas negadas para esse role
  const deniedRoutes = deniedControl[user.role] || []
  const isDenied = deniedRoutes.some(
    blocked => pathname === blocked || pathname.startsWith(`${blocked}/`)
  )

  if (isDenied) {
    return NextResponse.redirect(
      new URL(`/administration?error=${ErrorMessages.UNAUTHORIZED}`, req.url)
    )
  }

  return NextResponse.next()
}
