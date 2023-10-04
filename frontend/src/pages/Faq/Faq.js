import React, {useState} from 'react'
import Accordion from "../../components/Accordion/Accordion";
import  "../../components/Accordion/Accordion.css";


/**
 * Holds the questions and answers of the FAQs.
 *
 * @returns The contents of the FAQ page
 */
function Faq() {
  const[faqs,setfaqs]= useState([
    {

      question: 'What is the Anthropocene Institute and what do they do? ',
      answer: 'Anthropocene Institute is an organization founded by Carl Page' +
          '2012 and is focused on making Earth sustainable by knowing and investing' +
          'in the right technology. they partner with entrepreneurs, investors, ' +
          'governments, non-profits, and universities to foster science, influence policy,' +
          'promote sustainability, clean energy, and more',
      open: true

    },
    {
      question: 'Why Carbon Dioxide removal? ',
      answer: 'As climate change has become more serious of an issue over time, it has ' +
          'become increasingly beneficial for companies and organizations to invest in ' +
          'lowering their carbon footprint. For example one forth of the Fortune 500 companies' +
          'have pledged to become carbon neutral by 2030. Investing in carbon removal' +
          'technology is hard enough for the worlds biggest companies, but smaller organizations' +
          'often dont have the time or resources to effectively do so',
      open: false
    },
    {
      question: 'How was Carbon Mapp developed?',
      answer: 'Carbon Mapp is a web application which utilizes Python machine learning' +
          ' libraries, publicly available data, and the Mapbox JavaScript API to generate ' +
          'the heatmaps',
      open: false

    }

  ])

  /**
   * Toggles the faq when needed. This will display the answer when clicked on
   *
   * @returns The faq with a new state of open or closed
  */
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
        <div>
          <h1 className="faqTitle">FAQs</h1>
        </div>
        {faqs.map((faq,i) => (
            <Accordion faq={faq} index={i} toggleFAQ={toggleFAQ} />
        )) }
      </div>
  )
}


export default Faq