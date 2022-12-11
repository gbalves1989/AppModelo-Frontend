import Head from 'next/head'
import Link from 'next/link'

import { Button } from '../../components/Button'
import { Footer } from '../../components/Footer'
import { NavBar } from '../../components/NavBar'
import { SideBar } from '../../components/SideBar'

import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { useState } from 'react'

type AuthorEntity = {
  id: string
  name: string
  avatar: string
  Books: []
}

export type PublisherEntity = {
  id: string
  name: string
  Books: []
}

type BookEntity = {
  id: string
  title: string
  year: string
  Author: {}
  Publisher: {}
}

interface IDashboard {
  authors: AuthorEntity[]
  publishers: PublisherEntity[]
  books: BookEntity[]
}

export default function Dashboard({ authors, publishers, books }: IDashboard) {
  const [listAuthors, setListAuthors] = useState(authors || [])
  const [listPublishers, setListPublishers] = useState(publishers || [])
  const [listBooks, setListBooks] = useState(books || [])

  return (
    <>
      <Head>
        <title>ModeloApp | Seja Bem-Vindo</title>
      </Head>

      <div className="container-fluid position-relative d-flex p-0">
        <SideBar />

        <div className="content">
          <NavBar />

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="h-100 bg-secondary rounded p-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h6 className="mb-0">Autores</h6>
                    <Link href="/authors">Ver Todos</Link>
                  </div>

                  {authors.map(item => (
                    <div
                      key={item.id}
                      className="d-flex align-items-center border-bottom py-3"
                    >
                      <img
                        className="rounded-circle flex-shrink-0"
                        src={
                          item.avatar
                            ? `http://localhost:3333/files/${item.avatar}`
                            : 'http://localhost:3333/files/user.png'
                        }
                        alt=""
                        width="40"
                        height="40"
                      />
                      <div className="w-100 ms-3">
                        <div className="d-flex w-100 justify-content-between">
                          <h6 className="mb-0">{item.name}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="h-100 bg-secondary rounded p-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h6 className="mb-0">Editoras</h6>
                    <Link href="/publishers">Ver Todos</Link>
                  </div>

                  {publishers.map(item => (
                    <div
                      key={item.id}
                      className="d-flex align-items-center border-bottom py-3"
                    >
                      <div className="w-100 ms-3">
                        <div className="d-flex w-100 justify-content-between">
                          <h6 className="mb-0">{item.name}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="h-100 bg-secondary rounded p-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h6 className="mb-0">Livros</h6>
                    <Link href="/books">Ver Todos</Link>
                  </div>

                  {books.map(item => (
                    <div
                      key={item.id}
                      className="d-flex align-items-center border-bottom py-3"
                    >
                      <div className="w-100 ms-3">
                        <div className="d-flex w-100 justify-content-between">
                          <h6 className="mb-0">{item.title}</h6>
                        </div>
                        <small>Ano: {item.year}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
  const responseBooks = await apiClient.get('/api/v1/books')

  return {
    props: {
      authors: responseAuthors.data,
      publishers: responsePublishers.data,
      books: responseBooks.data,
    },
  }
})
