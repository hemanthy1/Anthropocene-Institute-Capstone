import nReact, {useState} from 'react'
import "./Accordion.css"
import faqcaret from '../../assets/faqcaret.png'


/**
 * This function is the accordion that is on the FAQ page
 * @param faq is the question and answer being pushed through
 * @param index what number in the list of faws it is
 * @param toggleFAQ the current state of the faq
 *
 * @returns {JSX.Element}
 *
 */

function Accordion({faq, index, toggleFAQ}) {

    return (
        <div className={"faq " + (faq.open ? 'open' : '')} key={index} onClick={() => toggleFAQ(index)}>
            <Line></Line>
            <div className="faq-question">
                {faq.question}
                <CaretImage isOpen={faq.open}></CaretImage>
            </div>
            <div className="faq-answer">
                {faq.answer}
            </div>
        </div>
    );

}

/**
 * The caret image and if it is rotated or not
 * @param isOpen the state of the image. If it is open add the class name rotate,
 * and it will be rotated 180 degrees
 * @returns {JSX.Element}
 *
 */
function CaretImage({isOpen}) {
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


/**
 * Lines that appear between questions
 *
 * @returns {JSX.Element}
 *
 */
function Line() {
    return (
        <div className="line"></div>
    );
}


export default Accordion