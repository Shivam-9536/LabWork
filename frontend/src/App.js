import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingPage from "./pages/BookingPage";
import WorkerMatchingPage from "./pages/WorkerMatchingPage";
import WorkerRegistrationPage from "./pages/WorkerRegistrationPage";
import WorkerDashboard from "./pages/WorkerDashboard";
import "./App.css";
import WorkerLoginPage from "./pages/WorkerLoginPage";
import BookingStatusPage from "./pages/BookingStatusPage";

function HomePage() {
  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          LAB<span>WORK</span>
        </div>

        <nav>
          <a href="#services">Services</a>
          <a href="#how">How it works</a>
          <a href="#workers">For Workers</a>
        </nav>

        <div className="nav-actions">
          <button className="nav-login">Log in</button>
          <button
  className="nav-start"
  onClick={() => window.location.href = "/book-service"}
>
  Get Started
</button>
        </div>
      </header>


      {/* HERO */}
      <main>

        <section className="hero">

          <div className="hero-left">

            <div className="location-pill">
              <span className="green-dot"></span>
              Serving your neighbourhood
            </div>

            <h1>
              Get the right person
              <br />
              for the <span>right job.</span>
            </h1>

            <p className="hero-description">
              Electrician, plumber, carpenter or any skilled professional.
              Tell us what you need and we'll connect you with a trusted
              worker nearby.
            </p>

            <div className="search-box">

              <div className="search-icon">⌕</div>

              <div className="search-content">
                <span>What do you need?</span>
                <strong>Find a service</strong>
              </div>

              <div className="search-location">
                <span>📍</span>
                <div>
                  <small>Location</small>
                  <strong>Agra</strong>
                </div>
              </div>

              <button
  className="search-btn"
  onClick={() => window.location.href = "/book-service"}
>
  Find Worker
</button>

            </div>

            <div className="hero-trust">
              <span>✓ Verified professionals</span>
              <span>✓ Quick response</span>
              <span>✓ Secure payments</span>
            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="hero-right">

            <div className="glow"></div>

            <div className="service-orbit orbit-one">
              <span>⚡</span>
              Electrician
            </div>

            <div className="service-orbit orbit-two">
              <span>🚰</span>
              Plumber
            </div>

            <div className="service-orbit orbit-three">
              <span>🪚</span>
              Carpenter
            </div>

            <div className="main-worker-card">

              <div className="card-top">
                <span>AVAILABLE NOW</span>
                <div className="live-dot"></div>
              </div>

              <div className="worker-main">

                <div className="big-avatar">
                  RK
                </div>

                <div>
                  <h3>Rajesh Kumar</h3>
                  <p>Professional Plumber</p>

                  <div className="rating">
                    ★ <b>4.9</b>
                    <span> · 320+ jobs</span>
                  </div>
                </div>

              </div>

              <div className="worker-details">

                <div>
                  <span>Distance</span>
                  <strong>1.2 km</strong>
                </div>

                <div>
                  <span>Response</span>
                  <strong>~8 min</strong>
                </div>

              </div>

              <button className="card-book">
                Request this worker →
              </button>

            </div>

            <div className="floating-check">
              <div>✓</div>
              <section>
                <strong>Verified Worker</strong>
                <span>Identity & skills checked</span>
              </section>
            </div>

          </div>

        </section>


        {/* STATS */}

        <section className="stats">

          <div>
            <strong>5,000+</strong>
            <span>Verified Workers</span>
          </div>

          <div>
            <strong>25,000+</strong>
            <span>Jobs Completed</span>
          </div>

          <div>
            <strong>4.8/5</strong>
            <span>Average Rating</span>
          </div>

          <div>
            <strong>30 min</strong>
            <span>Average Response</span>
          </div>

        </section>


        {/* SERVICES */}

        <section className="services" id="services">

          <div className="section-head">

            <div>
              <span className="eyebrow">POPULAR SERVICES</span>

              <h2>
                Whatever you need,
                <br />
                <span>we'll find someone.</span>
              </h2>
            </div>

            <p>
              From quick repairs to bigger home projects,
              find skilled professionals for everyday needs.
            </p>

          </div>


          <div className="service-grid">

            <div className="service-card blue">
              <div className="service-number">01</div>
              <div className="service-emoji">⚡</div>
              <h3>Electrician</h3>
              <p>Repairs, wiring, switches & installations</p>
              <button>Find electrician →</button>
            </div>

            <div className="service-card">
              <div className="service-number">02</div>
              <div className="service-emoji">🚰</div>
              <h3>Plumber</h3>
              <p>Leakage, pipes, taps & bathroom work</p>
              <button>Find plumber →</button>
            </div>

            <div className="service-card">
              <div className="service-number">03</div>
              <div className="service-emoji">🪚</div>
              <h3>Carpenter</h3>
              <p>Furniture, fittings & woodwork</p>
              <button>Find carpenter →</button>
            </div>

            <div className="service-card">
              <div className="service-number">04</div>
              <div className="service-emoji">🎨</div>
              <h3>Painter</h3>
              <p>Interior, exterior & wall finishing</p>
              <button>Find painter →</button>
            </div>

          </div>

          <button className="all-services">
            Explore all services →
          </button>

        </section>


        {/* HOW IT WORKS */}

        <section className="how" id="how">

          <div className="how-heading">
            <span className="eyebrow">SIMPLE PROCESS</span>
            <h2>Getting help shouldn't be complicated.</h2>
          </div>

          <div className="steps">

            <div className="step">
              <div className="step-icon">01</div>
              <h3>Tell us what you need</h3>
              <p>
                Select a service, describe the problem and
                share your location.
              </p>
            </div>

            <div className="step">
              <div className="step-icon">02</div>
              <h3>We find your worker</h3>
              <p>
                Nearby verified professionals receive your
                request and one accepts the job.
              </p>
            </div>

            <div className="step">
              <div className="step-icon">03</div>
              <h3>Relax, we've got it</h3>
              <p>
                Track your worker, get the job done and
                pay securely when finished.
              </p>
            </div>

          </div>

        </section>


        {/* WORKER CTA */}

        <section className="worker-section" id="workers">

          <div className="worker-content">

            <span className="eyebrow">FOR SKILLED PROFESSIONALS</span>

            <h2>
              Your skill deserves
              <br />
              <span>more opportunities.</span>
            </h2>

            <p>
              Join LABWORK, get verified and receive job
              requests from customers around you.
            </p>

            <button
  onClick={() =>
    window.location.href = "/worker/register"
  }
>
  Join as a Worker →
</button>

          </div>

          <div className="worker-stats">

            <div>
              <strong>₹25K+</strong>
              <span>Potential monthly earnings</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Transparent payments</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Access to opportunities</span>
            </div>

          </div>

        </section>


        {/* FINAL CTA */}

        <section className="final-cta">

          <span>NEED SOMETHING FIXED?</span>

          <h2>
            Your home.
            <br />
            Our professionals.
          </h2>

          <button>
            Find a Worker →
          </button>

        </section>

      </main>


      {/* FOOTER */}

      <footer>

        <div className="footer-top">

          <div>
            <div className="logo">
              LAB<span>WORK</span>
            </div>

            <p>
              Making reliable local services
              accessible to everyone.
            </p>
          </div>

          <div>
            <h4>Company</h4>
            <a href="/">About us</a>
            <a href="/">How it works</a>
            <a href="/">Careers</a>
          </div>

          <div>
            <h4>Services</h4>
            <a href="/">Electrician</a>
            <a href="/">Plumber</a>
            <a href="/">Carpenter</a>
          </div>

          <div>
            <h4>Support</h4>
            <a href="/">Help centre</a>
            <a href="/">Contact us</a>
            <a href="/">Safety</a>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© 2026 LABWORK</span>
          <span>Built for everyday India.</span>
        </div>

      </footer>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/book-service"
          element={<BookingPage />}
        />

        <Route
          path="/find-worker"
          element={<WorkerMatchingPage />}
        />

        <Route
          path="/worker/register"
          element={<WorkerRegistrationPage />}
        />
        <Route
  path="/worker/login"
  element={<WorkerLoginPage />}
/>
       <Route
  path="/worker/dashboard"
  element={<WorkerDashboard />}
/>
<Route
  path="/booking-status"
  element={<BookingStatusPage />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;