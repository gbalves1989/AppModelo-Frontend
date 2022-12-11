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

type PublisherEntity = {
  id: string
  name: string
  Books: []
}

interface IPublisher {
  publisher: PublisherEntity
}

export default function Publisher({ publisher }: IPublisher) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const apiClient = setupAPIClient()

  useEffect(() => {
    getPublisher()
  }, [])

  async function getPublisher() {
    const response = await apiClient.get(
      `/api/v1/publishers/${router.query.id}`,
    )
    publisher = response.data
    setName(publisher.name)
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()

    setLoading(true)

    if (name === '') {
      setLoading(false)
      toast.error('Nome da editora deve ser informada.')
      return
    }

    await apiClient.patch(`/api/v1/publishers/${router.query.id}`, { name })
    toast.success('Editora atualizada com sucesso.')
    await getPublisher()
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>ModeloApp | Editora</title>
      </Head>

      <div className="container-fluid position-relative d-flex p-0">
        <SideBar />

        <div className="content">
          <NavBar />

          <div className="col-sm-12 col-xl-8" style={{ padding: 30 }}>
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Edição da Editora</h6>

              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label for="name" className="form-label">
                    Nome da Editora
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
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
