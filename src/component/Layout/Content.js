import React, {Fragment} from 'react';

function Content(props) {
    return (
        <Fragment>
            <section className = 'content_section'>
                {props.children}
            </section>
        </Fragment>
    )
}

export default Content;