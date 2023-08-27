import { Link } from "react-router-dom"

function LandingPage() {
    console.log('in landing page')
    return (
        <div>
            <div>
                <h1>
                    Landing Page
                </h1> 

                <Link to={`/view-task`}>ViewTask</Link>
                <Link to={`/new-task`}>NewTask</Link>
            </div>
        </div>
    )
}

export default LandingPage