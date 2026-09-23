import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
};
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:8080/api/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const message = await response.text();

    if (response.ok) {
      alert(message);

      setFormData({
        title: '',
        category: '',
        location: '',
        description: ''
      });
    } else {
      alert('Failed to submit the issue.');
    }

  } catch (error) {
    console.error('Error:', error);
    alert('Could not connect to the backend.');
  }
};
  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <h1>CampusFix</h1>
        <p>Smart Campus Issue Reporting System</p>
      </header>

      {/* Main Content */}
      <main className="main-content">

        <section className="hero">
          <h2>Report. Track. Resolve.</h2>

          <p>
            Help make our campus better by reporting issues quickly and easily.
          </p>

          <button
            className="report-btn"
            onClick={() => {
              setShowForm(true);
              setTimeout(() => {
                formRef.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }, 100);
            }}
          >
            Report an Issue
          </button>
        </section>

        {/* Feature Cards */}
        <section className="features">

          <div className="feature-card">
            <h3>📍 Report Issues</h3>
            <p>
              Report infrastructure and campus-related problems.
            </p>
          </div>

          <div className="feature-card">
            <h3>🔍 Track Status</h3>
            <p>
              Keep track of your reported issues and their progress.
            </p>
          </div>

          <div className="feature-card">
            <h3>⚡ Quick Resolution</h3>
            <p>
              Help authorities identify and resolve issues efficiently.
            </p>
          </div>

        </section>

        {/* Report Form */}
        {showForm && (
          <form className="report-form" ref={formRef} onSubmit={handleSubmit}>

            <div className="form-header">
              <h2>Report a Campus Issue</h2>

              <button
                type="button"
                className="close-btn"
                onClick={() => setShowForm(false)}
              >
                ✕
              </button>
            </div>

            <label>Issue Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Example: Water leakage near Block A"
            />

            <label>Issue Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option>Infrastructure</option>
              <option>Electrical</option>
              <option>Water & Sanitation</option>
              <option>Cleanliness</option>
              <option>Safety</option>
              <option>Other</option>
            </select>

            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Example: Block A, First Floor"
            />

            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Describe the issue..."
            ></textarea>

            <button className="submit-btn" type="submit">
              Submit Report
            </button>

          </form>
        )}

      </main>

    </div>
  );
}

export default App;