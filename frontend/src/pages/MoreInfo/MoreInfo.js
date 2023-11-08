import React, {useState} from 'react'
import "./MoreInfo.css"
import caret from '../../assets/faqcaret.png'


/**
 * This function is the accordion that is on the FAQ page
 * @param type is the question and answer being pushed through
 * @param index what number in the list of faws it is
 * @param toggleType the current state of the faq
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
function CaretImage({isOpen}) {
    const imageClass = isOpen ? 'caret-rotate' : '';
    return (
        <img
            src={caret}
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
                    <div><strong className="feature-text-title">Relative Efficiency</strong></div>
                    <div className="feature-text"> Our model takes into account the factors below to determine the
                        best location for kelp farms.
                    </div>
                    <div><strong className="feature-text-title">Depth</strong></div>
                    <div className="feature-text">This measurement is the depth in meters from the surface of the water
                        to the bottom of the ocean. This is an important measurement when determining the relative
                        efficiency because kelp attaches to the seafloor and grows towards the water's surface. Kelp
                        rely on sunlight to perform photosynthesis and generate food/energy. Due to the need for sunlight
                        kelp requires shallow water so the sunlight can penetrate the water and reach the plant. For this
                        reason kelp tend to grow near the coast where the water is shallow and relatively clear.
                    </div>
                    <div><strong className="feature-text-title">pH</strong></div>
                    <div className="feature-text"> The pH measures acidity or basicity of the water. If the pH is less than 7 it
                        is an indication of an acid, whereas a pH of greater than 7 indicates a base. Kelp spores and plants
                        grow best in a pH range of 7.0-9.0. This is an important measurement when determining the relative
                        efficiency when growing kelp as a pH out of this range could result in the kelp not surviving. This
                        is of growing importance as ocean acidification continues.
                    </div>
                    <div><strong className="feature-text-title">Temperature</strong></div>
                    <div className="feature-text"> This measurement is the temperature of the ocean water in celsius at location
                        the sample was taken.This is an important measurement when determining the relative efficiency because
                        kelp grow better in colder waters. They thrive at temperatures between five and twenty degrees celsius.
                    </div>
                </>
            ),
            open: true

        },
        {
            type: 'Reforestation ',
            feature: (
                <>
                    <div><strong className="feature-text-title">Cost Efficiency</strong></div>
                    <div className="feature-text">The cost efficiency was found using our machine learning model...
                    </div>
                    <div><strong className="feature-text-title">Land prices</strong></div>
                    <div className="feature-text">The land prices are based on the average cost of farm land per acre.
                        The number displayed is the average for that county or state. This variable was taken into
                        account
                        for reforestation because in order to plant trees land needs to be purchased to plan the trees
                        on
                    </div>
                    <div><strong className="feature-text-title">Palmer Z Index</strong></div>
                    <div className="feature-text">The Palmer Z Index measures short-term drought conditions. This is
                        typically
                        a better estimate than the PDSI as the shorter time scales enables identification of rapidly
                        developing
                        drought conditions. It is sometimes referred to as the Moisture Anomaly Index, and the derived
                        values provide
                        comparable measure of the relative anomalies of a region for both dryness and wetness when
                        compared to the
                        entire record for that location. This was used as an indicator if the region is a good location
                        to
                        plant trees as trees need water to perform photosynthesis and be able to sequester carbon and
                        stay alive.
                    </div>
                    <div><strong className="feature-text-title">Population</strong></div>
                    <div className="feature-text">The population is the number of people per county or per state. This
                        number gives a good indication if the region is highly developed or less developed. It would be
                        difficult to implement reforestation in an area that is densely populated. It is also an
                        indication
                        that there would not be much available land to plant trees on. For these reason we took
                        population into account
                        when developing our machine learning model
                    </div>
                    <div><strong className="feature-text-title">Precipitation</strong></div>
                    <div className="feature-text">the percipitation number is ...</div>
                    <div><strong className="feature-text-title">Temperature</strong></div>
                    <div className="feature-text">The temperature is measured in degrees fahrenheit. This temperature
                        give us an idea of the climate in that region. The best temperature for reforestation was found
                        and used in
                        our model to predict the best location for reforestation.
                    </div>
                </>
            ),
            open: false
        },
        {
            type: 'Direct Air Capture ',
            feature: (
                <>
                    <div><strong className="feature-text-title">Cost Efficiency</strong></div>
                    <div className="feature-text">The cost efficiency was found using our machine learning model...
                    </div>
                    <div><strong className="feature-text-title">Land prices</strong></div>
                    <div className="feature-text">The land prices are based on the average cost of farm land per acre.
                        The number displayed is the average for that county or state. This variable was taken into
                        account
                        for reforestation because in order to plant trees land needs to be purchased to plan the trees
                        on
                    </div>
                    <div><strong className="feature-text-title">Palmer Z Index</strong></div>
                    <div className="feature-text">The Palmer Z Index measures short-term drought conditions. This is
                        typically
                        a better estimate than the PDSI as the shorter time scales enables identification of rapidly
                        developing
                        drought conditions. It is sometimes referred to as the Moisture Anomaly Index, and the derived
                        values provide
                        comparable measure of the relative anomalies of a region for both dryness and wetness when
                        compared to the
                        entire record for that location. This was used as an indicator if the region is a good location
                        to
                        plant trees as trees need water to perform photosynthesis and be able to sequester carbon and
                        stay alive.
                    </div>
                    <div><strong className="feature-text-title">Population</strong></div>
                    <div className="feature-text">The population is the number of people per county or per state. This
                        number gives a good indication if the region is highly developed or less developed. It would be
                        difficult to implement reforestation in an area that is densely populated. It is also an
                        indication
                        that there would not be much available land to plant trees on. For these reason we took
                        population into account
                        when developing our machine learning model
                    </div>
                    <div><strong className="feature-text-title">Precipitation</strong></div>
                    <div className="feature-text">the percipitation number is ...</div>
                    <div><strong className="feature-text-title">Temperature</strong></div>
                    <div className="feature-text">The temperature is measured in degrees fahrenheit. This temperature
                        give us an idea of the climate in that region. The best temperature for reforestation was found
                        and used in
                        our model to predict the best location for reforestation.
                    </div>
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