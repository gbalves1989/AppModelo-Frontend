import Head from 'next/head'
import { useRouter } from 'next/router'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { toast } from 'react-toastify'

import { Footer } from '../../components/Footer'
import { NavBar } from '../../components/NavBar'
import { SideBar } from '../../components/SideBar'
import { Button } from '../../components/Button'

type BookEntity = {
  id: string
  title: string
  year: string
  Author: {
    id: string
    name: string
    avatar: string
    createdAt: string
    updatedAt: string
    userId: string
  }
  Publisher: {
    id: string
    name: string
    createdAt: string
    updatedAt: string
    userId: string
  }
}

interface IBook {
  book: BookEntity
}

export default function Book({ book }: IBook) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [publisherName, setPublisherName] = useState('')
  const [loading, setLoading] = useState(false)
  const apiClient = setupAPIClient()

  useEffect(() => {
    getBook()
  }, [])

  async function getBook() {
    const response = await apiClient.get(`/api/v1/books/${router.query.id}`)
    book = response.data
    setTitle(book.title)
    setYear(book.year)
    setAuthorName(book.Author.name)
    setPublisherName(book.Publisher.name)
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()

    setLoading(true)

    if (title === '' || year === '') {
      setLoading(false)
      toast.error('Preencha os campos corretamente.')
      return
    }

    await apiClient.patch(`/api/v1/books/${router.query.id}`, { title, year })
    toast.success('Autor atualizado com sucesso.')
    await getBook()
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>ModeloApp | Livro</title>
      </Head>

      <div className="container-fluid position-relative d-flex p-0">
        <SideBar />

        <div className="content">
          <NavBar />

          <div className="col-sm-12 col-xl-8" style={{ padding: 30 }}>
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Edição do Livro</h6>

              <form onSubmit={handleUpdate}>
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
                  <label for="author" className="form-label">
                    Autor
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="author"
                    value={authorName}
                    disabled={true}
                  />
                </div>

                <div className="mb-3">
                  <label for="publisher" className="form-label">
                    Editora
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="publisher"
                    value={publisherName}
                    disabled={true}
                  />
                </div>

                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  color="btn-danger"
                >
                  Atualizar
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
  return {
    props: {},
  }
})
