import React from 'react'
import "./Accordion.css"
import faqcaret from '../../assets/faqcaret.png'
import {Link} from "react-router-dom";




function Accordion({faq,index, toggleFAQ}) {

  return (
    <div className={"faq " + (faq.open ? 'open' : '')} key={index} onClick={()=> toggleFAQ(index)}>
        <Line></Line>
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

function Line() {
  return (
    <div className="line"></div>
  );
}


export default Accordion