import "./WorkerRegistrationPage.css";

function WorkerRegistrationPage() {
  return (
    <div className="worker-register-page">

      {/* Header */}

      <header className="worker-register-header">

        <div className="register-logo">
          LAB<span>WORK</span>
        </div>

        <div className="worker-login">
          Already registered?
          <strong> Login</strong>
        </div>

      </header>


      {/* Main */}

      <main className="register-container">

        <div className="register-heading">

          <span>BECOME A LABWORK PROFESSIONAL</span>

          <h1>
            Turn your skills into
            <br />
            <span>more opportunities.</span>
          </h1>

          <p>
            Create your professional profile and start receiving
            job requests from customers near you.
          </p>

        </div>


        {/* Progress */}

        <div className="register-progress">

          <div className="progress-step active">
            <span>01</span>
            <p>Basic Details</p>
          </div>

          <div className="progress-line"></div>

          <div className="progress-step">
            <span>02</span>
            <p>Skills</p>
          </div>

          <div className="progress-line"></div>

          <div className="progress-step">
            <span>03</span>
            <p>Verification</p>
          </div>

        </div>


        {/* Basic Details */}

        <section className="register-card">

          <div className="register-card-heading">

            <div className="card-number">
              01
            </div>

            <div>
              <h2>Tell us about yourself</h2>
              <p>
                We'll use these details to create your professional profile.
              </p>
            </div>

          </div>


          <div className="form-grid">

            <div className="form-group">

              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
              />

            </div>


            <div className="form-group">

              <label>Mobile Number</label>

              <input
                type="tel"
                placeholder="Enter your mobile number"
              />

            </div>


            <div className="form-group">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email address"
              />

            </div>


            <div className="form-group">

              <label>Age</label>

              <input
                type="number"
                placeholder="Enter your age"
              />

            </div>

          </div>

        </section>


        {/* Skills */}

        <section className="register-card">

          <div className="register-card-heading">

            <div className="card-number">
              02
            </div>

            <div>
              <h2>Your professional skills</h2>
              <p>
                Select the services you can provide professionally.
              </p>
            </div>

          </div>


          <div className="skill-grid">

            <button className="skill-option active">
              <span>⚡</span>
              Electrician
            </button>

            <button className="skill-option">
              <span>🚰</span>
              Plumber
            </button>

            <button className="skill-option">
              <span>🪚</span>
              Carpenter
            </button>

            <button className="skill-option">
              <span>🎨</span>
              Painter
            </button>

            <button className="skill-option">
              <span>❄️</span>
              AC Technician
            </button>

            <button className="skill-option">
              <span>🧹</span>
              Cleaner
            </button>

            <button className="skill-option">
              <span>🧱</span>
              Mason
            </button>

            <button className="skill-option">
              <span>🔨</span>
              General Labour
            </button>

          </div>


          <div className="experience-box">

            <label>Years of experience</label>

            <select>

              <option>Select experience</option>
              <option>Less than 1 year</option>
              <option>1 - 3 years</option>
              <option>3 - 5 years</option>
              <option>5 - 10 years</option>
              <option>10+ years</option>

            </select>

          </div>

        </section>


        {/* Location */}

        <section className="register-card">

          <div className="register-card-heading">

            <div className="card-number">
              03
            </div>

            <div>
              <h2>Where do you work?</h2>
              <p>
                We'll show you job requests close to your location.
              </p>
            </div>

          </div>


          <div className="form-group">

            <label>Service Location</label>

            <div className="location-field">

              <span>📍</span>

              <input
                type="text"
                placeholder="Enter your city or area"
              />

              <button>
                Use my location
              </button>

            </div>

          </div>


          <div className="area-note">

            <span>💡</span>

            <p>
              Don't worry. Your exact home address will never be
              shown publicly to customers.
            </p>

          </div>

        </section>


        {/* Availability */}

        <section className="register-card">

          <div className="register-card-heading">

            <div className="card-number">
              04
            </div>

            <div>
              <h2>When are you available?</h2>
              <p>
                You can change your availability anytime.
              </p>
            </div>

          </div>


          <div className="availability-options">

            <button className="availability-option active">

              <strong>🟢 Available Now</strong>

              <span>
                Receive nearby job requests
              </span>

            </button>


            <button className="availability-option">

              <strong>🕐 Part Time</strong>

              <span>
                Choose your working hours
              </span>

            </button>


            <button className="availability-option">

              <strong>📅 Flexible</strong>

              <span>
                Work when you want
              </span>

            </button>

          </div>

        </section>


        {/* Documents */}

        <section className="register-card">

          <div className="register-card-heading">

            <div className="card-number">
              05
            </div>

            <div>
              <h2>Identity verification</h2>
              <p>
                Verification helps us maintain a trusted professional network.
              </p>
            </div>

          </div>


          <div className="verification-box">

            <div className="verification-icon">
              ✓
            </div>

            <div>

              <strong>Identity verification</strong>

              <p>
                You'll need to verify your identity before
                receiving customer jobs.
              </p>

            </div>

            <button>
              Start verification
            </button>

          </div>

        </section>


        {/* Submit */}

        <div className="register-submit">

          <div>

            <strong>Ready to join LABWORK?</strong>

            <span>
              Your application will be reviewed before approval.
            </span>

          </div>

          <button>
            Submit Application →
          </button>

        </div>

      </main>

    </div>
  );
}

export default WorkerRegistrationPage;