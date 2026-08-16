import { useEffect, useState } from "react";
import "./WorkerDashboard.css";

function WorkerDashboard() {

  const [worker] = useState(() => {
    const data = localStorage.getItem("workerData");

    return data ? JSON.parse(data) : null;
  });


  const [online, setOnline] = useState(true);

  const [jobs, setJobs] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);

  const [loadingJobs, setLoadingJobs] = useState(true);
  const [completedJobs, setCompletedJobs] = useState([]);
const [loadingCompletedJobs, setLoadingCompletedJobs] =
  useState(true);
  const [stats, setStats] = useState({
  totalJobs: 0,
  completedJobs: 0,
  activeJobs: 0,
  earnings: 0,
  rating: 0,
  successRate: 0
});

  const [acceptingJob, setAcceptingJob] = useState(null);

  const [error, setError] = useState("");


  // ==========================================
  // GET WORKER REQUESTS
  // ==========================================

  const fetchJobs = async () => {

    try {

      const token =
        localStorage.getItem("workerToken");


      if (!token) {
        return;
      }


      const response = await fetch(
        "http://localhost:5000/api/jobs/my-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to load job requests"
        );

      }


      setJobs(data.jobs || []);

      setError("");


    } catch (error) {

      console.error(
        "Fetch worker jobs error:",
        error
      );

      setError(
        error.message ||
        "Unable to load job requests"
      );

    } finally {

      setLoadingJobs(false);

    }

  };



  // ==========================================
// GET ACTIVE JOBS
// ==========================================

const fetchActiveJobs = async () => {

  try {

    const token =
      localStorage.getItem("workerToken");

    if (!token) {
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/jobs/my-jobs",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        "Failed to load active jobs"
      );
    }

    setActiveJobs(
      data.jobs || []
    );

  } catch (error) {

    console.error(
      "Fetch active jobs error:",
      error
    );

  }

};


