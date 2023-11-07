import React, {useState} from 'react'
import "./MoreInfo.css"
import caret from '../../assets/faqcaret.png'
import faqcaret from "../../assets/faqcaret.png";


/**
 * This function is the accordion that is on the FAQ page
 * @param faq is the question and answer being pushed through
 * @param index what number in the list of faws it is
 * @param toggleFAQ the current state of the faq
 *
 * @returns {JSX.Element}
 *
 */

function MoreInfoAccordion({type, index, toggleType}) {
    return (
        <div className={"type " + (type.open ? 'open' : '')} key={index} onClick={() => toggleType(index)}>
            <div className="type-title">
                {type.type}
                <CaretImage isOpen={type.open}></CaretImage>
            </div>
            <div className="type-feature">
                {type.feature}
            </div>
            <Line></Line>
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
function CaretImage({ isOpen}) {
    const imageClass = isOpen ? 'caret-rotate' : '';
    return (
        <img
            src={faqcaret}
            alt="caret Image"
            loading="lazy"
            id="caret"
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


/**
 * Holds the questions and answers of the FAQs.
 *
 * @returns The contents of the FAQ page
 */
function MoreInfo() {

    const [types, setTypes] = useState([
        {

            type: 'Kelp Farms ',
            feature: (
                <>
                    <div><strong className="feature-text-title">Cost Efficiency</strong></div>
                    <div className="feature-text">The cost efficiency was found using our machine learning model...</div>
                    <div><strong className="feature-text-title">Land prices</strong></div>
                    <div className="feature-text">The land prices are in price per....</div>
                    <div><strong className="feature-text-title">Palmer-Z Index</strong></div>
                    <div className="feature-text">The plamer-z index is ___ and means ___...</div>
                    <div><strong className="feature-text-title">Population</strong></div>
                    <div className="feature-text">The population per county...</div>
                    <div><strong className="feature-text-title">Precipitation</strong></div>
                    <div className="feature-text">the percipitation number is ...</div>
                    <div><strong className="feature-text-title">Temperature</strong></div>
                    <div className="feature-text">The average temperature...</div>
                </>
            ),
            open: true

        },
        {
            type: 'Reforestation ',
            feature: (
                <>
                    <div><strong className="feature-text-title">Cost Efficiency</strong></div>
                    <div className="feature-text">The cost efficiency was found using our machine learning model...</div>
                    <div><strong className="feature-text-title">Land prices</strong></div>
                    <div className="feature-text">The land prices are in price per....</div>
                    <div><strong className="feature-text-title">Palmer-Z Index</strong></div>
                    <div className="feature-text">The plamer-z index is ___ and means ___...</div>
                    <div><strong className="feature-text-title">Population</strong></div>
                    <div className="feature-text">The population per county...</div>
                    <div><strong className="feature-text-title">Precipitation</strong></div>
                    <div className="feature-text">the percipitation number is ...</div>
                    <div><strong className="feature-text-title">Temperature</strong></div>
                    <div className="feature-text">The average temperature...</div>
                </>
            ),
            open: false
        },
        {
            type: 'Direct Air Capture ',
            feature: (
                <>
                    <div><strong className="feature-text-title">Cost Efficiency</strong></div>
                    <div className="feature-text">The cost efficiency was found using our machine learning model...</div>
                    <div><strong className="feature-text-title">Land prices</strong></div>
                    <div className="feature-text">The land prices are in price per....</div>
                    <div><strong className="feature-text-title">Palmer-Z Index</strong></div>
                    <div className="feature-text">The plamer-z index is ___ and means ___...</div>
                    <div><strong className="feature-text-title">Population</strong></div>
                    <div className="feature-text">The population per county...</div>
                    <div><strong className="feature-text-title">Precipitation</strong></div>
                    <div className="feature-text">the percipitation number is ...</div>
                    <div><strong className="feature-text-title">Temperature</strong></div>
                    <div className="feature-text">The average temperature...</div>
                </>
            ),
            open: false

        }

    ])

    /**
     * Toggles the faq when needed. This will display the answer when clicked on
     *
     * @returns The faq with a new state of open or closed
     */
    const toggleType = index => {
        setTypes(types.map((type, i) => {
            if (i === index) {
                type.open = !type.open
            } else {
                type.open = false;
            }
            return type;
        }))
    }

    return (
        <div>
            <div>
                <h1 className="more-info-title">More Info</h1>
                <hr className="more-info-line"/>
            </div>
            <div className="types">
                {types.map((type, i) => (
                    <MoreInfoAccordion key={i} type={type} index={i} toggleType={toggleType}/>
                ))}
            </div>


        </div>
    )
}


export default MoreInfo