import Head from 'next/head'
import Link from 'next/link'

import { useState, useContext, FormEvent } from 'react'
import { canSSRGuest } from '../utils/canSSRGuest'
import { AuthContext } from '../contexts/AuthContext'
import { toast } from 'react-toastify'

import { Button } from '../components/Button'

type HomeProps = {
  email: string
  password: string
}

export default function Home() {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if (email === '' || password === '') {
      toast.error('Preencha os campos corretamente.')
      return
    }

    setLoading(true)

    const data = { email, password } as HomeProps
    await signIn(data)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>ModeloApp - Faça seu login</title>
      </Head>

      <div className="container-fluid position-relative d-flex p-0">
        <div className="container-fluid text-center">
          <div
            className="row h-100 align-items-center justify-content-center"
            style={{ minHeight: '100vh' }}
          >
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
              <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <Link href="/">
                      <h3 className="text-primary">ModeloApp</h3>
                    </Link>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <label for="floatingInput">Informe seu e-mail</label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <label for="floatingPassword">Informe sua senha</label>
                  </div>

                  <Button
                    type="submit"
                    classParams="btn btn-primary py-3 w-100 mb-4"
                    loading={loading}
                    disabled={loading}
                  >
                    Entrar
                  </Button>

                  <Link className="mb-0" href="/signup">
                    Não possui cadastro? Clique aqui!
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const getServerSideProps = canSSRGuest(async ctx => {
  return {
    props: {},
  }
})

export { getServerSideProps }
