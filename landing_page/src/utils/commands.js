import { listDirectory, getFileContent, getItemAtPath, resolvePath } from './fileSystem';
import { isValidCommand } from './autocomplete';

// ASCII Art for welcome banner
const WELCOME_BANNER = `
   ██████╗  ██████╗ ██████╗ ███████╗██╗   ██╗███████╗
  ██╔════╝ ██╔════╝ ██╔══██╗██╔════╝██║   ██║██╔════╝
  ██║  ███╗██║  ███╗██║  ██║█████╗  ██║   ██║███████╗
  ██║   ██║██║   ██║██║  ██║██╔══╝  ╚██╗ ██╔╝╚════██║
  ╚██████╔╝╚██████╔╝██████╔╝███████╗ ╚████╔╝ ███████║
   ╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝
                                                      
  Welcome to GGDevs Interactive Terminal v1.0
  Type 'help' to see available commands
  Type 'cat README.md' to get started
`;

const NEOFETCH_OUTPUT = `
                   -\`               user@ggdevs.site
                  .o+\`              ----------------
                 \`ooo/              OS: GGDevs Terminal v1.0
                \`+oooo:             Host: React 19.1.1
               \`+oooooo:            Kernel: Node.js LTS
               -+oooooo+:           Uptime: Always On
             \`/:-:++oooo+:          Packages: 4 apps
            \`/++++/+++++++:         Shell: bash 5.0
           \`/++++++++++++++:        Resolution: Responsive
          \`/+++ooooooooooooo/\`      Terminal: xterm-256color
         ./ooosssso++osssssso+\`     CPU: Modern JavaScript Engine
        .oossssso-\`\`\`\`/ossssss+\`    GPU: WebGL Accelerated
       -osssssso.      :ssssssso.   Memory: Optimized React State
      :osssssss/        osssso+++.  
     /ossssssss/        +ssssooo/-  
   \`/ossssso+/:-        -:/+osssso+- 
  \`+sso+:-\`                 \`.-/+oso:
 \`++:.                           \`-/+/
 .\`                                 \`/
`;

// Command processor
export const processCommand = (input, currentPath, setCurrentPath) => {
  const trimmedInput = input.trim();
  
  if (!trimmedInput) {
    return { output: '', type: 'empty' };
  }

  // Verifică dacă este un mesaj special pentru sugestii
  if (trimmedInput.startsWith('__suggestions__:')) {
    const suggestions = trimmedInput.substring(16);
    return { output: suggestions, type: 'suggestions' };
  }
  
  // Verifică dacă comanda este validă
  if (!isValidCommand(trimmedInput)) {
    const commandPart = trimmedInput.split(' ')[0];
    return { 
      output: `bash: ${commandPart}: command not found\nType 'help' to see available commands`, 
      type: 'error' 
    };
  }
  
  const [command, ...args] = trimmedInput.split(' ');
  
  switch (command.toLowerCase()) {
    case 'help':
    case 'man':
      return handleHelp();
    
    case 'ls':
      return handleLs(currentPath, args);
    
    case 'cd':
      return handleCd(currentPath, args[0], setCurrentPath);
    
    case 'pwd':
      return handlePwd(currentPath);
    
    case 'cat':
      return handleCat(currentPath, args[0]);
    
    case 'clear':
    case 'cls':
      return { output: '', type: 'clear' };
    
    case 'whoami':
      return { output: 'user@ggdevs.site\nYou are a visitor exploring our interactive terminal!', type: 'info' };
    
    case 'date':
      return { output: new Date().toString(), type: 'info' };
    
    case 'echo':
      return { output: args.join(' '), type: 'info' };
    
    case 'neofetch':
    case 'screenfetch':
      return { output: NEOFETCH_OUTPUT, type: 'info' };
    
    case 'sudo':
      return { output: '🚫 Nice try! You don\'t have sudo privileges here. 😄', type: 'error' };
    
    case 'rm':
      if (args.includes('-rf') || args.includes('/')) {
        return { output: '🚫 Permission denied! This is a read-only file system.\n💡 Good thing this is a demo! 😅', type: 'error' };
      }
      return { output: `rm: cannot remove '${args[0]}': Permission denied`, type: 'error' };
    
    case 'vim':
    case 'nano':
    case 'emacs':
      return { output: `${command}: This is a web terminal. Try 'cat' to read files instead! 📖`, type: 'error' };
    
    case 'exit':
    case 'logout':
      return { output: '👋 Thanks for visiting! Refresh the page to restart the terminal.', type: 'info' };
    
    default:
      // Check if it's an executable command (e.g., ./app-name)
      if (command.startsWith('./')) {
        return handleExecutable(currentPath, command.substring(2));
      }
      
      return { 
        output: `bash: ${command}: command not found\nType 'help' to see available commands`, 
        type: 'error' 
      };
  }
};

