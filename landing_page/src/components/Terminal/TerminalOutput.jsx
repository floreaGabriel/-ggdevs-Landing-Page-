import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TerminalOutput = ({ output }) => {
    const outputRef = useRef(null);

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [output]);

    const renderOutput = (item, index) => {
        // Handle different output types
        switch (item.type) {
            case 'command':
                return (
                    <div key={index} className="output-line command-line">
                        <span className="prompt">{item.prompt}</span>
                        <span className="command-text">{item.text}</span>
                    </div>
                );

            case 'error':
                return (
                    <pre key={index} className="output-line error-output">
                        {item.text}
                    </pre>
                );

            case 'info':
            case 'file':
                return (
                    <pre key={index} className="output-line info-output">
                        {item.text}
                    </pre>
                );

            case 'ls':
                return (
                    <div key={index} className="output-line ls-output">
                        {item.items.map((file, fileIndex) => (
                            <span
                                key={fileIndex}
                                className={`ls-item ${file.type === 'directory' ? 'directory' : file.type === 'executable' ? 'executable' : 'file'}`}
                            >
                                {file.display}
                            </span>
                        ))}
                    </div>
                );

            case 'launch':
                return (
                    <div key={index} className="output-line launch-output">
                        <div className="launch-message">{item.message}</div>
                        <div className="launch-description">{item.description}</div>
                        <div className="launch-redirect">➜ Redirecting to {item.url}</div>
                    </div>
                );

            case 'welcome':
                return (
                    <pre key={index} className="output-line welcome-banner">
                        {item.text}
                    </pre>
                );

            case 'suggestions':
                return (
                    <div key={index} className="output-line suggestions-output">
                        {item.text}
                    </div>
                );

            default:
                return (
                    <pre key={index} className="output-line">
                        {item.text}
                    </pre>
                );
        }
    };

    return (
        <div ref={outputRef} className="terminal-output">
            {output.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {renderOutput(item, index)}
                </motion.div>
            ))}
        </div>
    );
};

export default TerminalOutput;
