<div align="center" style="display: flex; align-items: center; gap: 16px; padding:10px;">
   <img src="icons/icon48.png" alt="Screen Spotlight Icon" width="48" height="48" style="vertical-align: middle;" />
   <span style="font-size: 1.3em; font-weight: bold; vertical-align: middle;">Screen Spotlight - Chrome Extension</span>
</div>

> **Professional spotlight tool for presentations, screen sharing, and online teaching**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/atulram/ScreenSpotlight)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Chrome Web Store](https://img.shields.io/badge/chrome-extension-success.svg)](https://chrome.google.com/webstore)

Screen Spotlight is a powerful Chrome extension that creates a professional spotlight effect on any webpage, perfect for presentations, screen recordings, online teaching, and screen sharing. Dim the background and highlight specific areas with smooth, customizable spotlight effects.

## ✨ Features

### 🎯 **Core Functionality**
- **Professional Spotlight Effect** - Smooth circular spotlight that follows your mouse cursor
- **Customizable Hotkeys** - Choose your own key combinations (default: Ctrl + Shift + Mouse)
- **Instant Activation** - Works immediately on all open tabs without page refresh
- **Universal Compatibility** - Functions on all websites and web applications

### 🎨 **Customization Options**
- **Spotlight Radius** - Adjustable from 50px to 400px (default: 125px)
- **Background Dimming** - Control opacity from 10% to 90% (default: 70%)
- **Edge Softness** - Gradient fade from 5px to 50px (default: 20px)
- **Three Cursor Modes** - Normal cursor, highlight dot, or no cursor

### 🖱️ **Cursor Options**
1. **Normal Cursor** - Keep your regular mouse pointer visible
2. **Highlight Dot** - Professional yellow laser pointer effect (20px, semi-transparent)
3. **No Cursor** - Completely hidden cursor for distraction-free focus

### ⚡ **Performance**
- **Hardware Accelerated** - Smooth 60fps rendering with GPU acceleration
- **Lightweight** - Minimal memory usage and battery impact
- **Optimized** - Only active when hotkeys are pressed

## 🚀 Quick Start

### Installation

#### Method 1: Chrome Web Store (Recommended)
```
Coming soon to Chrome Web Store
```

#### Method 2: Developer Installation
1. **Download** or clone this repository
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable "Developer mode"** in the top right corner
4. **Click "Load unpacked"** and select the extension folder
5. **Done!** Extension works immediately on all open tabs

### Basic Usage
1. **Hold Ctrl + Shift** and move your mouse on any webpage
2. **Watch the spotlight** follow your cursor with smooth dimming effect
3. **Release keys** to return to normal browsing
4. **Click extension icon** to customize settings

## 📖 Detailed Usage Guide

### Default Controls
```
Ctrl + Shift + Mouse Movement = Spotlight Mode
```

### Customizing Hotkeys
1. Click the **Screen Spotlight** icon in your Chrome toolbar
2. In the **"Hotkey Configuration"** section, select your preferred keys:
   - **First Key**: Choose from Ctrl, Shift, or Alt
   - **Second Key**: Choose from Ctrl, Shift, or Alt
3. **Live preview** shows your current combination
4. Changes apply **instantly** - test immediately!

### Recommended Hotkey Combinations
- **Ctrl + Shift** (Default) - Professional, zero conflicts
- **Ctrl + Alt** - Alternative if Shift is used elsewhere
- **Shift + Alt** - Lightweight option for quick access

## ⚙️ Configuration Options

### Spotlight Settings
| Setting | Range | Default | Description |
|---------|-------|---------|-------------|
| **Spotlight Radius** | 50-400px | 125px | Size of the spotlight circle |
| **Background Dimming** | 10-90% | 70% | How dark the background becomes |
| **Edge Softness** | 5-50px | 20px | Gradient fade smoothness |

### Cursor Style Options
| Option | Description | Best For |
|--------|-------------|----------|
| **Normal Cursor** | Regular mouse pointer | General browsing, detail work |
| **Highlight Dot** | Yellow semi-transparent dot (20px) | Presentations, screen recording |
| **No Cursor** | Completely hidden | Reading focus, clean screenshots |

### Recommended Settings by Use Case

#### 🎤 Presentations
- **Radius:** 200px
- **Dimming:** 60%
- **Edge Softness:** 30px  
- **Cursor:** Highlight Dot

#### 📹 Screen Recording
- **Radius:** 180px
- **Dimming:** 70%
- **Edge Softness:** 25px
- **Cursor:** Highlight Dot

#### 👨‍🏫 Online Teaching
- **Radius:** 150px
- **Dimming:** 80%
- **Edge Softness:** 20px
- **Cursor:** Highlight Dot

#### 📚 Reading Focus
- **Radius:** 250px
- **Dimming:** 50%
- **Edge Softness:** 40px
- **Cursor:** No Cursor

#### 🔍 Detail Work
- **Radius:** 100px
- **Dimming:** 70%
- **Edge Softness:** 15px
- **Cursor:** Normal Cursor

## 🛠️ Technical Details

### File Structure
```
screen-spotlight/
├── manifest.json          # Extension manifest (v3)
├── background.js          # Service worker for tab injection
├── content.js             # Main spotlight functionality
├── overlay.css            # Spotlight styling
├── popup.html             # Settings interface
├── popup.js               # Settings logic
├── popup.css              # Settings styling
└── README.md              # Documentation
```

### Browser Compatibility
- ✅ **Chrome** - Fully supported (tested)
- ✅ **Microsoft Edge** - Fully supported (Chromium-based)
- ✅ **Opera** - Fully supported (Chromium-based)
- ❌ **Firefox** - Not supported (different extension API)

### Permissions Required
- **`storage`** - Save user settings
- **`activeTab`** - Access current tab for spotlight
- **`tabs`** - Inject into existing tabs without refresh
- **`scripting`** - Inject into existing tabs without refresh

## 🔧 Development

### Setup for Development
```bash
# Clone the repository
git clone https://github.com/atulram/ScreenSpotlight.git
cd screen-spotlight

# Load in Chrome
# 1. Go to chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked" and select the folder
```

### Architecture Overview
- **Manifest V3** - Latest Chrome extension format
- **Service Worker** - Background script for tab management
- **Content Scripts** - Injected into all pages for spotlight functionality
- **Storage API** - Synchronized settings across devices

### Key Components
1. **SpotlightManager Class** (`content.js`) - Core spotlight logic
2. **PopupManager Class** (`popup.js`) - Settings interface
3. **Background Worker** (`background.js`) - Tab injection handling
4. **CSS Masks** - Hardware-accelerated spotlight rendering

## 🐛 Troubleshooting

### Extension Not Working on Existing Tabs?
**Solution:** Extension now automatically injects into existing tabs! If issues persist:
1. Try refreshing the problematic tab
2. Check if the extension is enabled at `chrome://extensions/`
3. Ensure "Spotlight Active" toggle is ON in the popup

### Hotkeys Not Responding?
**Possible Causes & Solutions:**
1. **Website capturing keys** - Try different hotkey combination
2. **Extension disabled** - Check toggle in popup
3. **Browser focus** - Click on the webpage first
4. **Conflicting extensions** - Temporarily disable other extensions

### Spotlight Not Smooth?
**Performance Solutions:**
1. **Close heavy tabs** - Reduce browser memory usage
2. **Update Chrome** - Ensure latest version for best performance
3. **Check hardware acceleration** - Enable in Chrome settings
4. **Reduce spotlight size** - Smaller radius = better performance

### Settings Not Saving?
**Solutions:**
1. **Check permissions** - Extension needs storage access
2. **Chrome sync** - Settings sync across signed-in Chrome instances
3. **Reset to defaults** - Click "Reset to Defaults" button

### Yellow Dot Not Visible?
**Solutions:**
1. **Check cursor setting** - Ensure "Highlight Dot" is selected
2. **Website override** - Some sites may hide custom cursors
3. **Try different pages** - Test on multiple websites

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Issues
1. **Check existing issues** first
2. **Provide detailed description** including:
   - Chrome version
   - Operating system
   - Steps to reproduce
   - Expected vs actual behavior

### Feature Requests
1. **Search existing requests** to avoid duplicates
2. **Describe the use case** clearly
3. **Explain why it would be useful**

### Code Contributions
1. **Fork** the repository
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Development Guidelines
- Follow existing code style
- Test on multiple websites
- Update documentation for new features
- Ensure backward compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Changelog

### Version 1.0.0 (Latest)
- ✨ **Initial release** with full spotlight functionality
- ⌨️ **Customizable hotkeys** with live preview
- 🎯 **Three cursor modes** (Normal, Highlight Dot, No Cursor)
- 📱 **Optimized popup** with compact design
- ⚡ **Auto-injection** into existing tabs
- 🛡️ **Conflict prevention** for browser shortcuts

### Upcoming Features
- 🌟 Additional spotlight shapes (square, oval)
- 🎨 Custom color themes
- 📏 Multiple spotlight sizes simultaneously
- 🎮 Mouse gesture controls
- 📊 Usage analytics dashboard

## 🌟 Acknowledgments

- **Chrome Extensions Team** - For excellent documentation and APIs
- **Open Source Community** - For inspiration and best practices
- **Beta Testers** - For feedback and bug reports
- **Users** - For feature requests and real-world usage insights

## 📞 Support

### Getting Help
- **Documentation** - Check this README first
- **Issues** - Report bugs on GitHub Issues
- **Discussions** - General questions on GitHub Discussions

### Useful Links
- 📖 [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- 🎯 [Project Homepage](#)
- 🎪 [Demo Video](#)

---

<div align="center">

**Made with ❤️ for the presentation and education community**

[⭐ Star on GitHub](https://github.com/atulram/ScreenSpotlight) • 
[🐛 Report Bug](https://github.com/atulram/ScreenSpotlight/issues) • 
[💡 Request Feature](https://github.com/atulram/ScreenSpotlight/issues)

</div>