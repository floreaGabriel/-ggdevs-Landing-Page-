import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TerminalHeader from './TerminalHeader';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';
import { processCommand, getWelcomeBanner } from '../../utils/commands';
import './Terminal.css';

const Terminal = () => {
    const [currentPath, setCurrentPath] = useState('/');
    const [output, setOutput] = useState([]);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isFocused, setIsFocused] = useState(false);
    const terminalRef = useRef(null);
    const terminalBodyRef = useRef(null);

    // Display welcome banner on mount
    useEffect(() => {
        setOutput([
            {
                type: 'welcome',
                text: getWelcomeBanner()
            }
        ]);
    }, []);

    // Scroll to bottom when output changes
    useEffect(() => {
        if (terminalBodyRef.current) {
            // Scroll smooth to bottom
            setTimeout(() => {
                terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
            }, 0);
        }
    }, [output, commandHistory]);

    // Scroll to bottom when typing (keep input visible)
    useEffect(() => {
        const scrollToBottom = () => {
            if (terminalBodyRef.current) {
                terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
            }
        };

        // Add a small delay to ensure DOM updates
        const timeoutId = setTimeout(scrollToBottom, 10);
        return () => clearTimeout(timeoutId);
    });

    // Focus terminal when clicked anywhere
    // Focus terminal when clicked anywhere
    const handleTerminalClick = () => {
        const input = terminalRef.current?.querySelector('.terminal-input-hidden');
        if (input) {
            input.focus();
            // Trigger highlight effect
            setIsFocused(true);
            setTimeout(() => setIsFocused(false), 1000);
        }
    };

    const handleCommand = (input) => {
        const trimmedInput = input.trim();

        // Handle Ctrl+C cancel command
        if (input.startsWith('__cancel__:')) {
            const cancelledCommand = input.replace('__cancel__:', '');
            const displayPath = currentPath === '/' ? '~' : `~${currentPath}`;
            const prompt = `user@ggdevs.site:${displayPath}$`;
            
            setOutput([
                ...output,
                {
                    type: 'command',
                    prompt: prompt,
                    text: cancelledCommand + '^C'
                }
            ]);
            return;
        }

        // Add command to history
        if (trimmedInput) {
            setCommandHistory(prev => [...prev, trimmedInput]);
        }

        // Get current prompt
        const displayPath = currentPath === '/' ? '~' : `~${currentPath}`;
        const prompt = `user@ggdevs.site:${displayPath}$`;

        // Add command to output
        const newOutput = [
            ...output,
            {
                type: 'command',
                prompt: prompt,
                text: trimmedInput
            }
        ];

        // Process the command
        const result = processCommand(trimmedInput, currentPath, setCurrentPath);

        // Handle clear command
        if (result.type === 'clear') {
            setOutput([]);
            return;
        }

        // Handle empty output
        if (result.type === 'empty') {
            setOutput(newOutput);
            return;
        }

        // Handle launch command (redirect to URL)
        if (result.type === 'launch') {
            const launchOutput = [
                ...newOutput,
                {
                    type: 'launch',
                    message: result.output.message,
                    description: result.output.description,
                    url: result.output.url
                }
            ];
            setOutput(launchOutput);

            // Redirect after a short delay
            setTimeout(() => {
                window.open(result.output.url, '_blank');
            }, 1500);
            return;
        }

        // Handle ls command with formatted output
        if (result.type === 'ls') {
            const lsOutput = [
                ...newOutput,
                {
                    type: 'ls',
                    items: result.output
                }
            ];
            setOutput(lsOutput);
            return;
        }

        // Handle regular output
        const commandOutput = [
            ...newOutput,
            {
                type: result.type,
                text: result.output
            }
        ];

        setOutput(commandOutput);
    };

    return (
        <motion.div
            ref={terminalRef}
            className="terminal-container"
            onClick={handleTerminalClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`terminal-window ${isFocused ? 'focused' : ''}`}>
                <TerminalHeader />
                <div ref={terminalBodyRef} className="terminal-body">
                    <TerminalOutput output={output} />
                    <TerminalInput
                        onCommand={handleCommand}
                        currentPath={currentPath}
                        commandHistory={commandHistory}
                        historyIndex={historyIndex}
                        setHistoryIndex={setHistoryIndex}
                    />
                </div>
            </div>
            {/* Scanline effect overlay */}
            <div className="scanline"></div>
        </motion.div>
    );
};

export default Terminal;
