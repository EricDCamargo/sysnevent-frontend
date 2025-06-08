import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import { Button } from '@/app/_components/button'

interface AuthPageProps {
  children: React.ReactNode
}
interface AuthPageSubcomponents {
  Title: React.FC<{ children: React.ReactNode }>
  Form: React.FC<{
    children: React.ReactNode
    props: React.FormHTMLAttributes<HTMLFormElement>
  }>
  Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>>
  Link: React.FC<{ href: string; children: React.ReactNode }>
}

const AuthPage: React.FC<AuthPageProps> & AuthPageSubcomponents = ({
  children
}) => {
  return (
    <div className={styles.containerCenter}>
      <section className={styles.logoSide}>
        <Image
          className={styles.logo}
          src="/logo.png"
          alt="Fatec"
          width={260}
          height={260}
        />
      </section>
      <section className={styles.login}>{children}</section>
    </div>
  )
}

AuthPage.Title = function Title({ children }: { children: React.ReactNode }) {
  return <h1>{children}</h1>
}

AuthPage.Form = function Form({
  children,
  props
}: {
  children: React.ReactNode
  props: React.FormHTMLAttributes<HTMLFormElement>
}) {
  return (
    <form className={styles.form} {...props}>
      {children}
      <Button name="Enviar" type="submit" />
    </form>
  )
}
AuthPage.Input = function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return <input className={styles.input} {...props} />
}

AuthPage.Link = function AuthLink({
  href,
  children
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className={styles.text}>
      {children}
    </Link>
  )
}

export default AuthPage
