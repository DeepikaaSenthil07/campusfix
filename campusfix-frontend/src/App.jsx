import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const formRef = useRef(null);
  const detailsRef = useRef(null);

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
    priority: ''
  });

  // Fetch all issues from backend
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

  // Fetch issues when page loads
  useEffect(() => {
    fetchIssues();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Submit new issue
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.category ||
      !formData.priority ||
      !formData.location.trim() ||
      !formData.description.trim()
    ) {
      alert('Please fill in all fields.');
      return;
    }

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

        setIssues((prevIssues) => [...prevIssues, newIssue]);

        alert('Issue submitted successfully!');

        setFormData({
          title: '',
          category: '',
          location: '',
          description: '',
          priority: ''
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

  // Delete issue
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/issues/${id}`,
        {
          method: 'DELETE'
        }
      );

      if (response.ok) {
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
  const handleViewIssue = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/issues/${id}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch issue');
    }

    const issue = await response.json();

    setSelectedIssue(issue);

  } catch (error) {
    console.error('Error fetching issue:', error);
    alert('Could not load issue details.');
  }
};

  // Change issue status
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

  // Filter issues
  const filteredIssues = issues.filter((issue) => {
    const statusMatches =
      statusFilter === 'ALL' ||
      issue.status === statusFilter;

    const priorityMatches =
      priorityFilter === 'ALL' ||
      (priorityFilter === 'NONE'
        ? !issue.priority
        : issue.priority === priorityFilter);

    const categoryMatches =
      categoryFilter === 'ALL' ||
      issue.category === categoryFilter;

    return (
      statusMatches &&
      priorityMatches &&
      categoryMatches
    );
  });

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <h1>CampusFix</h1>
        <p>Smart Campus Issue Reporting System</p>
      </header>

      <main className="main-content">

        {/* Hero Section */}
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
        {/* Issue Details */}
{selectedIssue && (
  <section
    className="issue-details"
    ref={detailsRef}
  >
    <div className="issue-details-header">
      <h2>Issue Details</h2>

      <button
        className="close-btn"
        onClick={() => setSelectedIssue(null)}
      >
        ✕
      </button>
    </div>

    <h3>{selectedIssue.title}</h3>

    <p>
      <strong>Category:</strong> {selectedIssue.category}
    </p>

    <p>
      <strong>Location:</strong> {selectedIssue.location}
    </p>

    <p>
      <strong>Description:</strong> {selectedIssue.description}
    </p>

    <p>
      <strong>Status:</strong> {selectedIssue.status}
    </p>

    <p>
      <strong>Priority:</strong>{' '}
      {selectedIssue.priority || 'Not Specified'}
    </p>

    <button
      className="close-details-btn"
      onClick={() => setSelectedIssue(null)}
    >
      Close
    </button>
  </section>
)}
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

            <label>Priority</label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select priority</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
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

            <button
              className="submit-btn"
              type="submit"
            >
              Submit Report
            </button>

          </form>
        )}

        {/* Reported Issues */}
        <section className="issues-section">

          <div className="issues-heading">
            <h2>Reported Issues</h2>

            <p>
              Showing {filteredIssues.length} of {issues.length} issues
            </p>
          </div>

          {/* Filters */}
          <div className="filters">

            <div className="filter-group">
              <label>Status</label>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="ALL">All</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Priority</label>

              <select
                value={priorityFilter}
                onChange={(e) =>
                  setPriorityFilter(e.target.value)
                }
              >
                <option value="ALL">All</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
                <option value="NONE">Not Specified</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Category</label>

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value)
                }
              >
                <option value="ALL">All</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Electrical">Electrical</option>
                <option value="Water & Sanitation">
                  Water & Sanitation
                </option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Safety">Safety</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button
              className="clear-filter-btn"
              onClick={() => {
                setStatusFilter('ALL');
                setPriorityFilter('ALL');
                setCategoryFilter('ALL');
              }}
            >
              Clear Filters
            </button>

          </div>

          {/* Issue Cards */}
          {filteredIssues.length === 0 ? (

            <p className="no-issues">
              No issues match the selected filters.
            </p>

          ) : (

            <div className="issues-list">

              {filteredIssues.map((issue) => (

                <div
                  className="issue-card"
                  key={issue.id}
                >

                  <div className="issue-card-header">

                    <h3>{issue.title}</h3>

                    <select
                      className="status-select"
                      value={issue.status}
                      onChange={(e) =>
                        handleStatusChange(
                          issue.id,
                          e.target.value
                        )
                      }
                    >
                      <option value="OPEN">
                        OPEN
                      </option>

                      <option value="IN_PROGRESS">
                        IN PROGRESS
                      </option>

                      <option value="RESOLVED">
                        RESOLVED
                      </option>
                    </select>

                  </div>

                  <p>
                    <strong>Category:</strong>{' '}
                    {issue.category}
                  </p>

                  <p>
                    <strong>Priority:</strong>{' '}
                    {issue.priority || 'Not specified'}
                  </p>

                  <p>
                    <strong>Location:</strong>{' '}
                    {issue.location}
                  </p>

                  <p>
                    <strong>Description:</strong>{' '}
                    {issue.description}
                  </p>

                  <div className="issue-actions">
  <button
  onClick={() => {
    setSelectedIssue(issue);

    setTimeout(() => {
      detailsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  }}
>
  View Details
</button>

  <button
    className="delete-btn"
    onClick={() => handleDelete(issue.id)}
  >
    Delete
  </button>
</div>

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