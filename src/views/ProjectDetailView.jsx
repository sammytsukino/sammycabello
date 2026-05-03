import { useParams } from 'react-router-dom'

export function ProjectDetailView() {
  const { slug } = useParams()

  return (
    <main>
      <h1>Detalle de proyecto</h1>
      <p>Slug: {slug ?? '—'}</p>
    </main>
  )
}
