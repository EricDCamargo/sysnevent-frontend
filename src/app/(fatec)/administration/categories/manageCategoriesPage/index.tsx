interface ManageCategoriesPageProps {
  categories: any[]
}

export default function ManageCategoriesPage({
  categories
}: ManageCategoriesPageProps) {
  return (
    <main>
      <h1>Pagina de gerenciamento de categorias</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </main>
  )
}
