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


  return (
    <div className="faqs">
      {faqs.map((faq,i) => (
          <Accordion faq={faq} index={i} />
      )) }
    </div>
  )
}

export default Faq