const fetchWorkerStats = async () => {
  try {

    const token =
      localStorage.getItem("workerToken");

    if (!token) {
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/workers/stats",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (response.ok) {
      setStats(data);
    } else {
      console.error(data.message);
    }

  } catch (error) {

    console.error(
      "Failed to fetch worker stats:",
      error
    );

  }
};
const fetchCompletedJobs = async () => {
  try {

    const token =
      localStorage.getItem("workerToken");

    if (!token) {
      setLoadingCompletedJobs(false);
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/workers/completed-jobs",
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (response.ok) {

      setCompletedJobs(
        data.jobs || []
      );

    } else {

      console.error(
        data.message
      );

    }

  } catch (error) {

    console.error(
      "Failed to fetch completed jobs:",
      error
    );

  } finally {

    setLoadingCompletedJobs(false);

  }
};
// ==========================================
// UPDATE JOB STATUS
// ==========================================

const handleJobStatus = async (
  jobId,
  status
) => {

  try {

    const token =
      localStorage.getItem("workerToken");

    const response = await fetch(
      `http://localhost:5000/api/jobs/${jobId}/status`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          status: status
        })
      }
    );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Failed to update job status"
      );

    }


    alert(data.message);


    // Refresh active jobs

    fetchActiveJobs();


  } catch (error) {

    console.error(
      "Update status error:",
      error
    );

    setError(
      error.message ||
      "Unable to update job status"
    );

  }

};


  // ==========================================
  // LOAD JOBS
  // ==========================================

  useEffect(() => {

    if (!worker) {
      return;
    }


    fetchJobs();
    fetchActiveJobs();
    fetchWorkerStats();
    fetchCompletedJobs();
    // Check for new requests every 5 seconds

    const interval =
      setInterval(() => {
        fetchJobs();
        fetchActiveJobs();
        fetchWorkerStats();
        fetchCompletedJobs();
      }, 5000);


    return () => {
      clearInterval(interval);
    };

  }, [worker]);


  // ==========================================
  // ACCEPT JOB
  // ==========================================

  const handleAcceptJob = async (jobId) => {

    try {

      const token =
        localStorage.getItem("workerToken");


      setAcceptingJob(jobId);

      setError("");


      const response = await fetch(
        `http://localhost:5000/api/jobs/${jobId}/accept`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to accept job"
        );

      }


      // Remove accepted job from
      // pending requests

      setJobs((currentJobs) =>
        currentJobs.filter(
          (job) => job._id !== jobId
        )
      );


      alert(
        "Job accepted successfully! ✅"
      );


    } catch (error) {

      console.error(
        "Accept job error:",
        error
      );

      setError(
        error.message ||
        "Unable to accept job"
      );

    } finally {

      setAcceptingJob(null);

    }

  };


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem(
      "workerToken"
    );

    localStorage.removeItem(
      "workerData"
    );

    window.location.href =
      "/worker/login";

  };


  // ==========================================
  // LOGIN CHECK
  // ==========================================

  if (!worker) {

    return (

      <div className="dashboard-error">

        <h2>
          Please login first
        </h2>

        <button
          onClick={() =>
            window.location.href =
              "/worker/login"
          }
        >
          Go to Login
        </button>

      </div>

    );

  }


  return (

    <div className="worker-dashboard">


      {/* ======================================
          SIDEBAR
      ====================================== */}

      <aside className="dashboard-sidebar">


        <div className="dashboard-logo">
          LAB<span>WORK</span>
        </div>


        <div className="worker-mini-profile">

          <div className="worker-avatar">

            {worker.name
              ?.charAt(0)
              .toUpperCase()}

          </div>


          <div>

            <strong>
              {worker.name}
            </strong>

            <span>
              {worker.skills?.join(" • ")}
            </span>

          </div>

        </div>


        <nav className="dashboard-nav">

          <a
            href="#overview"
            className="active"
          >
            <span>▦</span>
            Overview
          </a>


          <a href="#jobs">

            <span>📋</span>

            Job Requests

          </a>


          <a href="#completed">

            <span>✓</span>

            Completed Jobs
 
          </a>


          <a href="#earnings">

            <span>₹</span>

            Earnings

          </a>


          <a href="#profile">

            <span>👤</span>

            My Profile

          </a>

        </nav>


        <button
          className="logout-button"
          onClick={handleLogout}
        >
          ↪ Logout
        </button>

      </aside>



      {/* ======================================
          MAIN
      ====================================== */}

      <main className="dashboard-main">


        {/* TOP BAR */}

        <header className="dashboard-header">

          <div>

            <span className="dashboard-label">
              WORKER DASHBOARD
            </span>


            <h1>

              Good to see you,{" "}

              {worker.name
                ?.split(" ")[0]} 👋

            </h1>


            <p>
              Manage your work and stay ready
              for new opportunities.
            </p>

          </div>


          <div className="online-control">

            <span
              className={
                online
                  ? "status-dot online"
                  : "status-dot offline"
              }
            ></span>


            <span>

              {online
                ? "You're Online"
                : "You're Offline"}

            </span>


            <button
              onClick={() =>
                setOnline(!online)
              }
            >

              {online
                ? "Go Offline"
                : "Go Online"}

            </button>

          </div>

        </header>



        {/* ======================================
            STATS
        ====================================== */}

        <section className="dashboard-stats">


          <div className="stat-card">

            <span className="stat-icon">
              📋
            </span>

            <div>

              <span>
                Available Jobs
              </span>

             <strong>{stats.totalJobs}</strong>

            </div>

          </div>


          <div className="stat-card">

            <span className="stat-icon">
              ₹
            </span>

            <div>

              <span>
                This Month
              </span>

              <strong>₹{stats.earnings.toLocaleString("en-IN")}</strong>

            </div>

          </div>


          <div className="stat-card">

            <span className="stat-icon">
              ⭐
            </span>

            <div>

              <span>
                Rating
              </span>

              <strong>{stats.rating.toFixed(1)}</strong>

            </div>

          </div>


          <div className="stat-card">

            <span className="stat-icon">
              ✓
            </span>

            <div>

              <span>
                Success Rate
              </span>

              <strong>{stats.successRate}%</strong>

            </div>

          </div>

        </section>



        {/* ======================================
            JOB REQUESTS
        ====================================== */}

        <section
          className="dashboard-section"
          id="jobs"
        >


          <div className="section-heading">

            <div>

              <span>
                NEW OPPORTUNITIES
              </span>

              <h2>
                Job Requests
              </h2>

            </div>


            <button
              onClick={fetchJobs}
            >
              Refresh ↻
            </button>

          </div>



          {/* ERROR */}

          {error && (

            <div className="booking-error">
              ⚠️ {error}
            </div>

          )}



          {/* LOADING */}

          {loadingJobs ? (

            <div className="empty-workers">

              <h3>
                Loading job requests...
              </h3>

              <p>
                Checking for customer requests.
              </p>

            </div>

          ) : jobs.length === 0 ? (

            /* NO JOBS */

            <div className="empty-workers">

              <div>
                🔎
              </div>

              <h3>
                No new jobs right now
              </h3>

              <p>
                We'll show matching customer
                requests here when they need
                your skills.
              </p>

              <button
                onClick={fetchJobs}
              >
                Check Again
              </button>

            </div>

          ) : (

            /* REAL JOBS */

            <div className="job-list">

              {jobs.map((job) => (

                <div
                  className="job-card"
                  key={job._id}
                >


                  {/* ICON */}

                  <div className="job-icon">

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



                  {/* JOB INFO */}

                  <div className="job-info">

                    <h3>
                      {job.service}
                    </h3>


                    <p>
                      {job.description}
                    </p>


                    <span>
                      📍 {job.location}
                    </span>


                    <small>
                      👤 {job.customerName}
                    </small>

                  </div>



                  {/* PRICE */}

                  <div className="job-price">

                    <strong>
                      ₹{job.estimatedPrice || 0}
                    </strong>

                    <span>
                      Estimated
                    </span>

                  </div>



                  {/* ACTIONS */}
<div className="job-actions">
                  <button
  className="decline"
  onClick={async () => {

    const token =
      localStorage.getItem("workerToken");

    try {

      const response = await fetch(
        `http://localhost:5000/api/jobs/${job._id}/decline`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Failed to decline job"
        );

        return;
      }


      // Remove from worker dashboard

      setJobs((currentJobs) =>
        currentJobs.filter(
          (item) =>
            item._id !== job._id
        )
      );


      alert(
        "Job declined successfully"
      );


    } catch (error) {

      console.error(
        "Decline job error:",
        error
      );

      alert(
        "Failed to decline job"
      );

    }

  }}
>
  Decline
</button>


                    <button
                      className="accept"
                      disabled={
                        acceptingJob ===
                        job._id
                      }
                      onClick={() =>
                        handleAcceptJob(
                          job._id
                        )
                      }
                    >

                      {acceptingJob ===
                      job._id
                        ? "Accepting..."
                        : "Accept Job"}

                    </button>

                  </div>


                </div>

              ))}

            </div>

          )}

        </section>

