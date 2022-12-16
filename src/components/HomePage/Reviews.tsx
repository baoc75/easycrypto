export default function Reviews() {
  return (
    <div className="bg-dark py-lg-16 py-10">
      <div className="container">
        <div className="row">
          <div className="offset-xl-2 col-xl-8 col-md-12 col-12">
            <div className="mb-10 text-center">
              {/* section title start*/}
              <h1 className="text-white mb-2">
                Some of our Awesome Testimonials
              </h1>
              <p className="text-white text-white-50">
                {' '}
                You won’t be the only one lorem ipsu mauris diam mattises.
              </p>
            </div>
            {/* /.section title start*/}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-12 mb-6 mb-lg-0  ">
            <div className="card border-0">
              <div className="card-body p-5">
                <p className="mb-0 fs-4 fst-italic fw-semi-bold text-dark">
                  {' '}
                  “I loved the customer service you guys provided me. That was
                  very nice and patient with questions I had. I would really
                  like definitely come back here”
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mt-4">
              <div>
                {' '}
                <img
                  src="../assets/images/avatar/avatar-1.jpg"
                  alt="Borrow - Loan Company Website Template"
                  className="avatar avatar-md rounded-3"
                />
              </div>
              <div className="ms-3 lh-1">
                <h4 className="mb-0 text-white">Donny J. Griffin</h4>
                <span className="fs-6 text-white-50 fw-bold">
                  Personal Loan
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12 mb-6 mb-lg-0  ">
            <div className="card border-0">
              <div className="card-body p-5">
                <p className="mb-0 fs-4 fst-italic fw-semi-bold text-dark">
                  {' '}
                  “I had a good experience with Insight Loan Services. I am
                  thankful to insight for the help you guys gave me. My loan was
                  easy and fast. thank you Insigtht”
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mt-4">
              <div>
                {' '}
                <img
                  src="../assets/images/avatar/avatar-2.jpg"
                  alt="Borrow - Loan Company Website Template"
                  className="avatar avatar-md rounded-3"
                />
              </div>
              <div className="ms-3 lh-1">
                <h4 className="mb-0 text-white">Mary O. Randle</h4>
                <span className="fs-6 text-white-50 fw-bold">
                  Education Loan
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12 mb-6 mb-lg-0  ">
            <div className="card border-0">
              <div className="card-body p-5">
                <p className="mb-0 fs-4 fst-italic fw-semi-bold text-dark">
                  {' '}
                  “We came out of their offices very happy with their service.
                  They treated us very kind. Definite will come back. The
                  waiting time was very appropriate.”
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mt-4">
              <div>
                {' '}
                <img
                  src="../assets/images/avatar/avatar-4.jpg"
                  alt="Borrow - Loan Company Website Template"
                  className="avatar avatar-md rounded-3"
                />
              </div>
              <div className="ms-3 lh-1">
                <h4 className="mb-0 text-white">Lindo E. Olson</h4>
                <span className="fs-6 text-white-50 fw-bold">Car Loan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
