import "./FeedbackSubmission.css"

function FeedbackSubmission() {

  const handleReturn = () => {
    window.location.href = "/feedback"
  }

  const handleHome = () => {
    window.location.href = "/"
  }

  return (
    <div id="submission-wrapper">
      <h2 id="submission-header"> Thank you for your submission, we really value the feedback! </h2>
      <div onClick={handleReturn} className="feedback-submission-button">
        Submit another form
      </div>
      <div onClick={handleHome} className="feedback-submission-button">
        Return to home
      </div>
    </div>
  );
}

export default FeedbackSubmission;