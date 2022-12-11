import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import Link from 'next/link'

const SideBar = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="sidebar pe-4 pb-3">
      <nav className="navbar bg-secondary navbar-dark">
        <Link href="/dashboard" className="navbar-brand mx-4 mb-3">
          <h3 className="text-primary">
            <i className="fa fa-user-edit me-2"></i>ModeloApp
          </h3>
        </Link>

        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img
              className="rounded-circle"
              src={
                user?.avatar
                  ? `http://localhost:3333/files/${user.avatar}`
                  : 'http://localhost:3333/files/user.png'
              }
              alt="Avatar do usuário"
              width="40"
              height="40"
            />

            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>

          <div className="ms-3">
            <h6 className="mb-0">Olá,</h6>
            <span>{user?.email}</span>
          </div>
        </div>

        <div className="navbar-nav w-100">
          <Link href="/dashboard" className="nav-item nav-link">
            <i className="fa fa-tachometer-alt me-2"></i>Dashboard
          </Link>

          <Link href="/authors" className="nav-item nav-link">
            <i className="far fa-file-alt me-2"></i>Autores
          </Link>

          <Link href="/publishers" className="nav-item nav-link">
            <i className="far fa-file-alt me-2"></i>Editoras
          </Link>

          <Link href="/books" className="nav-item nav-link">
            <i className="far fa-file-alt me-2"></i>Livros
          </Link>
        </div>
      </nav>
    </div>
  )
}

export { SideBar }
