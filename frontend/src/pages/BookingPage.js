import "./BookingPage.css";

function BookingPage() {
  return (
    <div className="booking-page">

      {/* Header */}

      <header className="booking-header">

        <div className="booking-logo">
          LAB<span>WORK</span>
        </div>

        <div className="booking-help">
          Need help?
          <strong> Contact Support</strong>
        </div>

      </header>


      {/* Main */}

      <main className="booking-container">

        <div className="booking-title">

          <span>BOOK A SERVICE</span>

          <h1>
            What do you need
            <br />
            help with?
          </h1>

          <p>
            Tell us what you need and we'll find a verified
            professional near you.
          </p>

        </div>


        {/* Service Selection */}

        <section className="booking-section">

          <div className="section-label">
            <span>01</span>
            Choose a service
          </div>

          <div className="booking-services">

            <button className="booking-service active">
              <div>⚡</div>
              <span>Electrician</span>
            </button>

            <button className="booking-service">
              <div>🚰</div>
              <span>Plumber</span>
            </button>

            <button className="booking-service">
              <div>🪚</div>
              <span>Carpenter</span>
            </button>

            <button className="booking-service">
              <div>🎨</div>
              <span>Painter</span>
            </button>

            <button className="booking-service">
              <div>❄️</div>
              <span>AC Repair</span>
            </button>

            <button className="booking-service">
              <div>🧹</div>
              <span>Cleaning</span>
            </button>

          </div>

        </section>


        {/* Problem */}

        <section className="booking-section">

          <div className="section-label">
            <span>02</span>
            Describe your problem
          </div>

          <textarea
            className="problem-input"
            placeholder="Example: My ceiling fan is not working and making a strange noise..."
          ></textarea>

          <div className="upload-box">

            <span>📷</span>

            <div>
              <strong>Add photos or video</strong>
              <p>
                Help the professional understand the problem better
              </p>
            </div>

            <button>Upload</button>

          </div>

        </section>


        {/* Location */}

        <section className="booking-section">

          <div className="section-label">
            <span>03</span>
            Where do you need the service?
          </div>

          <div className="location-input">

            <span>📍</span>

            <div>
              <small>Service location</small>
              <input
                type="text"
                placeholder="Enter your address"
              />
            </div>

            <button>Use my location</button>

          </div>

        </section>


        {/* Time */}

        <section className="booking-section">

          <div className="section-label">
            <span>04</span>
            When do you need it?
          </div>

          <div className="time-options">

            <button className="time-option active">
              <strong>Now</strong>
              <span>As soon as possible</span>
            </button>

            <button className="time-option">
              <strong>Today</strong>
              <span>Choose a time</span>
            </button>

            <button className="time-option">
              <strong>Schedule</strong>
              <span>Pick date & time</span>
            </button>

          </div>

        </section>


        {/* Bottom */}

        <div className="booking-bottom">

          <div>
            <span>Estimated starting price</span>
            <strong>₹199 onwards</strong>
          </div>

          <button
  className="request-btn"
  onClick={() => window.location.href = "/find-worker"}
>
  Find a Worker →
</button>

        </div>

      </main>

    </div>
  );
}

export default BookingPage;