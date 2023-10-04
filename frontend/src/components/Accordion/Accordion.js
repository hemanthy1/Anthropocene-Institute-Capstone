import React,{useState} from 'react'
import "./Accordion.css"
import faqcaret from '../../assets/faqcaret.png'





function Accordion({faq,index, toggleFAQ}) {

  return (
    <div className={"faq " + (faq.open ? 'open' : '')} key={index} onClick={()=> toggleFAQ(index)}>
        <Line></Line>
      <div className="faq-question" >
        {faq.question}
          <CaretImage isOpen={faq.open}></CaretImage>
      </div>
      <div className="faq-answer">
          {faq.answer}
      </div>
    </div>
  );

}
function CaretImage({ isOpen }) {
    const imageClass = isOpen ? 'rotate' : '';
  return (
      <img
        src={faqcaret}
        alt="FAQ caret Image"
        loading="lazy"
        id="faqcaret"
        className={imageClass}
      />
  );
}


function Line() {
  return (
    <div className="line"></div>
  );
}


export default Accordion