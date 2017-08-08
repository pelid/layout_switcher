const St = imports.gi.St
const Main = imports.ui.main
const Tweener = imports.ui.tweener
const Shell = imports.gi.Shell
const Meta = imports.gi.Meta
const Gio = imports.gi.Gio
const ExtensionUtils = imports.misc.extensionUtils

// Import the schema.js (Used for loading settings schemas)
const Self = imports.misc.extensionUtils.getCurrentExtension();
const Schema = Self.imports.schema;

function NotificationPanel(){
  this.constructor()
}
NotificationPanel.prototype = {
  Name : 'NotificationPanel',

  constructor: function(){
    this.panel = null
  },

  show: function(text="Triggered!"){
    if (!this.panel) {
        this.panel = new St.Label({ style_class: 'notification-label'})
        Main.uiGroup.add_actor(this.panel)
    }

    this.panel.opacity = 255
    this.panel.text = text

    let monitor = Main.layoutManager.primaryMonitor

    let x = monitor.x + Math.floor(monitor.width / 2 - this.panel.width / 2)
    let y = monitor.y + Math.floor(monitor.height / 2 - this.panel.height / 2)
    this.panel.set_position(x, y)

    Tweener.addTween(this.panel, {
      opacity: 0,
      time: 0.5,
      transition: 'easeOutQuad',
      onComplete: this.hide.bind(this)
    })
  },

  hide: function(){
    Main.uiGroup.remove_actor(this.panel)
    this.panel = null
  },
}


function App(){
  this.constructor()
}
App.prototype = {
  Name : 'App',

  constructor: function(){
    this.notificationPanel = new NotificationPanel()
    this.settings = Schema.buildGsettingsSchema()

    this.settings.connect('changed::show-notification', ()=>{
      this.disable()
      this.enable()
    })
  },



  _addKeybinding: function(name, handler) {
    if (Main.wm.addKeybinding) {
      var ModeType = Shell.hasOwnProperty('ActionMode') ? Shell.ActionMode : Shell.KeyBindingMode
      Main.wm.addKeybinding(name, this.settings, Meta.KeyBindingFlags.NONE, ModeType.NORMAL | ModeType.OVERVIEW, handler)
    } else {
      global.display.add_keybinding(name, this.settings, Meta.KeyBindingFlags.NONE, handler)
    }
  },

  _removeKeybinding: function(name) {
    if (Main.wm.removeKeybinding) {
      Main.wm.removeKeybinding(name)
    }
    else {
      global.display.remove_keybinding(name)
    }
  },

  enable: function() {
    // Will be called by Gnome Shell. It`s a part of extension API
    let isNotificationVisible = this.settings.get_boolean('show-notification')

    this._addKeybinding('switch-to-first-layout', () => {
      if (isNotificationVisible)
        this.notificationPanel.show('First Layout')
      Meta.get_backend().lock_layout_group(0)
    })

    this._addKeybinding('switch-to-second-layout', () => {
      if (isNotificationVisible)
        this.notificationPanel.show('Second Layout')
      Meta.get_backend().lock_layout_group(1)
    })
  },

  disable: function() {
    // Will be called by Gnome Shell. It`s a part of extension API
    this._removeKeybinding('switch-to-first-layout')
    this._removeKeybinding('switch-to-second-layout')
  },
}



let app = null
function init() {
  // Will be called by Gnome Shell. It`s a part of extension API
  app = new App()
}
function enable() {
  // Will be called by Gnome Shell. It`s a part of extension API
  app.enable()
}
function disable() {
  // Will be called by Gnome Shell. It`s a part of extension API
  app.disable()
}
