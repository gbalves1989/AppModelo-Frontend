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

type AuthorEntity = {
  id: string
  name: string
  avatar: string
  Books: []
}

interface IAuthor {
  author: AuthorEntity
}

export default function Author({ author }: IAuthor) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [imageAvatar, setImageAvatar] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploadFile, setUploadFile] = useState(false)
  const apiClient = setupAPIClient()

  useEffect(() => {
    getAuthor()
  }, [])

  async function getAuthor() {
    const response = await apiClient.get(`/api/v1/authors/${router.query.id}`)
    author = response.data
    setName(author.name)
    setAvatar(author.avatar)
  }

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return
    }

    const image = e.target.files[0]

    if (!image) {
      return
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setUploadFile(true)
      setImageAvatar(image)
    }
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()

    setLoading(true)

    if (uploadFile) {
      const data = new FormData()
      data.append('avatar', imageAvatar)
      await apiClient.patch(`/api/v1/authors/upload/${router.query.id}`, data)
      setUploadFile(false)
    }

    if (name === '') {
      setLoading(false)
      toast.error('Nome do autor deve ser informado.')
      return
    }

    await apiClient.patch(`/api/v1/authors/${router.query.id}`, { name })
    toast.success('Autor atualizado com sucesso.')
    await getAuthor()
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>ModeloApp | Autor</title>
      </Head>

      <div className="container-fluid position-relative d-flex p-0">
        <SideBar />

        <div className="content">
          <NavBar />

          <div className="col-sm-12 col-xl-8" style={{ padding: 30 }}>
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Edição de Autor</h6>

              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <img
                    className="rounded-circle me-lg-2"
                    src={
                      avatar
                        ? `http://localhost:3333/files/${avatar}`
                        : 'http://localhost:3333/files/user.png'
                    }
                    alt="Avatar do usuário"
                    width="100"
                    height="100"
                  />
                </div>

                <div className="mb-3">
                  <label for="avatar" class="form-label">
                    Avatar do Autor
                  </label>

                  <input
                    className="form-control bg-dark"
                    type="file"
                    id="avatar"
                    accept="image/png, image/jpeg"
                    onChange={handleFile}
                  />
                </div>

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
