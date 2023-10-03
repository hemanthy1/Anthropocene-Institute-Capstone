import React from 'react'
import "./Accordion.css"
import faqcaret from '../../assets/faqcaret.png'
import {Link} from "react-router-dom";




function Accordion({ faq, index }) {

  return (
    <div className={"faq " + (faq.open ? 'open' : '')} key={index} >
      <div className="faq-question" >
        {faq.question}
      </div>
      <div className="faq-answer">
          {faq.answer}
      </div>
    </div>
  );

}
function CaretImage() {
  return (
    <Link to="/caretImage">
      <img
        src={faqcaret}
        alt="FAQ caret Image"
        loading="lazy"
        id="faqcaret"
      />
    </Link>
  );
}


export default Accordion