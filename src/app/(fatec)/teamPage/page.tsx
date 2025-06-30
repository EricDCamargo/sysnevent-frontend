import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.css'

interface IMember {
  name: string
  photoUrl: string
  linkedinUrl: string
}

interface ITeamSection {
  title: string
  members: IMember[]
}

const projectAdvisor: IMember = {
  name: 'Sergio Eduardo Lopes Salgado',
  photoUrl: '/teamImages/Sergio_Salgado.jpg',
  linkedinUrl: 'https://www.linkedin.com/in/sergiosalgado-15146a12a/'
}

const teamData: ITeamSection[] = [
  {
    title: 'Desenvolvimento',
    members: [
      {
        name: 'Eric Dellai Camargo',
        photoUrl: '/teamImages/Eric_profile_pic.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/ericdellaicamargo/'
      },
      {
        name: 'Guilherme Francisco Pereira',
        photoUrl: '/teamImages/Guilherme_Pereira.jpg',
        linkedinUrl:
          'https://www.linkedin.com/in/guilherme-francisco-pereira-4a3867283'
      }
    ]
  },
  {
    title: 'QA e Homologação',
    members: [
      {
        name: 'Jose Lucas Martins Gomes',
        photoUrl: '/teamImages/Jose_Gomes.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/jos%C3%A9-martins-702426199/'
      },
      {
        name: 'Cleiton Valentim',
        photoUrl: '/teamImages/profilePlaceHolder.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/cleiton-valentim-3505b915b/'
      },
      {
        name: 'Calebe Sousa de Araujo',
        photoUrl: '/teamImages/Calebe_Araujo.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/calebe-dev'
      }
    ]
  },
  {
    title: 'Documentação',
    members: [
      {
        name: 'Gabriel de Souza Teruel',
        photoUrl: '/teamImages/profilePlaceHolder.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/gabriel-de-souza-teruel/'
      },
      {
        name: 'Jose Carlos Carneiro',
        photoUrl: '/teamImages/profilePlaceHolder.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/jose-carlos-carneiro/'
      },
      {
        name: 'Pamela Candiani Soares',
        photoUrl: '/teamImages/profilePlaceHolder.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/pamela-candiani-soares/'
      },
      {
        name: 'Sarah Beatriz Lima Pina',
        photoUrl: '/teamImages/Sarah_Pina.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/sarahbeatrizlimapina-/'
      },
      {
        name: 'Henrique Amadeu Stoco',
        photoUrl: '/teamImages/profilePlaceHolder.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/henrique-amadeu-stoco/'
      }
    ]
  },
  {
    title: 'Facilitadores',
    members: [
      {
        name: 'Daiane Santos Mota',
        photoUrl: '/teamImages/profilePlaceHolder.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/daiane-santos-mota/'
      },
      {
        name: 'Matheus Jonatha Gomes Prazeres',
        photoUrl: '/teamImages/profilePlaceHolder.jpg',
        linkedinUrl:
          'https://www.linkedin.com/in/matheus-jonatha-gomes-prazeres/'
      }
    ]
  },
  {
    title: 'Projetos',
    members: [
      {
        name: 'Murilo Kloppel',
        photoUrl: '/teamImages/profilePlaceHolder.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/murilo-kloppel/'
      },
      {
        name: 'Thalles Santana da Silva',
        photoUrl: '/teamImages/Thalles_Silva.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/thalles-santana011/'
      },
      {
        name: 'Francisco Carlos Mateus',
        photoUrl: '/teamImages/profilePlaceHolder.jpg',
        linkedinUrl:
          'https://www.linkedin.com/in/francisco-carlos-mateus-a4359735/'
      }
    ]
  },
  {
    title: 'Prototipação e Design',
    members: [
      {
        name: 'Gabrielle Zaccarias',
        photoUrl: '/teamImages/profilePlaceHolder.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/gabrielle-zaccarias/'
      },
      {
        name: 'Ivo Souza Araujo',
        photoUrl: '/teamImages/profilePlaceHolder.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/ivo-souza-araujo/'
      },
      {
        name: 'Katia Cristina Andrade de Cursi Silva',
        photoUrl: '/teamImages/profilePlaceHolder.jpg',
        linkedinUrl:
          'https://www.linkedin.com/in/katia-cristina-andrade-de-cursi-silva/'
      },
      {
        name: 'Lucas Jose Dutra Conchon',
        photoUrl: '/teamImages/Lucas_Conchon.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/lucasjdutra/'
      },
      {
        name: 'Douglas Rodrigues',
        photoUrl: '/teamImages/profilePlaceHolder.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/douglas-rodrigues/'
      }
    ]
  }
]

const MemberCard = ({ member }: { member: IMember }) => (
  <div className={styles.memberCard}>
    <Image
      src={member.photoUrl}
      alt={`Foto de ${member.name}`}
      width={120}
      height={120}
      className={styles.memberPhoto}
    />

    {/* Container para nome + ícone */}
    <div className={styles.memberInfo}>
      <h3 className={styles.memberName}>{member.name}</h3>
      <Link
        href={member.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Perfil de ${member.name} no LinkedIn`}
      >
        <Image
          src="/linkedin.svg"
          alt={`LinkedIn de ${member.name}`}
          width={30}
          height={30}
          className={styles.linkedinIcon}
        />
      </Link>
    </div>
  </div>
)

export default function TeamPage() {
  return (
    <main className={styles.teamContainer}>
      <header className={styles.projectHeader}>
        <h1 className={styles.projectTitle}>SysNevent</h1>
        <p className={styles.projectDescription}>
          Desenvolvido pelos alunos de Análise e Desenvolvimento de Sistemas do
          4º semestre (01/2025) da Fatec Itu, o SysNevent é uma plataforma
          completa para gerenciamento de eventos acadêmicos. O objetivo é
          centralizar e simplificar a divulgação, inscrição e o controle de
          presença, informatizando todo o ciclo de vida de um evento na
          universidade.
        </p>
      </header>

      {/* Seção do Professor Orientador */}
      <section className={styles.teamSection}>
        <h2 className={styles.sectionTitle}>Professor Orientador</h2>
        <div className={styles.advisorWrapper}>
          <MemberCard member={projectAdvisor} />
        </div>
      </section>

      {/* Seções das Equipes */}
      {teamData.map(section => (
        <section key={section.title} className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <div className={styles.membersGrid}>
            {section.members.map(member => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
