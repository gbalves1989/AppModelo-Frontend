import Head from 'next/head'
import Link from 'next/link'

import { Button } from '../../components/Button'
import { Footer } from '../../components/Footer'
import { NavBar } from '../../components/NavBar'
import { SideBar } from '../../components/SideBar'

import { canSSRAuth } from '../../utils/canSSRAuth'

export default function PageNotFound() {
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
            <div className="row bg-secondary rounded align-items-center justify-content-center mx-0">
              <div className="col-md-6 text-center p-4">
                <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
                <h1 className="display-1 fw-bold">404</h1>
                <h1 className="mb-4">Página não encontrada</h1>

                <Link
                  className="btn btn-primary rounded-pill py-3 px-5"
                  href="/dashboard"
                >
                  Voltar para Dashboard
                </Link>
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
  return {
    props: {},
  }
})
