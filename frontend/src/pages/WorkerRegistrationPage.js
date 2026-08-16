import { useState } from "react";
import "./WorkerRegistrationPage.css";

function WorkerRegistrationPage() {

  const [workerData, setWorkerData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
    skills: [],
    experience: "",
    location: "",
    availability: "available"
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setWorkerData({
      ...workerData,
      [name]: value
    });

  };


  // ==========================================
  // SELECT / UNSELECT SKILL
  // ==========================================

  const handleSkill = (skill) => {

    const alreadySelected =
      workerData.skills.includes(skill);

    setWorkerData({

      ...workerData,

      skills: alreadySelected

        ? workerData.skills.filter(
            (item) => item !== skill
          )

        : [
            ...workerData.skills,
            skill
          ]

    });

  };


  // ==========================================
  // AVAILABILITY
  // ==========================================

  const handleAvailability = (availability) => {

    setWorkerData({

      ...workerData,

      availability

    });

  };


  // ==========================================
  // SUBMIT WORKER
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");


    // ------------------------------------------
    // REQUIRED FIELD VALIDATION
    // ------------------------------------------

    if (
      !workerData.name ||
      !workerData.phone ||
      !workerData.password ||
      !workerData.confirmPassword ||
      !workerData.skills.length ||
      !workerData.experience ||
      !workerData.location
    ) {

      setError(
        "Please fill all required fields and select at least one skill."
      );

      setLoading(false);

      return;

    }

    // EMAIL VALIDATION

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (
  !workerData.email ||
  !emailRegex.test(workerData.email)
) {
  setError(
    "Please enter a valid email address."
  );

  setLoading(false);

  return;
}


    // ------------------------------------------
    // PASSWORD LENGTH
    // ------------------------------------------

    if (workerData.password.length < 6) {

      setError(
        "Password must be at least 6 characters."
      );

      setLoading(false);

      return;

    }


    // ------------------------------------------
    // PASSWORD MATCH
    // ------------------------------------------

    if (
      workerData.password !==
      workerData.confirmPassword
    ) {

      setError(
        "Passwords do not match."
      );

      setLoading(false);

      return;

    }


    try {

      // ----------------------------------------
      // DATA FOR BACKEND
      // ----------------------------------------

      const registrationData = {

        name: workerData.name,

        phone: workerData.phone,

        email: workerData.email,

        age: workerData.age,

        password: workerData.password,

        skills: workerData.skills,

        experience: workerData.experience,

        location: workerData.location,

        availability:
          workerData.availability

      };


      // ----------------------------------------
      // API REQUEST
      // ----------------------------------------

      const response = await fetch(

        "http://localhost:5000/api/workers/register",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify(
              registrationData
            )

        }

      );


      const data =
        await response.json();


      // ----------------------------------------
      // CHECK RESPONSE
      // ----------------------------------------

      if (!response.ok) {

        throw new Error(

          data.message ||
          "Registration failed"

        );

      }


      console.log(
        "Worker saved:",
        data
      );


      // ----------------------------------------
      // SUCCESS MESSAGE
      // ----------------------------------------

      setMessage(
        "Worker registered successfully ✅"
      );


      // ----------------------------------------
      // RESET FORM
      // ----------------------------------------

      setWorkerData({

        name: "",

        phone: "",

        email: "",

        age: "",

        password: "",

        confirmPassword: "",

        skills: [],

        experience: "",

        location: "",

        availability: "available"

      });


    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      setError(

        error.message ||
        "Something went wrong. Please try again."

      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="worker-register-page">


      {/* =====================================
          HEADER
      ====================================== */}

      <header className="worker-register-header">


        <div className="register-logo">

          LAB<span>WORK</span>

        </div>


        <div className="worker-login">

          Already registered?

          <a href="/worker/login">

            Login

          </a>

        </div>


      </header>



      {/* =====================================
          MAIN
      ====================================== */}

      <main className="register-container">


        {/* ===================================
            HEADING
        ==================================== */}

        <div className="register-heading">


          <span>
            BECOME A LABWORK PROFESSIONAL
          </span>


          <h1>

            Turn your skills into

            <br />

            <span>
              more opportunities.
            </span>

          </h1>


          <p>

            Create your professional profile and
            start receiving job requests from
            customers near you.

          </p>


        </div>



        {/* ===================================
            PROGRESS
        ==================================== */}

        <div className="register-progress">


          <div className="progress-step active">

            <span>01</span>

            <p>
              Basic Details
            </p>

          </div>


          <div className="progress-line"></div>


          <div className="progress-step">

            <span>02</span>

            <p>
              Skills
            </p>

          </div>


          <div className="progress-line"></div>


          <div className="progress-step">

            <span>03</span>

            <p>
              Verification
            </p>

          </div>


        </div>



        {/* ===================================
            BASIC DETAILS
        ==================================== */}

        <section className="register-card">


          <div className="register-card-heading">


            <div className="card-number">
              01
            </div>


            <div>

              <h2>
                Tell us about yourself
              </h2>

              <p>
                We'll use these details to create
                your professional profile.
              </p>

            </div>


          </div>



          <div className="form-grid">


            {/* NAME */}

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input

                type="text"

                name="name"

                placeholder="Enter your full name"

                value={
                  workerData.name
                }

                onChange={
                  handleChange
                }

              />

            </div>



            {/* PHONE */}

            <div className="form-group">

              <label>
                Mobile Number
              </label>

              <input

                type="tel"

                name="phone"

                placeholder="Enter your mobile number"

                value={
                  workerData.phone
                }

                onChange={
                  handleChange
                }

              />

            </div>



            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input

                type="email"

                name="email"

                placeholder="Enter your email address"

                value={
                  workerData.email
                }

                onChange={
                  handleChange
                }

              />

            </div>



            {/* AGE */}

            <div className="form-group">

              <label>
                Age
              </label>

              <input

                type="number"

                name="age"

                placeholder="Enter your age"

                value={
                  workerData.age
                }

                onChange={
                  handleChange
                }

              />

            </div>



            {/* PASSWORD */}

            <div className="form-group">

              <label>
                Password
              </label>

              <input

                type="password"

                name="password"

                placeholder="Create a password"

                value={
                  workerData.password
                }

                onChange={
                  handleChange
                }

              />

            </div>



            {/* CONFIRM PASSWORD */}

            <div className="form-group">

              <label>
                Confirm Password
              </label>

              <input

                type="password"

                name="confirmPassword"

                placeholder="Confirm your password"

                value={
                  workerData.confirmPassword
                }

                onChange={
                  handleChange
                }

              />

            </div>


          </div>


        </section>



        {/* ===================================
            SKILLS
        ==================================== */}

        <section className="register-card">


          <div className="register-card-heading">


            <div className="card-number">
              02
            </div>


            <div>

              <h2>
                Your professional skills
              </h2>

              <p>
                Select the services you can
                provide professionally.
              </p>

            </div>


          </div>



          <div className="skill-grid">


            {/* ELECTRICIAN */}

            <button

              type="button"

              className={`skill-option ${
                workerData.skills.includes(
                  "Electrician"
                )
                  ? "active"
                  : ""
              }`}

              onClick={() =>
                handleSkill(
                  "Electrician"
                )
              }

            >

              <span>
                ⚡
              </span>

              Electrician

            </button>



            {/* PLUMBER */}

            <button

              type="button"

              className={`skill-option ${
                workerData.skills.includes(
                  "Plumber"
                )
                  ? "active"
                  : ""
              }`}

              onClick={() =>
                handleSkill(
                  "Plumber"
                )
              }

            >

              <span>
                🚰
              </span>

              Plumber

            </button>



            {/* CARPENTER */}

            <button

              type="button"

              className={`skill-option ${
                workerData.skills.includes(
                  "Carpenter"
                )
                  ? "active"
                  : ""
              }`}

              onClick={() =>
                handleSkill(
                  "Carpenter"
                )
              }

            >

              <span>
                🪚
              </span>

              Carpenter

            </button>



            {/* PAINTER */}

            <button

              type="button"

              className={`skill-option ${
                workerData.skills.includes(
                  "Painter"
                )
                  ? "active"
                  : ""
              }`}

              onClick={() =>
                handleSkill(
                  "Painter"
                )
              }

            >

              <span>
                🎨
              </span>

              Painter

            </button>



            {/* AC TECHNICIAN */}

            <button

              type="button"

              className={`skill-option ${
                workerData.skills.includes(
                  "AC Technician"
                )
                  ? "active"
                  : ""
              }`}

              onClick={() =>
                handleSkill(
                  "AC Technician"
                )
              }

            >

              <span>
                ❄️
              </span>

              AC Technician

            </button>



            {/* CLEANER */}

            <button

              type="button"

              className={`skill-option ${
                workerData.skills.includes(
                  "Cleaner"
                )
                  ? "active"
                  : ""
              }`}

              onClick={() =>
                handleSkill(
                  "Cleaner"
                )
              }

            >

              <span>
                🧹
              </span>

              Cleaner

            </button>



            {/* MASON */}

            <button

              type="button"

              className={`skill-option ${
                workerData.skills.includes(
                  "Mason"
                )
                  ? "active"
                  : ""
              }`}

              onClick={() =>
                handleSkill(
                  "Mason"
                )
              }

            >

              <span>
                🧱
              </span>

              Mason

            </button>



            {/* GENERAL LABOUR */}

            <button

              type="button"

              className={`skill-option ${
                workerData.skills.includes(
                  "General Labour"
                )
                  ? "active"
                  : ""
              }`}

              onClick={() =>
                handleSkill(
                  "General Labour"
                )
              }

            >

              <span>
                🔨
              </span>

              General Labour

            </button>


          </div>



          {/* EXPERIENCE */}

          <div className="experience-box">

            <label>
              Years of experience
            </label>


            <select

              name="experience"

              value={
                workerData.experience
              }

              onChange={
                handleChange
              }

            >

              <option value="">
                Select experience
              </option>

              <option value="Less than 1 year">
                Less than 1 year
              </option>

              <option value="1 - 3 years">
                1 - 3 years
              </option>

              <option value="3 - 5 years">
                3 - 5 years
              </option>

              <option value="5 - 10 years">
                5 - 10 years
              </option>

              <option value="10+ years">
                10+ years
              </option>

            </select>

          </div>


        </section>



        {/* ===================================
            LOCATION
        ==================================== */}

        <section className="register-card">


          <div className="register-card-heading">


            <div className="card-number">
              03
            </div>


            <div>

              <h2>
                Where do you work?
              </h2>

              <p>
                We'll show you job requests close
                to your location.
              </p>

            </div>


          </div>



          <div className="form-group">


            <label>
              Service Location
            </label>


            <div className="location-field">


              <span>
                📍
              </span>


              <input

                type="text"

                name="location"

                placeholder="Enter your city or area"

                value={
                  workerData.location
                }

                onChange={
                  handleChange
                }

              />


              <button
                type="button"
              >

                Use my location

              </button>


            </div>


          </div>



          <div className="area-note">


            <span>
              💡
            </span>


            <p>

              Don't worry. Your exact home address
              will never be shown publicly to customers.

            </p>


          </div>


        </section>



        {/* ===================================
            AVAILABILITY
        ==================================== */}

        <section className="register-card">


          <div className="register-card-heading">


            <div className="card-number">
              04
            </div>


            <div>

              <h2>
                When are you available?
              </h2>

              <p>
                You can change your availability anytime.
              </p>

            </div>


          </div>



          <div className="availability-options">


            {/* AVAILABLE */}

            <button

              type="button"

              className={`availability-option ${
                workerData.availability ===
                "available"
                  ? "active"
                  : ""
              }`}

              onClick={() =>
                handleAvailability(
                  "available"
                )
              }

            >

              <strong>
                🟢 Available Now
              </strong>

              <span>
                Receive nearby job requests
              </span>

            </button>



            {/* PART TIME */}

            <button

              type="button"

              className={`availability-option ${
                workerData.availability ===
                "part-time"
                  ? "active"
                  : ""
              }`}

              onClick={() =>
                handleAvailability(
                  "part-time"
                )
              }

            >

              <strong>
                🕐 Part Time
              </strong>

              <span>
                Choose your working hours
              </span>

            </button>



            {/* FLEXIBLE */}

            <button

              type="button"

              className={`availability-option ${
                workerData.availability ===
                "flexible"
                  ? "active"
                  : ""
              }`}

              onClick={() =>
                handleAvailability(
                  "flexible"
                )
              }

            >

              <strong>
                📅 Flexible
              </strong>

              <span>
                Work when you want
              </span>

            </button>


          </div>


        </section>



        {/* ===================================
            VERIFICATION
        ==================================== */}

        <section className="register-card">


          <div className="register-card-heading">


            <div className="card-number">
              05
            </div>


            <div>

              <h2>
                Identity verification
              </h2>

              <p>
                Verification helps us maintain a
                trusted professional network.
              </p>

            </div>


          </div>



          <div className="verification-box">


            <div className="verification-icon">
              ✓
            </div>


            <div>

              <strong>
                Identity verification
              </strong>

              <p>

                You'll need to verify your identity
                before receiving customer jobs.

              </p>

            </div>


            <button
              type="button"
            >

              Start verification

            </button>


          </div>


        </section>



        {/* ===================================
            SUBMIT
        ==================================== */}

        <div className="register-submit">


          <div>

            <strong>
              Ready to join LABWORK?
            </strong>

            <span>
              Your application will be reviewed
              before approval.
            </span>

          </div>


          <button

            type="button"

            onClick={
              handleSubmit
            }

            disabled={
              loading
            }

          >

            {loading
              ? "Submitting..."
              : "Submit Application →"
            }

          </button>


        </div>



        {/* ===================================
            SUCCESS MESSAGE
        ==================================== */}

        {message && (

          <div className="form-success">

            {message}

          </div>

        )}



        {/* ===================================
            ERROR MESSAGE
        ==================================== */}

        {error && (

          <div className="form-error">

            {error}

          </div>

        )}


      </main>

    </div>

  );
}

export default WorkerRegistrationPage;