{/* ======================================
    ACTIVE JOBS
====================================== */}

<section
  className="dashboard-section"
  id="active-jobs"
>

  <div className="section-heading">

    <div>

      <span>
        YOUR WORK
      </span>

      <h2>
        Active Jobs
      </h2>

    </div>

  </div>


  {activeJobs.length === 0 ? (

    <div className="empty-workers">

      <div>
        ✓
      </div>

      <h3>
        No active jobs
      </h3>

      <p>
        Accepted jobs will appear here.
      </p>

    </div>

  ) : (

    <div className="job-list">

      {activeJobs.map((job) => (

        <div
          className="job-card"
          key={job._id}
        >

          <div className="job-icon">
            ⚡
          </div>


          <div className="job-info">

            <h3>
              {job.service}
            </h3>

            <p>
              {job.description}
            </p>

            <span>
              📍 {job.location}
            </span>

            <small>
              👤 {job.customerName}
            </small>

          </div>


          <div className="job-price">

            <strong>
              ₹{job.estimatedPrice}
            </strong>

            <span>
              Estimated
            </span>

          </div>


          <div className="job-actions">

            {job.status === "accepted" && (

              <button
                className="accept"
                onClick={() =>
                  handleJobStatus(
                    job._id,
                    "in_progress"
                  )
                }
              >
                Start Job
              </button>

            )}


            {job.status === "in_progress" && (

              <button
                className="accept"
                onClick={() =>
                  handleJobStatus(
                    job._id,
                    "completed"
                  )
                }
              >
                Complete Job
              </button>

            )}

          </div>


        </div>

      ))}

    </div>

  )}

</section>

{/* ======================================
    COMPLETED JOBS
====================================== */}

<section
  className="dashboard-section"
  id="completed"
