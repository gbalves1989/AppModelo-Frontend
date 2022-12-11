import { ButtonHTMLAttributes, ReactNode } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  classParams?: string
  color?: string
  children: ReactNode
}

const Button = ({
  loading,
  classParams,
  color,
  children,
  ...rest
}: IButton) => {
  return (
    <button
      className={
        classParams !== undefined ? classParams : `btn ${color} m-2 text-white`
      }
      disabled={loading}
      {...rest}
    >
      {loading ? (
        <div className="d-flex justify-content-center align-items-center gap-3">
          <div
            className="spinner-border text-white"
            style={{ width: '2rem', height: '2rem' }}
          ></div>
          <span>Aguarde...</span>
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  )
}

export { Button }
