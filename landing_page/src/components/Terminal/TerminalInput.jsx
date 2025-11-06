import React, { useState, useRef, useEffect } from 'react';
import { applyAutocomplete, getDisplaySuggestions } from '../../utils/autocomplete';

const TerminalInput = ({ onCommand, currentPath, commandHistory, historyIndex, setHistoryIndex }) => {
    const [input, setInput] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        // Auto-focus the input
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        // Update cursor position când se schimbă input-ul
        setCursorPosition(input.length);
    }, [input]);

    const handleKeyDown = (e) => {
        // Handle Ctrl+C - Cancel current command
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            if (input.trim()) {
                // Show the cancelled command with ^C
                onCommand(`__cancel__:${input}`);
                setInput('');
                setHistoryIndex(-1);
            }
            return;
        }

        // Handle Enter key
        if (e.key === 'Enter') {
            e.preventDefault();
            // Trimite comanda chiar dacă este goală (pentru a afișa prompt nou)
            onCommand(input);
            setInput('');
            setHistoryIndex(-1);
        }

        // Handle Up Arrow - Navigate to previous command
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex + 1;
                if (newIndex < commandHistory.length) {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[commandHistory.length - 1 - newIndex]);
                }
            }
        }

        // Handle Down Arrow - Navigate to next command
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        }

        // Handle Tab key for auto-completion
        else if (e.key === 'Tab') {
            e.preventDefault();
            const completed = applyAutocomplete(input, currentPath);

            if (completed) {
                setInput(completed);
            } else {
                // Dacă sunt multiple sugestii, afișează-le
                const suggestions = getDisplaySuggestions(input, currentPath);
                if (suggestions.length > 1) {
                    // Creează un output cu sugestiile
                    onCommand(`__suggestions__:${suggestions.join('  ')}`);
                }
            }
        }
    };

    const getPrompt = () => {
        const displayPath = currentPath === '/' ? '~' : `~${currentPath}`;
        return `user@ggdevs.site:${displayPath}$`;
    };

    return (
        <div className="terminal-input-line">
            <span className="prompt">{getPrompt()}</span>
            <div className="input-wrapper">
                <span className="input-text">{input}</span>
                <span className="cursor-blink">█</span>
            </div>
            <input
                ref={inputRef}
                type="text"
                className="terminal-input-hidden"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck="false"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
            />
        </div>
    );
};

export default TerminalInput;
