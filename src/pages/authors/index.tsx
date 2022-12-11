import Head from 'next/head'
import { useRouter } from 'next/router'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'

import { Footer } from '../../components/Footer'
import { NavBar } from '../../components/NavBar'
import { SideBar } from '../../components/SideBar'
import { Button } from '../../components/Button'

type AuthorEntity = {
  id: string
  name: string
  avatar: string
  Books: []
}

interface IAuthors {
  authors: AuthorEntity[]
}

export default function Authors({ authors }: IAuthors) {
  const router = useRouter()
  const [list, setList] = useState(authors || [])
  const apiClient = setupAPIClient()

  function handleEdit(id: string) {
    router.push(`/authors/${id}`)
  }

  function handleCreate() {
    router.push('/authors/create')
  }

  async function handleRemove(id: string) {
    try {
      await apiClient.delete(`/api/v1/authors/${id}`)
      toast.success('Autor removido com sucesso.')

      const response = await apiClient.get('/api/v1/authors')
      if (response.data === null) {
        setList([])
      } else {
        setList(response.data)
      }
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <>
      <Head>
        <title>ModeloApp | Autores</title>
      </Head>

      <div className="container-fluid position-relative d-flex p-0">
        <SideBar />

        <div className="content">
          <NavBar />

          <div className="col-sm-12" style={{ padding: 30 }}>
            <div className="bg-secondary rounded h-100 p-4">
              <div className="d-flex justify-content-between aling-items-center">
                <h6 className="mb-4">Lista de Autores</h6>

                <Button
                  type="button"
                  loading={false}
                  disabled={false}
                  color="btn-success"
                  onClick={() => handleCreate()}
                >
                  Adicionar
                </Button>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Avatar do Autor</th>
                    <th scope="col">Nome do Autor</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {list.map(item => (
                    <tr key={item.id}>
                      <td>
                        <img
                          className="rounded-circle flex-shrink-0"
                          src={
                            item.avatar
                              ? `http://localhost:3333/files/${item.avatar}`
                              : 'http://localhost:3333/files/user.png'
                          }
                          alt="Avatar do autor"
                          width="40"
                          height="40"
                        />
                      </td>

                      <td>{item.name}</td>

                      <td>
                        <Button
                          type="button"
                          loading={false}
                          disabled={false}
                          color="btn-info"
                          onClick={() => handleEdit(item.id)}
                        >
                          Editar
                        </Button>

                        <Button
                          type="button"
                          loading={false}
                          disabled={false}
                          color="btn-danger"
                          onClick={() => handleRemove(item.id)}
                        >
                          Remover
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
  const response = await apiClient.get('/api/v1/authors')

  return {
    props: {
      authors: response.data,
    },
  }
})
