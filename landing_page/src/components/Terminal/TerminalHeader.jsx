import React from 'react';
import { motion } from 'framer-motion';

const TerminalHeader = () => {
    return (
        <div className="terminal-header">
            <div className="terminal-controls">
                <span className="control-btn close"></span>
                <span className="control-btn minimize"></span>
                <span className="control-btn maximize"></span>
            </div>
            <div className="terminal-title">
                user@ggdevs.site: ~
            </div>
            <div className="terminal-spacer"></div>
        </div>
    );
};

export default TerminalHeader;
