import React from 'react'
import Contact from './Contact'
import Copyright from './Copyright'

function Footer() {
    return (
        <>
            <div className="pt-4" style={{ backgroundColor: "#051d40" }}>
                <Contact />
                <hr style={{ borderColor: "#bbd3ff" }} />
                <Copyright />
            </div>

        </>
    )
}

export default Footer