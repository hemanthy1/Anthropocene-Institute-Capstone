import React, {useState} from 'react'
import Accordion from "../../components/Accordion/Accordion";
import  "../../components/Accordion/Accordion.css";


function Faq() {
  const[faqs,setfaqs]= useState([
    {

      question: 'A really great frequent question here',
      answer: 'An even better answer here',
      open: true

    },
    {
      question: 'A really great frequent question here',
      answer: 'An even better answer here',
      open: false
    },
    {
      question: 'A really great frequent question here',
      answer: 'An even better answer here',
      open: false

    }

  ])

  const toggleFAQ = index =>{
    setfaqs(faqs.map((faq, i) => {
      if (i===index){
        faq.open = !faq.open
      }else{
        faq.open=false;
      }
      return faq;
    }))
  }
  return (
      <div className="faqs">
        <div className="faqTitle">
          <h1>FAQs</h1>
        </div>
        {faqs.map((faq,i) => (
            <Accordion faq={faq} index={i} toggleFAQ={toggleFAQ} />
        )) }
      </div>
  )
}
function Eyebrow() {
  return (
    <div className="eyebrow"></div>
  );
}


export default Faq