'use client'
import { useRouter } from 'next/navigation'
import styles from './Footer.module.css'

export const Footer = () => {
  const router = useRouter()
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <div>
            <p>
              <strong>Contatos</strong>
            </p>
            <p>Fatecitu@gmail.com</p>
            <p>(11) 4013 –1872</p>
            <p>(99) 8765-4321</p>
          </div>
          <div>
            <p>
              <strong>Ajuda</strong>
            </p>
            <p>Fale conosco</p>
            <p>Termos de Serviço</p>
            <p>Política de Privacidade</p>
          </div>
        </div>

        <div className={styles.footerRight}>
          <img
            src="/logo_SP.svg"
            alt="São Paulo Governo"
            width={150}
            className={styles.cpsLogo}
            onClick={() => router.push('/auth/signin')}
          />
          <p>Centro Paula Souza - Faculdade de Tecnologia de Itu (FATEC Itu)</p>
          <p>
            Sistema desenvolvido pela turma de ADS do 4º semestre da Fatec Itu (2025)
          </p>
        </div>
      </div>
    </footer>
  )
}
