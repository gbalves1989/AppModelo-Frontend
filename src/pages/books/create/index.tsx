import Head from 'next/head'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { setupAPIClient } from '../../../services/api'
import { canSSRAuth } from '../../../utils/canSSRAuth'

import { Footer } from '../../../components/Footer'
import { NavBar } from '../../../components/NavBar'
import { SideBar } from '../../../components/SideBar'
import { Button } from '../../../components/Button'

type AuthorEntity = {
  id: string
  name: string
  avatar: string
  Books: []
}

type PublisherEntity = {
  id: string
  name: string
  Books: []
}

interface IBook {
  authors: AuthorEntity[]
  publishers: PublisherEntity[]
}

export default function Create({ authors, publishers }: IBook) {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [publisherId, setPublisherId] = useState('')
  const apiClient = setupAPIClient()

  async function handleCreate() {
    if (title === '' || year === '' || authorId === '' || publisherId === '') {
      toast.error('Preencha os campos corretamente.')
      return
    }

    setLoading(true)

    await apiClient.post(`/api/v1/books`, {
      title,
      year,
      authorId,
      publisherId,
    })
    toast.success('Livro criado com sucesso.')
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>ModeloApp | Novo Livro</title>
      </Head>

      <div className="container-fluid position-relative d-flex p-0">
        <SideBar />

        <div className="content">
          <NavBar />

          <div className="col-sm-12 col-xl-8" style={{ padding: 30 }}>
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Adicionar Livro</h6>

              <form onSubmit={handleCreate}>
                <div className="mb-3">
                  <label for="title" className="form-label">
                    Título do Livro
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label for="year" className="form-label">
                    Ano do Livro
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="year"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label for="authors" className="form-label">
                    Autor
                  </label>

                  <select
                    id="authors"
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    value={authorId}
                    onChange={e => setAuthorId(e.target.value)}
                  >
                    <option selected>Selecione um autor</option>
                    {authors.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label for="publishers" className="form-label">
                    Editora
                  </label>

                  <select
                    id="publishers"
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    value={publisherId}
                    onChange={e => setPublisherId(e.target.value)}
                  >
                    <option selected>Selecione uma editora</option>
                    {publishers.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  color="btn-danger"
                >
                  Salvar
                </Button>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const responseAuthors = await apiClient.get('/api/v1/authors')
  const responsePublishers = await apiClient.get('/api/v1/publishers')

  return {
    props: {
      authors: responseAuthors.data,
      publishers: responsePublishers.data,
    },
  }
})
