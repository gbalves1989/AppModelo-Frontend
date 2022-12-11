import Head from 'next/head'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { toast } from 'react-toastify'

import { Footer } from '../../components/Footer'
import { NavBar } from '../../components/NavBar'
import { SideBar } from '../../components/SideBar'
import { Button } from '../../components/Button'

export type UserEntity = {
  id: string
  name: string
  email: string
  password?: string
  avatar: string
  Author: []
  Publisher: []
  Book: []
}

interface IProfile {
  profile: UserEntity
}

export default function Profile({ profile }: IProfile) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')
  const [imageAvatar, setImageAvatar] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploadFile, setUploadFile] = useState(false)
  const apiClient = setupAPIClient()

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    const response = await apiClient.get('/api/v1/users/me')
    profile = response.data
    setName(profile.name)
    setEmail(profile.email)
    setAvatar(profile.avatar)
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
      await apiClient.patch(`/api/v1/users/upload`, data)
      setUploadFile(false)
    }

    if (name === '') {
      setLoading(false)
      toast.error('Nome do usuário deve ser informado.')
      return
    }

    await apiClient.patch('/api/v1/users', { name })
    toast.success('Usuário atualizado com sucesso.')
    await getUser()
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>ModeloApp | Profile</title>
      </Head>

      <div className="container-fluid position-relative d-flex p-0">
        <SideBar />

        <div className="content">
          <NavBar />

          <div className="col-sm-12 col-xl-8" style={{ padding: 30 }}>
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Edição de Usuário</h6>

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
                    Avatar do Usuário
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
                    Nome do Usuário
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label for="email" className="form-label">
                    E-mail do Usuário
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
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
