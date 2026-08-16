import { useState } from "react";
import "./BookingPage.css";

function BookingPage() {

  const [service, setService] = useState("Electrician");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [time, setTime] = useState("Now");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const services = [
    {
      name: "Electrician",
      icon: "⚡",
      price: 199
    },
    {
      name: "Plumber",
      icon: "🚰",
      price: 249
    },
    {
      name: "Carpenter",
      icon: "🪚",
      price: 299
    },
    {
      name: "Painter",
      icon: "🎨",
      price: 399
    },
    {
      name: "AC Repair",
      icon: "❄️",
      price: 349
    },
    {
      name: "Cleaning",
      icon: "🧹",
      price: 199
    }
  ];


  const selectedService = services.find(
    (item) => item.name === service
  );


  const handleSubmit = async () => {

    setError("");

    // Basic validation

    if (!customerName.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!customerPhone.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    if (customerPhone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!description.trim()) {
      setError("Please describe your problem.");
      return;
    }

    if (!location.trim()) {
      setError("Please enter your service location.");
      return;
    }


    try {

      setLoading(true);


      const response = await fetch(
        "http://localhost:5000/api/jobs",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            customerName: customerName.trim(),

            customerPhone: customerPhone.trim(),

            service: service,

            description: description.trim(),

            location: location.trim(),

            estimatedPrice: selectedService.price

          })
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to create booking"
        );

      }


      console.log(
        "Job created successfully:",
        data
      );


      // Get job ID from backend response

      const jobId =
        data.job?._id ||
        data._id ||
        data.jobId;


      if (!jobId) {

        throw new Error(
          "Job created but job ID was not received."
        );

      }


      // Save basic booking information

      localStorage.setItem(
        "currentJobId",
        jobId
      );


      localStorage.setItem(
        "currentBooking",
        JSON.stringify({
          customerName,
          customerPhone,
          service,
          description,
          location,
          estimatedPrice:
            selectedService.price,
          time
        })
      );


      // Go to worker matching page

      window.location.href =
        `/find-worker?jobId=${jobId}`;


    } catch (error) {

      console.error(
        "Booking error:",
        error
      );

      setError(
        error.message ||
        "Something went wrong."
      );

    } finally {

      setLoading(false);

    }

  };


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


        {/* Title */}

        <div className="booking-title">

          <span>BOOK A SERVICE</span>

          <h1>
            What do you need
            <br />
            help with?
          </h1>

          <p>
            Tell us what you need and we'll find a
            verified professional near you.
          </p>

        </div>



        {/* Service */}

        <section className="booking-section">

          <div className="section-label">
            <span>01</span>
            Choose a service
          </div>


          <div className="booking-services">

            {services.map((item) => (

              <button
                key={item.name}
                type="button"
                className={
                  service === item.name
                    ? "booking-service active"
                    : "booking-service"
                }
                onClick={() =>
                  setService(item.name)
                }
              >

                <div>
                  {item.icon}
                </div>

                <span>
                  {item.name}
                </span>

              </button>

            ))}

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
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Example: My ceiling fan is not working and making a strange noise..."
          />


          <div className="upload-box">

            <span>📷</span>

            <div>

              <strong>
                Add photos or video
              </strong>

              <p>
                Help the professional understand
                the problem better
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                alert(
                  "Photo upload will be added next."
                )
              }
            >
              Upload
            </button>

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

              <small>
                Service location
              </small>

              <input
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                placeholder="Enter your city or area"
              />

            </div>


            <button
              type="button"
              onClick={() =>
                setLocation("Agra")
              }
            >
              Use my location
            </button>

          </div>

        </section>



        {/* Time */}

        <section className="booking-section">

          <div className="section-label">
            <span>04</span>
            When do you need it?
          </div>


          <div className="time-options">

            <button
              type="button"
              className={
                time === "Now"
                  ? "time-option active"
                  : "time-option"
              }
              onClick={() =>
                setTime("Now")
              }
            >

              <strong>
                Now
              </strong>

              <span>
                As soon as possible
              </span>

            </button>


            <button
              type="button"
              className={
                time === "Today"
                  ? "time-option active"
                  : "time-option"
              }
              onClick={() =>
                setTime("Today")
              }
            >

              <strong>
                Today
              </strong>

              <span>
                Choose a time
              </span>

            </button>


            <button
              type="button"
              className={
                time === "Schedule"
                  ? "time-option active"
                  : "time-option"
              }
              onClick={() =>
                setTime("Schedule")
              }
            >

              <strong>
                Schedule
              </strong>

              <span>
                Pick date & time
              </span>

            </button>

          </div>

        </section>



        {/* Customer Details */}

        <section className="booking-section">

          <div className="section-label">
            <span>05</span>
            Your contact details
          </div>


          <div className="customer-details-grid">

            <div className="customer-field">

              <label>
                Your Name
              </label>

              <input
                type="text"
                value={customerName}
                onChange={(e) =>
                  setCustomerName(e.target.value)
                }
                placeholder="Enter your name"
              />

            </div>


            <div className="customer-field">

              <label>
                Mobile Number
              </label>

              <input
                type="tel"
                maxLength="10"
                value={customerPhone}
                onChange={(e) =>
                  setCustomerPhone(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                placeholder="10-digit mobile number"
              />

            </div>

          </div>

        </section>



        {/* Error */}

        {error && (

          <div className="booking-error">
            ⚠️ {error}
          </div>

        )}



        {/* Bottom */}

        <div className="booking-bottom">

          <div>

            <span>
              Estimated starting price
            </span>

            <strong>
              ₹{selectedService.price} onwards
            </strong>

          </div>


          <button
            type="button"
            className="request-btn"
            onClick={handleSubmit}
            disabled={loading}
          >

            {loading
              ? "Finding professionals..."
              : "Find a Worker →"}

          </button>

        </div>


      </main>

    </div>

  );

}

export default BookingPage;