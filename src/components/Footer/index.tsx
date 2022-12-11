const Footer = () => {
  return (
    <div className="container-fluid fixed-bottom">
      <div className="bg-secondary rounded-top p-4">
        <div className="row">
          <div className="col-12 col-sm-6 text-center text-sm-start">
            &copy; <a href="#">modeloapp.com.br</a>, All Right Reserved.
          </div>

          <div className="col-12 col-sm-6 text-center text-sm-end">
            Designed By <a href="https://htmlcodex.com">modeloapp</a>
            <br />
            Distributed By:
            <a href="https://themewagon.com" target="_blank">
              modeloapp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Footer }
