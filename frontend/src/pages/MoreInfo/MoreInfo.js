import React, {useState} from 'react'
import Accordion from "../../components/Accordion/Accordion";
import  "../../components/Accordion/Accordion.css";



function MoreInfo() {

    const [faqs, setfaqs] = useState([
        {

            question: 'What is the Name? ',
            answer: 'explain what the name is ',
            open: true

        },
        {
            question: 'What is cost efficiency and how is it calculated? ',
            answer: 'info about how cost efficiency is calculated',
            open: false
        },
        {
            question: 'what is land prices?',
            answer: 'info on the land prices data',
            open: false

        }

    ])

    /**
     * Toggles the faq when needed. This will display the answer when clicked on
     *
     * @returns The faq with a new state of open or closed
     */
    const toggleFAQ = index => {
        setfaqs(faqs.map((faq, i) => {
            if (i === index) {
                faq.open = !faq.open
            } else {
                faq.open = false;
            }
            return faq;
        }))
    }

    return (
        <div className="faqs">
            <div>
                <h1 className="faqTitle">MoreInfo</h1>
            </div>
        {faqs.map((faq,i) => (
            <Accordion key={i} faq={faq} index={i} toggleFAQ={toggleFAQ} />
        )) }
        </div>
    )
}


export default MoreInfo