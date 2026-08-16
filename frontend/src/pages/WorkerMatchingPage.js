import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./WorkerMatchingPage.css";

function WorkerMatchingPage() {

  const [searchParams] = useSearchParams();

  const jobId = searchParams.get("jobId");

  const [job, setJob] = useState(null);
  const [workers, setWorkers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [requestingWorker, setRequestingWorker] =
    useState(null);

  const [error, setError] = useState("");


  // ==========================================
  // LOAD JOB + WORKERS
  // ==========================================

  useEffect(() => {

    const loadData = async () => {

      try {

        if (!jobId) {
          throw new Error(
            "Job ID is missing."
          );
        }


        // Get job details

        const jobResponse = await fetch(
          `http://localhost:5000/api/jobs/${jobId}`
        );

        const jobData =
          await jobResponse.json();


        if (!jobResponse.ok) {
          throw new Error(
            jobData.message ||
            "Failed to load job"
          );
        }


        setJob(jobData.job);


        // Get matching workers

        const workerResponse =
          await fetch(
            `http://localhost:5000/api/jobs/workers?service=${encodeURIComponent(
              jobData.job.service
            )}`
          );


        const workerData =
          await workerResponse.json();


        if (!workerResponse.ok) {
          throw new Error(
            workerData.message ||
            "Failed to load workers"
          );
        }


        setWorkers(
          workerData.workers || []
        );


      } catch (error) {

        console.error(
          "Matching page error:",
          error
        );

        setError(
          error.message ||
          "Unable to find workers"
        );

      } finally {

        setLoading(false);

      }

    };


    loadData();

  }, [jobId]);


  // ==========================================
  // REQUEST WORKER
  // ==========================================

  const handleRequestWorker = async (
    workerId
  ) => {

    try {

      setRequestingWorker(workerId);
      setError("");


      const response = await fetch(
        `http://localhost:5000/api/jobs/${jobId}/request-worker`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            workerId
          })
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to request worker"
        );

      }


      // Save selected worker

      localStorage.setItem(
        "selectedWorker",
        JSON.stringify(data.job.workerId)
      );


      // Go to booking status page

      window.location.href =
        `/booking-status?jobId=${jobId}`;


    } catch (error) {

      console.error(
        "Request worker error:",
        error
      );

      setError(
        error.message ||
        "Unable to request worker"
      );

    } finally {

      setRequestingWorker(null);

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="matching-page">

        <header className="matching-header">

          <div className="matching-logo">
            LAB<span>WORK</span>
          </div>

          <div className="matching-status">

            <span className="status-dot"></span>

            Finding workers near you

          </div>

        </header>


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
                We're checking available verified
                professionals around your location.
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

        </main>

      </div>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error && !job) {

    return (

      <div className="dashboard-error">

        <h2>
          Something went wrong
        </h2>

        <p>
          {error}
        </p>

        <button
          onClick={() =>
            window.location.href = "/booking"
          }
        >
          Go Back
        </button>

      </div>

    );

  }


  return (

    <div className="matching-page">


      {/* HEADER */}

      <header className="matching-header">

        <div className="matching-logo">
          LAB<span>WORK</span>
        </div>

        <div className="matching-status">

          <span className="status-dot"></span>

          Finding workers near you

        </div>

      </header>



      {/* MAIN */}

      <main className="matching-container">


        {/* TOP */}

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
              We're checking available verified
              professionals around your location.
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



        {/* REQUEST SUMMARY */}

        {job && (

          <section className="request-summary">

            <div className="summary-item">

              <span>
                Service
              </span>

              <strong>
                {job.service}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Location
              </span>

              <strong>
                📍 {job.location}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Required
              </span>

              <strong>
                As soon as possible
              </strong>

            </div>

          </section>

        )}



        {/* ERROR */}

        {error && (

          <div className="booking-error">
            ⚠️ {error}
          </div>

        )}



        {/* WORKERS HEADING */}

        <div className="workers-heading">

          <div>

            <span>
              AVAILABLE PROFESSIONALS
            </span>

            <h2>
              Workers near you
            </h2>

          </div>


          <div className="worker-count">

            {workers.length}{" "}

            {workers.length === 1
              ? "worker"
              : "workers"}{" "}

            found

          </div>

        </div>



        {/* WORKERS */}

        {workers.length === 0 ? (

          <div className="empty-workers">

            <div>
              🔎
            </div>

            <h3>
              No workers available right now
            </h3>

            <p>
              We couldn't find an available verified
              professional for this service.
            </p>

          </div>

        ) : (

          <div className="workers-list">


            {workers.map(
              (worker, index) => (

                <div
                  className={
                    index === 0
                      ? "matching-worker-card featured"
                      : "matching-worker-card"
                  }
                  key={worker._id}
                >


                  {/* PROFILE */}

                  <div className="worker-profile">

                    <div
                      className={
                        `matching-avatar ${
                          index % 3 === 0
                            ? "blue-avatar"
                            : index % 3 === 1
                            ? "orange-avatar"
                            : "green-avatar"
                        }`
                      }
                    >

                      {worker.name
                        .split(" ")
                        .map(
                          word =>
                            word
                              .charAt(0)
                              .toUpperCase()
                        )
                        .slice(0, 2)
                        .join("")}

                    </div>


                    <div className="matching-worker-info">

                      <div className="name-row">

                        <h3>
                          {worker.name}
                        </h3>

                        <span className="verified">
                          ✓ Verified
                        </span>

                      </div>


                      <p>
                        {worker.skills &&
                        worker.skills.length
                          ? worker.skills.join(
                              " • "
                            )
                          : job?.service}
                      </p>


                      <div className="worker-rating">

                        <span>
                          ★
                        </span>

                        <strong>
                          4.8
                        </strong>

                        <small>
                          · Professional
                        </small>

                      </div>

                    </div>

                  </div>



                  {/* META */}

                  <div className="worker-meta">

                    <div>

                      <span>
                        Location
                      </span>

                      <strong>
                        {worker.location}
                      </strong>

                    </div>


                    <div>

                      <span>
                        Availability
                      </span>

                      <strong>
                        Available
                      </strong>

                    </div>


                    <div>

                      <span>
                        Experience
                      </span>

                      <strong>
                        {worker.experience}
                      </strong>

                    </div>

                  </div>



                  {/* REQUEST */}

                  <button
                    className="choose-worker"
                    disabled={
                      requestingWorker ===
                      worker._id
                    }
                    onClick={() =>
                      handleRequestWorker(
                        worker._id
                      )
                    }
                  >

                    {requestingWorker ===
                    worker._id
                      ? "Requesting..."
                      : "Request Worker →"}

                  </button>


                </div>

              )
            )}

          </div>

        )}



        {/* SAFETY */}

        <div className="matching-safety">

          <div className="safety-icon">
            ✓
          </div>

          <div>

            <strong>
              Your safety matters
            </strong>

            <p>
              Every worker on LABWORK goes through
              identity and skill verification before
              joining the platform.
            </p>

          </div>

        </div>


      </main>

    </div>

  );

}

export default WorkerMatchingPage;