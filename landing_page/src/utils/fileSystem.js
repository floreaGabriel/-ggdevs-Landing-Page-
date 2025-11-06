// Virtual file system structure for the terminal
export const fileSystem = {
  '/': {
    type: 'directory',
    contents: {
      'apps': {
        type: 'directory',
        contents: {
          'deployment-platform': {
            type: 'executable',
            url: 'https://deployment-platform.ggdevs.site/',
            description: '🚀 Deployment Platform - Deploy and manage your applications'
          },
          'portfolio': {
            type: 'executable',
            url: 'https://portfolio.ggdevs.site/',
            description: '💼 Portfolio - View our work and projects'
          },
          'blog': {
            type: 'executable',
            url: 'https://blog.ggdevs.site/',
            description: '📝 Blog - Read our latest articles and tutorials'
          },
          'docs': {
            type: 'executable',
            url: 'https://docs.ggdevs.site/',
            description: '📚 Documentation - Comprehensive guides and API docs'
          }
        }
      },
      'about.txt': {
        type: 'file',
        content: `
╔═══════════════════════════════════════════════════════════╗
║                     ABOUT GGDEVS                         ║
╚═══════════════════════════════════════════════════════════╝

Welcome to GGDevs - Your partner in digital innovation!

We are a team of passionate developers and designers committed 
to creating cutting-edge web solutions. Our mission is to 
transform ideas into powerful, scalable applications.

🎯 What We Do:
  • Full-stack web development
  • Cloud deployment solutions
  • DevOps & Infrastructure
  • UI/UX Design
  • Consulting & Training

🌟 Why Choose Us:
  • Expert team with 10+ years combined experience
  • Modern tech stack (React, Node.js, Docker, K8s)
  • Fast deployment & high availability
  • 24/7 support and monitoring
  • Competitive pricing

📍 Location: Remote-first company, serving clients worldwide
🕐 Founded: 2020
👥 Team Size: 15+ talented professionals

Type 'cd apps' to explore our applications!
        `
      },
      'contact.txt': {
        type: 'file',
        content: `
╔═══════════════════════════════════════════════════════════╗
║                   CONTACT INFORMATION                    ║
╚═══════════════════════════════════════════════════════════╝

Get in touch with us! We'd love to hear from you.

📧 Email:      hello@ggdevs.site
               support@ggdevs.site

💬 Discord:    discord.gg/ggdevs
🐦 Twitter:    @ggdevs
💼 LinkedIn:   linkedin.com/company/ggdevs
🐙 GitHub:     github.com/ggdevs

📱 Phone:      +1 (555) 123-4567
🕐 Hours:      Mon-Fri, 9:00 AM - 6:00 PM (EST)

📍 Office:     
   123 Innovation Street
   Tech Valley, CA 94000
   United States

💡 For project inquiries, please email us with:
   • Project description
   • Timeline and budget
   • Your contact information

We typically respond within 24 hours!
        `
      },
      'README.md': {
        type: 'file',
        content: `
╔═══════════════════════════════════════════════════════════╗
║              WELCOME TO GGDEVS TERMINAL                  ║
╚═══════════════════════════════════════════════════════════╝

Hello, fellow developer! 👋

You've discovered our interactive terminal interface. This is
not just a landing page - it's a fully functional bash-style
terminal that you can use to navigate our site.

📖 QUICK START GUIDE:

  ls              List contents of current directory
  cd <dir>        Change directory
  pwd             Print working directory
  cat <file>      Display file contents
  clear           Clear the terminal
  help            Show all available commands
  ./<app>         Launch an application (from /apps)

🎮 TRY THESE COMMANDS:

  $ ls                    # See what's here
  $ cat about.txt         # Learn about us
  $ cat contact.txt       # Get in touch
  $ cd apps               # Browse our apps
  $ ./deployment-platform # Launch an app

🎨 FEATURES:

  ✨ Command history (↑/↓ arrows)
  ✨ Tab completion (coming soon)
  ✨ Real bash-like experience
  ✨ Fast navigation to our services
  ✨ Easter eggs hidden throughout

💡 PRO TIP: 
Type 'neofetch' for a surprise, or try 'whoami' to see who
you are in this system!

🚀 READY TO EXPLORE?
Start by typing 'help' or 'ls' to get going.

Happy exploring! 🎉

---
Built with ❤️ by the GGDevs team
        `
      }
    }
  }
};

// Helper function to navigate the file system
export const getItemAtPath = (path) => {
  if (path === '/') return fileSystem['/'];
  
  const parts = path.split('/').filter(p => p !== '');
  let current = fileSystem['/'];
  
  for (const part of parts) {
    if (!current.contents || !current.contents[part]) {
      return null;
    }
    current = current.contents[part];
  }
  
  return current;
};

// Helper function to list directory contents
export const listDirectory = (path) => {
  const item = getItemAtPath(path);
  if (!item || item.type !== 'directory') {
    return null;
  }
  return Object.entries(item.contents).map(([name, data]) => ({
    name,
    type: data.type
  }));
};

// Helper function to get file content
export const getFileContent = (path, filename) => {
  const fullPath = path === '/' ? `/${filename}` : `${path}/${filename}`;
  const item = getItemAtPath(fullPath);
  
  if (!item) return null;
  
  if (item.type === 'file') {
    return item.content;
  } else if (item.type === 'executable') {
    return {
      type: 'executable',
      url: item.url,
      description: item.description
    };
  }
  
  return null;
};

// Helper function to resolve path
export const resolvePath = (currentPath, targetPath) => {
  if (targetPath === '/') return '/';
  if (targetPath.startsWith('/')) return targetPath;
  
  if (targetPath === '..') {
    if (currentPath === '/') return '/';
    const parts = currentPath.split('/').filter(p => p !== '');
    parts.pop();
    return '/' + parts.join('/');
  }
  
  if (targetPath === '.') return currentPath;
  
  if (currentPath === '/') {
    return `/${targetPath}`;
  }
  
  return `${currentPath}/${targetPath}`;
};
