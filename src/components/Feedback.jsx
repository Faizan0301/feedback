import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { FaStar } from 'react-icons/fa';
function Feedback() {

  const [star, setStar] = useState(0)
  const [feedback, setFeedback] = useState({});
  let [feedbackData, setFeedbackData] = useState([]);

  useEffect(()=>{
    let data=JSON.parse(localStorage.getItem("feedback")) || [];
    setFeedbackData(data)
  },[])

  let handelStar = (star) => {
    setStar(star)
    setFeedback({ ...feedback, ['star']: star })
  }

  let handelInput = (e) => {
    let { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value })
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    let newFeedback = [...feedbackData, feedback];
    setFeedbackData(newFeedback)
    localStorage.setItem("feedback", JSON.stringify(newFeedback))
    setFeedback({})
    setStar(0)
  }


  return (
    <>
      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-light">
              <div className="card-header">
                <h5 className="card-title text-dark fs-1">Feedback Form</h5>
              </div>
              <div className="card-body">
                <form method='post' onSubmit={ handleSubmit }>
                  <div className="form-group mb-3">
                    <label className="text-dark d-block">Rating:</label>
                    {
                      [...Array(5)].map((v, i) => (
                        <FaStar
                          className='fs-1'
                          color={ star <= i ? "gray" : "gold" }
                          onMouseMove={ () => handelStar(i + 1) }
                        />
                      ))
                    }
                  </div>
                  <div className="form-group mb-3">
                    <label for="name" className="text-dark">Name:</label>
                    <input type="text" className="form-control" name='name' placeholder="Enter your name" onChange={ handelInput } value={ feedback.name || "" } />
                  </div>
                  <div className="form-group mb-3">
                    <label for="feedback" className="text-dark">Feedback:</label>
                    <textarea className="form-control" name='massage' rows="3" placeholder="Enter your feedback" onChange={ handelInput } value={ feedback.massage || "" }></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {
            feedbackData.map((val, idx) => (
              <div className="card w-50">
                <div className="card-body">
                  <h5 className="card-title">{val.name}</h5>
                  <p className="card-text">{val.massage}</p>
                  {
                      [...Array(val.star)].map((v, i) => (
                        <FaStar
                          className='fs-1'
                          color='gold'
                        />
                      ))
                    }
                </div>
              </div>
            ))
          }
        </div>
      </div>

    </>
  )
}

export default Feedback
