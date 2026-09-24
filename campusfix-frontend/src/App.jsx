import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [issues, setIssues] = useState([]);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: ''
  });

  // Fetch all issues from the backend
  const fetchIssues = async () => {
    try {
      const response = await fetch('http://localhost:8080/issues');

      if (!response.ok) {
        throw new Error('Failed to fetch issues');
      }

      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  // Fetch issues when the page loads
  useEffect(() => {
    fetchIssues();
  }, []);

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
      const response = await fetch('http://localhost:8080/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          status: 'OPEN'
        })
      });

      if (response.ok) {
        const newIssue = await response.json();

        // Add the newly created issue to the screen
        setIssues((prevIssues) => [...prevIssues, newIssue]);

        alert('Issue submitted successfully!');

        setFormData({
          title: '',
          category: '',
          location: '',
          description: ''
        });

        setShowForm(false);
      } else {
        alert('Failed to submit the issue.');
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Could not connect to the backend.');
    }
  };
  const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/issues/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      // Remove the deleted issue from the screen
      setIssues((prevIssues) =>
        prevIssues.filter((issue) => issue.id !== id)
      );

      alert('Issue deleted successfully.');
    } else {
      alert('Failed to delete the issue.');
    }

  } catch (error) {
    console.error('Error deleting issue:', error);
    alert('Could not connect to the backend.');
  }
};
const handleStatusChange = async (id, newStatus) => {
  try {
    const response = await fetch(
      `http://localhost:8080/issues/${id}/status?status=${newStatus}`,
      {
        method: 'PUT'
      }
    );

    if (response.ok) {
      const updatedIssue = await response.json();

      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue.id === id ? updatedIssue : issue
        )
      );

      alert('Status updated successfully.');
    } else {
      alert('Failed to update status.');
    }

  } catch (error) {
    console.error('Error updating status:', error);
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

        {/* Hero */}
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
          <form
            className="report-form"
            ref={formRef}
            onSubmit={handleSubmit}
          >

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
              required
            />

            <label>Issue Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
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
              required
            />

            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Describe the issue..."
              required
            />

            <button className="submit-btn" type="submit">
              Submit Report
            </button>

          </form>
        )}

        {/* Reported Issues */}
        <section className="issues-section">

          <h2>Reported Issues</h2>

          {issues.length === 0 ? (
            <p>No issues reported yet.</p>
          ) : (
            <div className="issues-list">

              {issues.map((issue) => (
                <div className="issue-card" key={issue.id}>

                  <div className="issue-card-header">
  <h3>{issue.title}</h3>

  <select
    className="status-select"
    value={issue.status}
    onChange={(e) =>
      handleStatusChange(issue.id, e.target.value)
    }
  >
    <option value="OPEN">OPEN</option>
    <option value="IN_PROGRESS">IN PROGRESS</option>
    <option value="RESOLVED">RESOLVED</option>
  </select>
</div>

                  <p>
                    <strong>Category:</strong> {issue.category}
                  </p>

                  <p>
                    <strong>Location:</strong> {issue.location}
                  </p>

                  <p>
                    <strong>Description:</strong> {issue.description}
                  </p>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(issue.id)}
                  >
                    Delete
                  </button>

                </div>
              ))}

            </div>
          )}

        </section>

      </main>

    </div>
  );
}

export default App;