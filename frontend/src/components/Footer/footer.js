import './footer.css'
function Footer() {
    return (
        <footer className="footercontainer">
            <div className='linkswrapper'>
                <div className="projcontainer">
                    <div className='hellog'>
                        <a className='hellog' href='https://github.com/Cal-Flores/calebBnb'>CalebBnb 2022</a>
                    </div>
                </div>
                <div className='aref'>
                    <a className='ind-link' href='https://cal-flores.github.io./'>
                        <div className='hellog'>Caleb Flores</div>
                    </a>
                </div>
                <div className='aref'>
                    <a className="ind-git" href="https://github.com/Cal-Flores">
                        <div className='hellog'>
                            <i class="fa-brands fa-github"></i>
                        </div>
                    </a>
                </div>
                <div className='aref'>
                    <a className='ind-link' href='https://www.linkedin.com/in/caleb-flores-5a988a257/'>
                        <div className='hellog'>
                            <i class="fa-brands fa-linkedin-in"></i>
                        </div>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
