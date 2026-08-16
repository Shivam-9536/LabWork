import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./BookingStatusPage.css";

function BookingStatusPage() {

  const [searchParams] = useSearchParams();

  const jobId = searchParams.get("jobId");

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
const [review, setReview] = useState("");
const [reviewSubmitted, setReviewSubmitted] = useState(false);
const [submittingReview, setSubmittingReview] = useState(false);


  // ==========================================
  // GET JOB
  // ==========================================

  const fetchJob = async () => {

    try {

      if (!jobId) {
        setError("Job ID is missing.");
        return;
      }


      const response = await fetch(
        `http://localhost:5000/api/jobs/${jobId}`
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to load booking"
        );

      }


      setJob(data.job);


    } catch (error) {

      console.error(
        "Booking status error:",
        error
      );

      setError(
        error.message ||
        "Unable to load booking"
      );

    } finally {

      setLoading(false);

    }

  };

const handleSubmitReview = async () => {

  if (rating === 0) {
    alert("Please select a rating");
    return;
  }

  try {

    setSubmittingReview(true);

    const response = await fetch(
      `http://localhost:5000/api/jobs/${jobId}/review`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          rating: rating,
          review: review
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        "Failed to submit review"
      );
    }

    setReviewSubmitted(true);

  } catch (error) {

    console.error(
      "Submit review error:",
      error
    );

    alert(
      error.message ||
      "Failed to submit review"
    );

  } finally {

    setSubmittingReview(false);

  }

};

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {

    fetchJob();

  }, [jobId]);


  // ==========================================
  // AUTO REFRESH
  // ==========================================

  useEffect(() => {

    if (!jobId) {
      return;
    }


    const interval =
      setInterval(() => {

        fetchJob();

      }, 5000);


    return () => {
      clearInterval(interval);
    };

  }, [jobId]);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="booking-status-page">

        <div className="status-loading">

          <div className="status-loader">
            ⏳
          </div>

          <h2>
            Loading your booking...
          </h2>

          <p>
            Please wait a moment.
          </p>

        </div>

      </div>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (

      <div className="booking-status-page">

        <div className="status-error">

          <div>
            ⚠️
          </div>

          <h2>
            Something went wrong
          </h2>

          <p>
            {error}
          </p>

          <button
            onClick={() =>
              window.location.href =
                "/booking"
            }
          >
            Book Again
          </button>

        </div>

      </div>

    );

  }


  if (!job) {
    return null;
  }


  // ==========================================
  // STATUS HELPERS
  // ==========================================

  const status =
    job.status;


  const statusText = {

    searching:
      "Waiting for worker",

    accepted:
      "Worker accepted your request",

    in_progress:
      "Your job is in progress",

    completed:
      "Job completed",

    cancelled:
      "Booking cancelled"

  };


  const statusMessage =
    statusText[status] ||
    "Checking booking status";


  const statusSteps = [

    {
      key: "searching",
      title: "Finding a worker",
      text: "Looking for a verified professional"
    },

    {
      key: "accepted",
      title: "Worker accepted",
      text: "Your professional is confirmed"
    },

    {
      key: "in_progress",
      title: "Job in progress",
      text: "Professional is working on your request"
    },

    {
      key: "completed",
      title: "Completed",
      text: "Your service has been completed"
    }

  ];


  const statusOrder = [
    "searching",
    "accepted",
    "in_progress",
    "completed"
  ];


  const currentIndex =
    statusOrder.indexOf(status);


  return (

    <div className="booking-status-page">


      {/* HEADER */}

      <header className="booking-status-header">

        <div className="booking-status-logo">

          LAB<span>WORK</span>

        </div>

        <span>
          Booking ID: {jobId}
        </span>

      </header>



      {/* MAIN */}

      <main className="booking-status-container">


        {/* TOP */}

        <section className="booking-status-top">

          <div>

            <span className="status-label">
              YOUR BOOKING
            </span>

            <h1>
              {statusMessage}
            </h1>

            <p>
              {status === "searching"
                ? "We're waiting for the selected professional to accept your request."
                : status === "accepted"
                ? "Great! Your professional has accepted the job."
                : status === "in_progress"
                ? "Your professional is currently working on the job."
                : status === "completed"
                ? "Your service has been completed successfully."
                : "Your booking status has been updated."}
            </p>

          </div>


          <div className="live-status">

            <span className="live-dot"></span>

            Live status

          </div>

        </section>



        {/* JOB SUMMARY */}

        <section className="booking-job-card">

          <div className="job-service-icon">

            {job.service === "Electrician"
              ? "⚡"
              : job.service === "Plumber"
              ? "🚰"
              : job.service === "Carpenter"
              ? "🪚"
              : job.service === "Painter"
              ? "🎨"
              : "🔧"}

          </div>


          <div className="booking-job-info">

            <span>
              SERVICE
            </span>

            <h2>
              {job.service}
            </h2>

            <p>
              {job.description}
            </p>

            <small>
              📍 {job.location}
            </small>

          </div>


          <div className="booking-job-price">

            <span>
              ESTIMATED
            </span>

            <strong>
              ₹{job.estimatedPrice || 0}
            </strong>

          </div>

        </section>



        {/* WORKER */}

        {job.workerId && (

          <section className="assigned-worker">

            <div className="assigned-worker-avatar">

              {job.workerId.name
                ?.charAt(0)
                .toUpperCase()}

            </div>


            <div className="assigned-worker-info">

              <span>
                YOUR PROFESSIONAL
              </span>

              <h2>
                {job.workerId.name}
              </h2>

              <p>
                {job.workerId.skills?.join(
                  " • "
                )}
              </p>

              <strong className="verified-worker">
                ✓ Verified Professional
              </strong>

            </div>


            {status === "accepted" ||
            status === "in_progress" ? (

              <a
                href={`tel:${job.workerId.phone}`}
                className="contact-worker"
              >
                📞 Contact
              </a>

            ) : null}

          </section>

        )}



        {/* STATUS TIMELINE */}

        <section className="status-timeline">

          <div className="timeline-heading">

            <span>
              BOOKING PROGRESS
            </span>

            <h2>
              Track your service
            </h2>

          </div>


          <div className="timeline">

            {statusSteps.map(
              (step, index) => {

                const completed =
                  currentIndex >= index;

                const active =
                  status === step.key;


                return (

                  <div
                    className={
                      completed
                        ? "timeline-step completed"
                        : "timeline-step"
                    }
                    key={step.key}
                  >

                    <div className="timeline-marker">

                      {completed
                        ? "✓"
                        : index + 1}

                    </div>


                    <div className="timeline-content">

                      <strong>
                        {step.title}
                      </strong>

                      <span>
                        {step.text}
                      </span>

                      {active && (
                        <small>
                          Current status
                        </small>
                      )}

                    </div>

                  </div>

                );

              }
            )}

          </div>

        </section>



        {/* WAITING */}

        {status === "searching" && (

          <div className="waiting-box">

            <div className="waiting-icon">
              🔔
            </div>

            <div>

              <strong>
                Waiting for confirmation
              </strong>

              <p>
                The worker will receive your request.
                This page automatically checks for updates.
              </p>

            </div>

          </div>

        )}



        {/* ACCEPTED */}

        {status === "accepted" && (

          <div className="success-box">

            <div>
              ✓
            </div>

            <div>

              <strong>
                Worker confirmed
              </strong>

              <p>
                Your professional has accepted your job request.
              </p>

            </div>

          </div>

        )}



        {/* COMPLETED */}

{status === "completed" && (

  <div className="completed-review-box">

    {!reviewSubmitted ? (

      <>

        <div className="completed-success">

          <div className="success-check">
            ✓
          </div>

          <div>
            <strong>
              Service completed
            </strong>

            <p>
              Your job has been completed successfully.
            </p>
          </div>

        </div>


        {/* RATING */}

        <div className="rating-section">

          <span className="rating-label">
            RATE YOUR EXPERIENCE
          </span>

          <h3>
            How was your service?
          </h3>

          <div className="stars">

            {[1, 2, 3, 4, 5].map((star) => (

              <button
                key={star}
                type="button"
                className={
                  star <= rating
                    ? "star active"
                    : "star"
                }
                onClick={() =>
                  setRating(star)
                }
              >
                ★
              </button>

            ))}

          </div>


          {/* REVIEW */}

          <textarea
            className="review-input"
            placeholder="Tell us about your experience..."
            value={review}
            onChange={(e) =>
              setReview(e.target.value)
            }
          />


          <button
  className="submit-review-btn"
  disabled={
    rating === 0 ||
    submittingReview
  }
  onClick={handleSubmitReview}
>
  {submittingReview
    ? "Submitting..."
    : "Submit Review →"}
</button>

        </div>

      </>

    ) : (

      <div className="review-success">

        <div className="success-check">
          ✓
        </div>

        <div>

          <strong>
            Thank you for your feedback!
          </strong>

          <p>
            Your {rating}-star rating has been
            submitted successfully.
          </p>

        </div>

      </div>

    )}

  </div>

)}


      </main>

    </div>

  );

}

export default BookingStatusPage;