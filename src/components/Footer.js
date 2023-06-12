import React from 'react'
import Button from './Button'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
            <div className="footer-container">
                <section className="fooer-subscription">
                    <p className="footer-subscription-heading">
                        Join the MetroRailway newsletter to recieve our best vacation details
                    </p>
                    <p className="footer-subscription-text">
                        You can unsubscribe at any time
                    </p>
                    <div className="input-areas">
                        <form>
                            <input type="text" 
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            className='footer-input'
                            />
                            <Button buttonStyle='btn--outline'>Subscribe</Button>
                        </form>
                    </div>
                </section>
                <div className="footer-links">
                    <div className="footer-link-wrapper">
                        <div className="footer-link-items">
                            <h2>About Us</h2>
                            <Link to='/sign-up'>How it Works</Link>
                            <Link to='/'>Testmonial</Link>
                            <Link to='/'>Careers</Link>
                            <Link to='/'>Investors</Link>
                            <Link to='/'>Terms of Service</Link>
                        </div>
                        <div className="footer-link-items">
                            <h2>Contact Us</h2>
                            <Link to='/sign-up'>How it Works</Link>
                            <Link to='/'>Testmonial</Link>
                            <Link to='/'>Careers</Link>
                            <Link to='/'>Investors</Link>
                            <Link to='/'>Terms of Service</Link>
                        </div>
                    </div>
                    <div className="footer-link-wrapper">
                        <div className="footer-link-items">
                            <h2>Videos</h2>
                            <Link to='/sign-up'>How it Works</Link>
                            <Link to='/'>Testmonial</Link>
                            <Link to='/'>Careers</Link>
                            <Link to='/'>Investors</Link>
                            <Link to='/'>Terms of Service</Link>
                        </div>
                        <div className="footer-link-items">
                            <h2>Social Media</h2>
                            <Link to='/sign-up'>How it Works</Link>
                            <Link to='/'>Testmonial</Link>
                            <Link to='/'>Careers</Link>
                            <Link to='/'>Investors</Link>
                            <Link to='/'>Terms of Service</Link>
                        </div>
                    </div>
                </div>
                <section className="social-media">
                    <div className="social-media-wrap">
                        <div className="footer-logo">
                            <Link to='/' className="social-logo">
                                MetroRailway <i className='fab fa-typo3' />
                            </Link>
                        </div>
                        <small className="website-rights">MetroRailway © 2021</small>
                        <div className="social-icons">
                            <Link className="social-icon-link facebook"
                                to='//facebook.com'
                                target='_blank'
                                aria-label='Facebook'
                            >
                                <a href="https://www.facebook.com"></a>
                                <i className='fab fa-facebook-f' />   
                            </Link>
                            <Link className="social-icon-link instagram"
                                to='//instagram.com'
                                target='_blank'
                                aria-label='Instagram'
                            >
                                <i className='fab fa-instagram' />   
                            </Link>
                            <Link className="social-icon-link youtube"
                                to='//youtube.com'
                                target='_blank'
                                aria-label='Youtube'
                            >
                                <i className='fab fa-youtube' />   
                            </Link>
                            <Link className="social-icon-link twitter"
                                to='//twitter.com'
                                target='_blank'
                                aria-label='Twitter'
                            >
                                <i className='fab fa-twitter' />   
                            </Link>
                            <Link className="social-icon-link linkedin"
                                to='//linkedin.com'
                                target='_blank'
                                aria-label='Linkedin'
                            >
                                <i className='fab fa-linkedin' />   
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
    )
}

export default Footer