>

  <div className="section-heading">

    <div>

      <span>
        JOB HISTORY
      </span>

      <h2>
        Completed Jobs
      </h2>

    </div>

    <div>
      <strong>
        {completedJobs.length} Jobs
      </strong>
    </div>

  </div>


  {loadingCompletedJobs ? (

    <div className="empty-workers">

      <div>
        ⏳
      </div>

      <h3>
        Loading completed jobs...
      </h3>

      <p>
        Getting your completed work history.
      </p>

    </div>

  ) : completedJobs.length === 0 ? (

    <div className="empty-workers">

      <div>
        📋
      </div>

      <h3>
        No completed jobs yet
      </h3>

      <p>
        Your completed jobs will appear here.
      </p>

    </div>

  ) : (

    <div className="job-list">

      {completedJobs.map((job) => (

        <div
          className="job-card"
          key={job._id}
        >

          {/* SERVICE ICON */}

          <div className="job-icon">

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


          {/* JOB INFO */}

          <div className="job-info">

            <h3>
              {job.service}
            </h3>

            <p>
              {job.description}
            </p>

            <span>
              📍 {job.location}
            </span>

            <small>
              👤 {job.customerName}
            </small>

          </div>


          {/* PRICE */}

          <div className="job-price">

            <strong>
              ₹{job.estimatedPrice || 0}
            </strong>

            <span>
              Earned
            </span>

          </div>


          {/* REVIEW */}

          <div className="job-review">

            {job.rating ? (

              <>
                <div className="review-stars">

                  {"★".repeat(job.rating)}
                  {"☆".repeat(5 - job.rating)}

                </div>

                <p>
                  {job.review
                    ? `"${job.review}"`
                    : "No written review"}
                </p>
              </>

            ) : (

              <span>
                No review yet
              </span>

            )}

          </div>


          {/* COMPLETED STATUS */}

          <div className="completed-status">

            <span>
              ✓ Completed
            </span>

            <small>
              {new Date(
                job.updatedAt
              ).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                }
              )}
            </small>

          </div>

        </div>

      ))}

    </div>

  )}

</section>


{/* ======================================
    EARNINGS
====================================== */}

<section
  className="dashboard-section"
  id="earnings"
>

  <div className="section-heading">

    <div>

      <span>
        FINANCIAL OVERVIEW
      </span>

      <h2>
        Earnings
      </h2>

    </div>

    <div className="earnings-period">
      August 2026
    </div>

  </div>


  {/* Earnings Summary */}

  <div className="earnings-summary">

    <div className="earnings-main-card">

      <div className="earnings-icon">
        ₹
      </div>

      <div>

        <span>
          This Month
        </span>

        <h3>
          ₹{stats.earnings.toLocaleString("en-IN")}
        </h3>

        <p>
          From completed jobs
        </p>

      </div>

    </div>


    <div className="earnings-small-card">

      <span>
        Completed Jobs
      </span>

      <strong>
        {stats.completedJobs}
      </strong>

      <small>
        Jobs completed
      </small>

    </div>


    <div className="earnings-small-card">

      <span>
        Average per Job
      </span>

      <strong>
        ₹
        {stats.completedJobs > 0
          ? Math.round(
              stats.earnings /
              stats.completedJobs
            ).toLocaleString("en-IN")
          : 0}
      </strong>

      <small>
        Average earning
      </small>

    </div>

  </div>


  {/* Earnings Details */}

  <div className="earnings-details">

    <div className="earnings-details-header">

      <div>

        <span>
          RECENT COMPLETED WORK
        </span>

        <h3>
          Earnings History
        </h3>

      </div>

      <span className="earnings-count">
        {completedJobs.length} jobs
      </span>

    </div>


    {completedJobs.length === 0 ? (

      <div className="earnings-empty">

        <div>
          ₹
        </div>

        <h3>
          No earnings yet
        </h3>

        <p>
          Complete your first job to start
          earning.
        </p>

      </div>

    ) : (

      <div className="earnings-list">

        {completedJobs.slice(0, 5).map((job) => (

          <div
            className="earning-row"
            key={job._id}
          >

            <div className="earning-service-icon">
              ⚡
            </div>


            <div className="earning-job-info">

              <strong>
                {job.service}
              </strong>

              <span>
                {job.customerName}
              </span>

              <small>
                📍 {job.location}
              </small>

            </div>


            <div className="earning-date">

              <span>
                Completed
              </span>

              <small>
                {new Date(
                  job.updatedAt
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  }
                )}
              </small>

            </div>


            <div className="earning-amount">

              <strong>
                ₹{(
                  job.estimatedPrice || 0
                ).toLocaleString("en-IN")}
              </strong>

              <span>
                Earned
              </span>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>

</section>

        {/* ======================================
            PROFILE
        ====================================== */}

        <section
          className="profile-summary"
          id="profile"
        >

          <div>

            <span>
              YOUR PROFILE
            </span>

            <h2>
              {worker.name}
            </h2>

            <p>
              {worker.skills?.join(" • ")}
            </p>

          </div>


          <div className="profile-details">

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
                Experience
              </span>

              <strong>
                {worker.experience ||
                  "Professional"}
              </strong>

            </div>


            <div>

              <span>
                Status
              </span>

              <strong className="approved">
                ✓ Verified
              </strong>

            </div>

          </div>

        </section>


      </main>

    </div>

  );

}

export default WorkerDashboard;