import Head from 'next/head'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { setupAPIClient } from '../../../services/api'
import { canSSRAuth } from '../../../utils/canSSRAuth'

import { Footer } from '../../../components/Footer'
import { NavBar } from '../../../components/NavBar'
import { SideBar } from '../../../components/SideBar'
import { Button } from '../../../components/Button'

export default function Create() {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const apiClient = setupAPIClient()

  async function handleCreate() {
    if (name === '') {
      toast.error('Nome do autor deve ser informado.')
      return
    }

    setLoading(true)

    await apiClient.post(`/api/v1/authors`, { name })
    toast.success('Autor criado com sucesso.')
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>ModeloApp | Novo Autor</title>
      </Head>

      <div className="container-fluid position-relative d-flex p-0">
        <SideBar />

        <div className="content">
          <NavBar />

          <div className="col-sm-12 col-xl-8" style={{ padding: 30 }}>
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Adicionar Autor</h6>

              <form onSubmit={handleCreate}>
                <div className="mb-3">
                  <label for="name" className="form-label">
                    Nome do Autor
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
  return {
    props: {},
  }
})
