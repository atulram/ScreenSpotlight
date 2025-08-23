class SpotlightManager {
  constructor() {
    this.isEnabled = true;
    this.isActive = false;
    this.settings = {
      spotlightRadius: 125, // Changed default from 150 to 125
      dimOpacity: 0.7,
      gradientSize: 20,
      hotkey1: 'ctrl', // First modifier key
      hotkey2: 'shift', // Second modifier key
      cursorStyle: 'highlight' // 'normal' or 'highlight'
    };
    this.overlay = null;
    this.customCursor = null;
    this.mousePos = { x: 0, y: 0 };
    this.keyStates = { ctrl: false, shift: false, alt: false };
    this.mouseUpdateScheduled = false;
    
    this.init();
  }

  async init() {
    // Load settings from storage
    await this.loadSettings();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Listen for settings changes
    this.setupStorageListener();
    
    console.log('Screen Spotlight initialized');
  }

  async loadSettings() {
    try {
      const stored = await chrome.storage.sync.get(this.settings);
      this.settings = { ...this.settings, ...stored };
      
      // Also check if extension is enabled
      const { isEnabled } = await chrome.storage.sync.get({ isEnabled: true });
      this.isEnabled = isEnabled;
    } catch (error) {
      console.log('Using default settings');
    }
  }

  setupStorageListener() {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.onChanged.addListener((changes) => {
        Object.keys(changes).forEach(key => {
          if (key === 'isEnabled') {
            this.isEnabled = changes[key].newValue;
            if (!this.isEnabled) {
              this.disableSpotlight();
            }
          } else if (this.settings.hasOwnProperty(key)) {
            this.settings[key] = changes[key].newValue;
            if (this.isActive) {
              this.applySettings();
            }
          }
        });
      });
    }
  }

  setupEventListeners() {
    // Mouse movement tracking
    document.addEventListener('mousemove', (e) => {
      this.mousePos = { x: e.clientX, y: e.clientY };
      this.scheduleUpdate();
      this.updateCustomCursor();
    }, { passive: true });

    // Key down events
    document.addEventListener('keydown', (e) => {
      if (!this.isEnabled) return;
      
      this.keyStates.ctrl = e.ctrlKey;
      this.keyStates.shift = e.shiftKey;
      this.keyStates.alt = e.altKey;
      
      // Prevent Alt key from activating browser menu
      if (e.altKey && this.settings.hotkey1 === 'alt' || this.settings.hotkey2 === 'alt') {
        e.preventDefault();
      }
      
      this.updateSpotlightMode();
    }, { passive: false });

    // Key up events
    document.addEventListener('keyup', (e) => {
      if (!this.isEnabled) return;
      
      this.keyStates.ctrl = e.ctrlKey;
      this.keyStates.shift = e.shiftKey;
      this.keyStates.alt = e.altKey;
      
      this.updateSpotlightMode();
    }, { passive: true });

    // Handle focus loss to reset key states
    window.addEventListener('blur', () => {
      this.keyStates = { ctrl: false, shift: false, alt: false };
      this.updateSpotlightMode();
    });

    // Handle page unload
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
  }

  scheduleUpdate() {
    if (!this.mouseUpdateScheduled && this.isActive) {
      this.mouseUpdateScheduled = true;
      requestAnimationFrame(() => {
        this.updateSpotlight();
        this.mouseUpdateScheduled = false;
      });
    }
  }

  updateSpotlightMode() {
    const shouldBeActive = this.isEnabled && this.shouldActivateSpotlight();
    
    if (shouldBeActive !== this.isActive) {
      this.isActive = shouldBeActive;
      if (this.isActive) {
        this.enableSpotlight();
      } else {
        this.disableSpotlight();
      }
    }
  }

  shouldActivateSpotlight() {
    const key1Active = this.keyStates[this.settings.hotkey1];
    const key2Active = this.keyStates[this.settings.hotkey2];
    return key1Active && key2Active;
  }

  enableSpotlight() {
    this.createSpotlightOverlay();
    this.setupCursor();
  }

  disableSpotlight() {
    this.removeOverlay();
    this.removeCursor();
  }

  createSpotlightOverlay() {
    if (this.overlay) {
      this.removeOverlay();
    }

    const overlay = document.createElement('div');
    overlay.className = 'spotlight-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 2147483647;
      background: rgba(0, 0, 0, ${this.settings.dimOpacity});
      mask: radial-gradient(circle at ${this.mousePos.x}px ${this.mousePos.y}px,
                           transparent ${this.settings.spotlightRadius - this.settings.gradientSize}px,
                           rgba(0,0,0,0.3) ${this.settings.spotlightRadius}px,
                           black ${this.settings.spotlightRadius + 1}px);
      -webkit-mask: radial-gradient(circle at ${this.mousePos.x}px ${this.mousePos.y}px,
                                   transparent ${this.settings.spotlightRadius - this.settings.gradientSize}px,
                                   rgba(0,0,0,0.3) ${this.settings.spotlightRadius}px,
                                   black ${this.settings.spotlightRadius + 1}px);
    `;
    
    document.body.appendChild(overlay);
    this.overlay = overlay;
  }

  updateSpotlight() {
    if (!this.overlay) return;

    const maskValue = `radial-gradient(circle at ${this.mousePos.x}px ${this.mousePos.y}px,
                     transparent ${this.settings.spotlightRadius - this.settings.gradientSize}px,
                     rgba(0,0,0,0.3) ${this.settings.spotlightRadius}px,
                     black ${this.settings.spotlightRadius + 1}px)`;
    
    this.overlay.style.mask = maskValue;
    this.overlay.style.webkitMask = maskValue;
  }

  applySettings() {
    if (this.isActive && this.overlay) {
      // Update overlay opacity
      this.overlay.style.background = `rgba(0, 0, 0, ${this.settings.dimOpacity})`;
      // Update spotlight
      this.updateSpotlight();
      // Update cursor style
      this.updateCursorStyle();
    }
  }

  setupCursor() {
    if (this.settings.cursorStyle === 'normal') {
      // Keep normal cursor
      document.body.style.cursor = '';
    } else if (this.settings.cursorStyle === 'highlight') {
      // Hide normal cursor and show custom cursor
      document.body.style.cursor = 'none';
      this.createCustomCursor();
    } else if (this.settings.cursorStyle === 'none') {
      // Hide cursor completely
      document.body.style.cursor = 'none';
    }
  }

  createCustomCursor() {
    if (this.customCursor) {
      this.removeCustomCursor();
    }

    const cursor = document.createElement('div');
    cursor.className = 'custom-spotlight-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 0, 0.2);
      border: 2px solid rgba(255, 200, 0, 0.6);
      border-radius: 50%;
      pointer-events: none;
      z-index: 2147483648;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px rgba(255, 255, 0, 0.4);
      left: ${this.mousePos.x}px;
      top: ${this.mousePos.y}px;
    `;

    document.body.appendChild(cursor);
    this.customCursor = cursor;
  }

  updateCustomCursor() {
    if (this.customCursor && this.isActive && this.settings.cursorStyle === 'highlight') {
      this.customCursor.style.left = `${this.mousePos.x}px`;
      this.customCursor.style.top = `${this.mousePos.y}px`;
    }
  }

  updateCursorStyle() {
    if (this.isActive) {
      this.removeCursor();
      this.setupCursor();
    }
  }

  removeCursor() {
    document.body.style.cursor = '';
    this.removeCustomCursor();
  }

  removeCustomCursor() {
    if (this.customCursor && this.customCursor.parentNode) {
      this.customCursor.parentNode.removeChild(this.customCursor);
    }
    this.customCursor = null;
  }

  removeOverlay() {
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
    this.overlay = null;
  }

  cleanup() {
    this.removeOverlay();
    this.removeCursor();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SpotlightManager();
  });
} else {
  new SpotlightManager();
}