// Command handlers
const handleHelp = () => {
  const helpText = `
╔═══════════════════════════════════════════════════════════╗
║              AVAILABLE COMMANDS                          ║
╚═══════════════════════════════════════════════════════════╝

Navigation Commands:
  ls [dir]          List directory contents
  cd <dir>          Change directory (use .. for parent, / for root)
  pwd               Print working directory
  cat <file>        Display file contents
  clear             Clear terminal screen

System Commands:
  help, man         Show this help message
  whoami            Display current user
  date              Show current date and time
  echo <text>       Print text to terminal
  neofetch          Display system information
  exit              Exit message

Application Commands:
  ./<app-name>      Launch an application (from /apps directory)
                    Example: ./deployment-platform

File Structure:
  /                 Root directory
  ├── apps/         Applications directory
  ├── about.txt     Information about GGDevs
  ├── contact.txt   Contact information
  └── README.md     Getting started guide

💡 Tips:
  • Use ↑/↓ arrow keys to navigate command history
  • Press Tab for command completion (coming soon)
  • Type 'cd apps' then 'ls' to see available applications
  • Type 'cat README.md' for a quick start guide

🎮 Try These Commands:
  $ cat about.txt
  $ cd apps && ls
  $ ./deployment-platform
  $ neofetch
`;
  return { output: helpText, type: 'info' };
};

const handleLs = (currentPath, args) => {
  const targetPath = args[0] ? resolvePath(currentPath, args[0]) : currentPath;
  const items = listDirectory(targetPath);
  
  if (!items) {
    return { output: `ls: cannot access '${args[0] || currentPath}': No such file or directory`, type: 'error' };
  }
  
  if (items.length === 0) {
    return { output: '', type: 'empty' };
  }
  
  // Format output with colors - fără * pentru executabile
  const formattedItems = items.map(item => ({
    name: item.name,
    type: item.type,
    display: item.type === 'directory' ? `${item.name}/` : item.name
  }));
  
  return { output: formattedItems, type: 'ls' };
};

const handleCd = (currentPath, targetDir, setCurrentPath) => {
  if (!targetDir) {
    setCurrentPath('/');
    return { output: '', type: 'empty' };
  }
  
  const newPath = resolvePath(currentPath, targetDir);
  const item = getItemAtPath(newPath);
  
  if (!item) {
    return { output: `cd: ${targetDir}: No such file or directory`, type: 'error' };
  }
  
  if (item.type !== 'directory') {
    return { output: `cd: ${targetDir}: Not a directory`, type: 'error' };
  }
  
  setCurrentPath(newPath);
  return { output: '', type: 'empty' };
};

const handlePwd = (currentPath) => {
  const displayPath = currentPath === '/' ? '/' : currentPath;
  return { output: displayPath, type: 'info' };
};

const handleCat = (currentPath, filename) => {
  if (!filename) {
    return { output: 'cat: missing file operand\nTry \'cat --help\' for more information.', type: 'error' };
  }
  
  const content = getFileContent(currentPath, filename);
  
  if (!content) {
    return { output: `cat: ${filename}: No such file or directory`, type: 'error' };
  }
  
  if (typeof content === 'object' && content.type === 'executable') {
    return { 
      output: `cat: ${filename}: Is an executable\nUse './${filename}' to launch the application`, 
      type: 'error' 
    };
  }
  
  return { output: content, type: 'file' };
};

const handleExecutable = (currentPath, appName) => {
  const content = getFileContent(currentPath, appName);
  
  if (!content) {
    return { output: `bash: ./${appName}: No such file or directory`, type: 'error' };
  }
  
  if (typeof content !== 'object' || content.type !== 'executable') {
    return { output: `bash: ./${appName}: Permission denied`, type: 'error' };
  }
  
  return { 
    output: {
      message: `🚀 Launching ${appName}...`,
      description: content.description,
      url: content.url
    }, 
    type: 'launch' 
  };
};

// Get welcome banner
export const getWelcomeBanner = () => {
  return WELCOME_BANNER;
};

// Get command suggestions for tab completion (future feature)
export const getCommandSuggestions = (partial) => {
  const commands = ['help', 'ls', 'cd', 'pwd', 'cat', 'clear', 'whoami', 'date', 'echo', 'neofetch', 'exit'];
  return commands.filter(cmd => cmd.startsWith(partial.toLowerCase()));
};
