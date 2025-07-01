import styles from './Footer.module.css'
import Link from 'next/link'

export const Footer = () => {
  const contacts = process.env.NEXT_PUBLIC_CONTACTS?.split(',') || []
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <div>
            <p>
              <strong>Contatos</strong>
            </p>
            {contacts.map((contact, index) => (
              <p key={index}>{contact}</p>
            ))}
          </div>
          <div>
            <p>
              <strong>Ajuda</strong>
            </p>

            <Link
              href={
                'https://drive.google.com/file/d/1iJiN_woo8w74OHqk_XwA8CMX9CypCk5f/view?usp=sharing'
              }
              target="_blank"
              rel="noopener noreferrer"
              className={styles.termsLink}
            >
              <p>Termos de Serviço</p>
              <p>Política de Privacidade</p>
            </Link>
          </div>
        </div>

        <div className={styles.footerRight}>
          <img src="/logo_SP.svg" alt="São Paulo Governo" width={150} />

          <p>Centro Paula Souza - Faculdade de Tecnologia de Itu - Fatec Itu</p>
          <p>
            Sistema desenvolvido pela turma de ADS do 4º semestre da Fatec Itu
            (2025)
          </p>
        </div>
      </div>
    </footer>
  )
}
