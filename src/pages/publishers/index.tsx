import Head from 'next/head'
import { useRouter } from 'next/router'

import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { SideBar } from '../../components/SideBar'
import { NavBar } from '../../components/NavBar'
import { Footer } from '../../components/Footer'
import { Button } from '../../components/Button'

export type PublisherEntity = {
  id: string
  name: string
  Books: []
}

interface IPublishersProps {
  publishers: PublisherEntity[]
}

export default function Publishers({ publishers }: IPublishersProps) {
  const router = useRouter()
  const [list, setList] = useState(publishers || [])
  const apiClient = setupAPIClient()

  function handleEdit(id: string) {
    router.push(`/publishers/${id}`)
  }

  function handleCreate() {
    router.push('/publishers/create')
  }

  async function handleRemove(id: string) {
    try {
      await apiClient.delete(`/api/v1/publishers/${id}`)
      toast.success('Editora removida com sucesso.')

      const response = await apiClient.get('/api/v1/publishers')
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
        <title>ModeloApp | Editoras</title>
      </Head>

      <div className="container-fluid position-relative d-flex p-0">
        <SideBar />

        <div className="content">
          <NavBar />

          <div className="col-sm-12" style={{ padding: 30 }}>
            <div className="bg-secondary rounded h-100 p-4">
              <div className="d-flex justify-content-between aling-items-center">
                <h6 className="mb-4">Lista de Editoras</h6>

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
                    <th scope="col">Nome do Autor</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {list.map(item => (
                    <tr key={item.id}>
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
  const response = await apiClient.get('/api/v1/publishers')

  return {
    props: {
      publishers: response.data,
    },
  }
})
