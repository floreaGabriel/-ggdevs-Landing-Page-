import React from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
    return (
        <motion.header
            className="header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="header-container">
                <div className="logo">
                    <span className="logo-bracket">{'<'}</span>
                    <span className="logo-text">GGDevs</span>
                    <span className="logo-bracket">{'/>'}</span>
                </div>
                <nav className="nav">
                    <a href="#home" className="nav-link">Home</a>
                    <a href="#about" className="nav-link">About</a>
                    <a href="#services" className="nav-link">Services</a>
                    <a href="#contact" className="nav-link">Contact</a>
                </nav>
            </div>
        </motion.header>
    );
};

export default Header;
