import "./WorkerMatchingPage.css";

function WorkerMatchingPage() {
  return (
    <div className="matching-page">

      {/* Header */}

      <header className="matching-header">

        <div className="matching-logo">
          LAB<span>WORK</span>
        </div>

        <div className="matching-status">
          <span className="status-dot"></span>
          Finding workers near you
        </div>

      </header>


      {/* Main */}

      <main className="matching-container">

        <div className="matching-top">

          <div>
            <span className="matching-label">
              FINDING YOUR WORKER
            </span>

            <h1>
              Looking for the
              <br />
              best worker nearby...
            </h1>

            <p>
              We're checking available verified professionals
              around your location.
            </p>
          </div>

          <div className="search-animation">
            <div className="search-circle">
              <span>⌕</span>
            </div>

            <div className="pulse pulse-one"></div>
            <div className="pulse pulse-two"></div>
          </div>

        </div>


        {/* Request Summary */}

        <section className="request-summary">

          <div className="summary-item">
            <span>Service</span>
            <strong>⚡ Electrician</strong>
          </div>

          <div className="summary-item">
            <span>Location</span>
            <strong>📍 Agra</strong>
          </div>

          <div className="summary-item">
            <span>Required</span>
            <strong>As soon as possible</strong>
          </div>

        </section>


        {/* Workers */}

        <div className="workers-heading">

          <div>
            <span>AVAILABLE PROFESSIONALS</span>
            <h2>Workers near you</h2>
          </div>

          <div className="worker-count">
            3 workers found
          </div>

        </div>


        <div className="workers-list">


          {/* Worker 1 */}

          <div className="matching-worker-card featured">

            <div className="worker-profile">

              <div className="matching-avatar blue-avatar">
                AS
              </div>

              <div className="matching-worker-info">

                <div className="name-row">
                  <h3>Amit Sharma</h3>

                  <span className="verified">
                    ✓ Verified
                  </span>
                </div>

                <p>⚡ Professional Electrician</p>

                <div className="worker-rating">
                  <span>★</span>
                  <strong>4.9</strong>
                  <small> · 428 jobs completed</small>
                </div>

              </div>

            </div>


            <div className="worker-meta">

              <div>
                <span>Distance</span>
                <strong>1.2 km</strong>
              </div>

              <div>
                <span>Arrival</span>
                <strong>~10 min</strong>
              </div>

              <div>
                <span>Experience</span>
                <strong>7 years</strong>
              </div>

            </div>


            <button className="choose-worker">
              Request Worker →
            </button>

          </div>


          {/* Worker 2 */}

          <div className="matching-worker-card">

            <div className="worker-profile">

              <div className="matching-avatar orange-avatar">
                RK
              </div>

              <div className="matching-worker-info">

                <div className="name-row">
                  <h3>Rakesh Kumar</h3>

                  <span className="verified">
                    ✓ Verified
                  </span>
                </div>

                <p>⚡ Electrical Technician</p>

                <div className="worker-rating">
                  <span>★</span>
                  <strong>4.8</strong>
                  <small> · 315 jobs completed</small>
                </div>

              </div>

            </div>


            <div className="worker-meta">

              <div>
                <span>Distance</span>
                <strong>2.1 km</strong>
              </div>

              <div>
                <span>Arrival</span>
                <strong>~15 min</strong>
              </div>

              <div>
                <span>Experience</span>
                <strong>5 years</strong>
              </div>

            </div>


            <button className="choose-worker">
              Request Worker →
            </button>

          </div>


          {/* Worker 3 */}

          <div className="matching-worker-card">

            <div className="worker-profile">

              <div className="matching-avatar green-avatar">
                MK
              </div>

              <div className="matching-worker-info">

                <div className="name-row">
                  <h3>Manoj Kumar</h3>

                  <span className="verified">
                    ✓ Verified
                  </span>
                </div>

                <p>⚡ Home Electrician</p>

                <div className="worker-rating">
                  <span>★</span>
                  <strong>4.7</strong>
                  <small> · 210 jobs completed</small>
                </div>

              </div>

            </div>


            <div className="worker-meta">

              <div>
                <span>Distance</span>
                <strong>2.8 km</strong>
              </div>

              <div>
                <span>Arrival</span>
                <strong>~20 min</strong>
              </div>

              <div>
                <span>Experience</span>
                <strong>4 years</strong>
              </div>

            </div>


            <button className="choose-worker">
              Request Worker →
            </button>

          </div>

        </div>


        {/* Safety */}

        <div className="matching-safety">

          <div className="safety-icon">
            ✓
          </div>

          <div>
            <strong>Your safety matters</strong>

            <p>
              Every worker on LABWORK goes through identity
              and skill verification before joining the platform.
            </p>
          </div>

        </div>

      </main>

    </div>
  );
}

export default WorkerMatchingPage;