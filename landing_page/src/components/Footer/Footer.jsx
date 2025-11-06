import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <div className="footer-container">
                <div className="footer-section">
                    <h3 className="footer-title">GGDevs</h3>
                    <p className="footer-description">
                        Building the future, one command at a time.
                    </p>
                </div>

                <div className="footer-section">
                    <h4 className="footer-subtitle">Quick Links</h4>
                    <div className="footer-links">
                        <a href="#about" className="footer-link">About Us</a>
                        <a href="#services" className="footer-link">Services</a>
                        <a href="#portfolio" className="footer-link">Portfolio</a>
                        <a href="#contact" className="footer-link">Contact</a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4 className="footer-subtitle">Connect</h4>
                    <div className="footer-links">
                        <a href="https://github.com/ggdevs" target="_blank" rel="noopener noreferrer" className="footer-link">
                            GitHub
                        </a>
                        <a href="https://twitter.com/ggdevs" target="_blank" rel="noopener noreferrer" className="footer-link">
                            Twitter
                        </a>
                        <a href="https://linkedin.com/company/ggdevs" target="_blank" rel="noopener noreferrer" className="footer-link">
                            LinkedIn
                        </a>
                        <a href="https://discord.gg/ggdevs" target="_blank" rel="noopener noreferrer" className="footer-link">
                            Discord
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4 className="footer-subtitle">Terminal Tip</h4>
                    <p className="footer-tip">
                        Try typing <code>neofetch</code> in the terminal above! 🎉
                    </p>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="footer-copyright">
                    © {currentYear} GGDevs. Built with <span className="heart">❤️</span> and <span className="code">{'</>'}</span>
                </p>
            </div>
        </motion.footer>
    );
};

export default Footer;
