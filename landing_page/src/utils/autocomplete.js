import { listDirectory, getItemAtPath } from './fileSystem';

// Lista de comenzi bash valide
const VALID_COMMANDS = [
  'ls', 'cd', 'pwd', 'cat', 'clear', 'cls', 
  'help', 'man', 'whoami', 'date', 'echo', 
  'neofetch', 'screenfetch', 'exit', 'logout'
];

/**
 * Obține sugestii de autocomplete pentru input-ul curent
 * @param {string} input - Input-ul parțial
 * @param {string} currentPath - Calea curentă
 * @returns {string[]} - Lista de sugestii
 */
export const getAutocompleteSuggestions = (input, currentPath) => {
  if (!input || input.trim() === '') {
    return [];
  }

  const parts = input.split(' ');
  const commandPart = parts[0];
  
  // Dacă suntem la prima parte (comanda)
  if (parts.length === 1) {
    // Verifică dacă începe cu ./ (executabil)
    if (commandPart.startsWith('./')) {
      const appName = commandPart.substring(2);
      return getExecutableCompletions(appName, currentPath);
    }
    
    // Sugestii pentru comenzi
    return VALID_COMMANDS.filter(cmd => cmd.startsWith(commandPart));
  }
  
  // Dacă suntem la a doua parte (argument)
  if (parts.length === 2) {
    const command = parts[0];
    const arg = parts[1];
    
    // Pentru comenzi care acceptă fișiere/directoare
    if (command === 'cd') {
      return getDirectoryCompletions(arg, currentPath);
    } else if (command === 'cat' || command === 'ls') {
      return getFileCompletions(arg, currentPath);
    }
  }
  
  return [];
};

/**
 * Autocomplete pentru executabile (./app)
 */
const getExecutableCompletions = (partial, currentPath) => {
  const items = listDirectory(currentPath);
  if (!items) return [];
  
  return items
    .filter(item => item.type === 'executable' && item.name.startsWith(partial))
    .map(item => `./${item.name}`);
};

/**
 * Autocomplete pentru directoare (cd)
 */
const getDirectoryCompletions = (partial, currentPath) => {
  const items = listDirectory(currentPath);
  if (!items) return [];
  
  return items
    .filter(item => item.type === 'directory' && item.name.startsWith(partial))
    .map(item => item.name);
};

/**
 * Autocomplete pentru fișiere și directoare
 */
const getFileCompletions = (partial, currentPath) => {
  const items = listDirectory(currentPath);
  if (!items) return [];
  
  return items
    .filter(item => item.name.startsWith(partial))
    .map(item => item.name);
};

/**
 * Aplică autocomplete la input
 * @param {string} input - Input-ul curent
 * @param {string} currentPath - Calea curentă
 * @returns {string|null} - Input-ul completat sau null dacă nu există completări
 */
export const applyAutocomplete = (input, currentPath) => {
  const suggestions = getAutocompleteSuggestions(input, currentPath);
  
  if (suggestions.length === 0) {
    return null;
  }
  
  // Dacă există exact o sugestie, o aplicăm
  if (suggestions.length === 1) {
    const parts = input.split(' ');
    
    if (parts.length === 1) {
      // Completăm comanda sau executabilul
      return suggestions[0] + ' ';
    } else {
      // Completăm argumentul
      parts[parts.length - 1] = suggestions[0];
      return parts.join(' ') + ' ';
    }
  }
  
  // Dacă există multiple sugestii, găsim prefixul comun
  const commonPrefix = findCommonPrefix(suggestions);
  const parts = input.split(' ');
  const currentPart = parts[parts.length - 1];
  
  if (commonPrefix.length > currentPart.length) {
    if (parts.length === 1) {
      return commonPrefix;
    } else {
      parts[parts.length - 1] = commonPrefix;
      return parts.join(' ');
    }
  }
  
  return null;
};

/**
 * Găsește prefixul comun între un array de string-uri
 */
const findCommonPrefix = (strings) => {
  if (strings.length === 0) return '';
  if (strings.length === 1) return strings[0];
  
  let prefix = strings[0];
  
  for (let i = 1; i < strings.length; i++) {
    while (strings[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === '') return '';
    }
  }
  
  return prefix;
};

/**
 * Verifică dacă o comandă începe cu o comandă bash validă
 */
export const isValidCommand = (input) => {
  if (!input || input.trim() === '') {
    return true; // Input gol este valid (nu arătăm eroare)
  }
  
  const trimmedInput = input.trim();
  const commandPart = trimmedInput.split(' ')[0];
  
  // Verifică dacă începe cu ./  (executabil)
  if (commandPart.startsWith('./')) {
    return true;
  }
  
  // Verifică dacă este o comandă validă
  return VALID_COMMANDS.includes(commandPart);
};

/**
 * Obține lista de sugestii pentru afișare (când sunt multiple)
 */
export const getDisplaySuggestions = (input, currentPath) => {
  const suggestions = getAutocompleteSuggestions(input, currentPath);
  return suggestions;
};
