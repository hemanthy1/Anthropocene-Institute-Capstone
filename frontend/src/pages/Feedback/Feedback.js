import "./Feedback.css";

function Feedback() {

  const formSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        feedbackType: formData.get('type'),
        feedback: formData.get('feedback-desc'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email')
    };
    email(data);
  };

  return (
      <form 
        id="feedback-wrap" 
        method="post" 
        encType="multipart/form-data" 
        name="feedback"
        onSubmit={formSubmit}
      >
        <div id="feedback-intro">
          <h1 id="feedback-title"> Feedback Form </h1>
          <p id="feedback-title-blurb"> 
            Thank you for visiting our application! We would love to hear your thoughts,
            suggestions, concerns or problems with anything so we can improve!
          </p>
        </div>

        <div id="feedback-break">
          <hr />
        </div>

        <div id="feedback-type">
          <p className="form-title"> Feedback Type </p>
          <div id="feedback-radio-buttons">
            <span>
              <input type="radio" id="option1" name="type" value="comments" />
              <label htmlFor="option1">Comments</label>
            </span>
            
            <span>
              <input type="radio" id="option2" name="type" value="suggestions" />
              <label htmlFor="option2">Suggestions</label>
            </span>

            <span>
              <input type="radio" id="option3" name="type" value="questions" />
              <label htmlFor="option3">Questions</label>
            </span>
          </div>
        </div>
        <br />

        <div id="feedback-description">
          <p className="form-title"> Your Feedback:<span className="feedback-required">*</span> </p>
          <textarea 
            id="feedback-desc-box" 
            name="feedback-desc" 
            rows="4" cols="50" 
            placeholder="Enter your feedback here..."
            required
          />
        </div>
        <br />

        <div id="feedback-name">
          <p className="form-title"> Name:<span className="feedback-required">*</span> </p>
          <div id="feedback-name-inputs">
            <input className="name-input" type="text" id="firstName" name="firstName" required />
            <input className="name-input" type="text" id="lastName" name="lastName" required />
          </div>
          <div id="feedback-name-labels">
            <label className="name-label" htmlFor="firstName"> First Name </label>
            <label className="name-label" htmlFor="lastName"> Last Name </label>
          </div>
        </div>
        <br />

        <div id="feedback-email">
          <p className="form-title"> Email:<span className="feedback-required">*</span> </p>
          <input
            className="name-input"
            type="text"
            id="email"
            name="email"
            placeholder="name@example.com"
            required />
        </div>
        <br />

        <div id="feedback-break">
          <hr />
        </div>

        <div id="feedback-submit">
          <input id="submit-button" type="submit" value="Submit" />
        </div>

      </form>
  );
}

function email(data) {
  fetch('http://localhost:6001/send-email', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}

export default Feedback;