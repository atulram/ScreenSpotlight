class PopupManager {
  constructor() {
    this.defaults = {
      spotlightRadius: 125, // Changed from 150 to 125
      dimOpacity: 0.7,
      gradientSize: 20,
      hotkey1: 'ctrl',
      hotkey2: 'shift',
      cursorStyle: 'highlight', // 'normal' or 'highlight'
      isEnabled: true
    };
    
    this.init();
  }

  async init() {
    await this.loadSettings();
    this.setupEventListeners();
    this.updateUI();
  }

  async loadSettings() {
    try {
      this.settings = await chrome.storage.sync.get(this.defaults);
    } catch (error) {
      console.log('Error loading settings, using defaults');
      this.settings = { ...this.defaults };
    }
  }

  setupEventListeners() {

    // Hotkey dropdowns
    const hotkey1Select = document.getElementById('hotkey1');
    const hotkey2Select = document.getElementById('hotkey2');
    
    hotkey1Select.addEventListener('change', (e) => {
      this.updateSetting('hotkey1', e.target.value);
    });
    
    hotkey2Select.addEventListener('change', (e) => {
      this.updateSetting('hotkey2', e.target.value);
    });

    // Cursor style radio buttons
    const cursorRadios = document.querySelectorAll('input[name="cursorStyle"]');
    cursorRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.updateSetting('cursorStyle', e.target.value);
        }
      });
    });
    const ranges = [
      { id: 'spotlightRadius', suffix: 'px' },
      { id: 'dimOpacity', suffix: '%', multiplier: 100 },
      { id: 'gradientSize', suffix: 'px' }
    ];

    ranges.forEach(range => {
      const input = document.getElementById(range.id);
      const valueDisplay = document.getElementById(range.id + 'Value');
      
      input.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        this.updateSetting(range.id, value);
        this.updateRangeDisplay(range.id, value, range.suffix, range.multiplier);
      });
    });

    // Reset button
    document.getElementById('resetDefaults').addEventListener('click', () => {
      this.resetToDefaults();
    });
  }

  updateUI() {

    // Update hotkey selects
    document.getElementById('hotkey1').value = this.settings.hotkey1;
    document.getElementById('hotkey2').value = this.settings.hotkey2;

    // Update cursor style radio buttons
    const cursorRadio = document.querySelector(`input[name="cursorStyle"][value="${this.settings.cursorStyle}"]`);
    if (cursorRadio) {
      cursorRadio.checked = true;
    }

    // Update all range inputs and their displays
    document.getElementById('spotlightRadius').value = this.settings.spotlightRadius;
    this.updateRangeDisplay('spotlightRadius', this.settings.spotlightRadius, 'px');

    document.getElementById('dimOpacity').value = this.settings.dimOpacity;
    this.updateRangeDisplay('dimOpacity', this.settings.dimOpacity, '%', 100);

    document.getElementById('gradientSize').value = this.settings.gradientSize;
    this.updateRangeDisplay('gradientSize', this.settings.gradientSize, 'px');

  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  updateRangeDisplay(id, value, suffix, multiplier = 1) {
    const displayValue = multiplier !== 1 ? Math.round(value * multiplier) : value;
    document.getElementById(id + 'Value').textContent = displayValue + suffix;
  }

  async updateSetting(key, value) {
    this.settings[key] = value;
    try {
      await chrome.storage.sync.set({ [key]: value });
    } catch (error) {
      console.log('Error saving setting:', error);
    }
  }

  async resetToDefaults() {
    this.settings = { ...this.defaults };
    
    try {
      await chrome.storage.sync.set(this.settings);
      this.updateUI();
      
      // Visual feedback
      const button = document.getElementById('resetDefaults');
      const originalText = button.textContent;
      button.textContent = 'Reset Complete!';
      button.style.background = '#28a745';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 1000);
      
    } catch (error) {
      console.log('Error resetting settings:', error);
    }
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PopupManager();
});
