const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;
const Me = imports.misc.extensionUtils.getCurrentExtension();
const _ = imports.gettext.domain(Me.uuid).gettext;

// Import the schema.js (Used for loading settings schemas)
const Self = imports.misc.extensionUtils.getCurrentExtension();
const Schema = Self.imports.schema;

let settings;
function init() {
  // Will be called by Gnome Shell. It`s a part of extension API
  imports.gettext.bindtextdomain(Me.uuid, Me.path + "/locale");
  settings = Schema.buildGsettingsSchema()
}

function addSetting(vbox, label, tooltip, conf) {
  let hbox = new Gtk.Box({
    orientation : Gtk.Orientation.HORIZONTAL
  });

  let settingLabel = new Gtk.Label({
    label : _(label),
    xalign : 0
  });

  let settingSwitch = new Gtk.Switch();
  settings.bind(conf, settingSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
  settingLabel.set_tooltip_text(_(tooltip));
  settingSwitch.set_tooltip_text(_(tooltip));

  hbox.pack_start(settingLabel, true, true, 0);
  hbox.add(settingSwitch);

  vbox.add(hbox);
}

function buildPrefsWidget() {
  let vbox = new Gtk.Box({
    orientation : Gtk.Orientation.VERTICAL,
    margin : 10,
    margin_top : 15,
    spacing : 10
  });

  let label = "Enable notifications";
  let tooltip = "Do you want to see notification on layout switch?";
  addSetting(vbox, label, tooltip, 'show-notification');

  vbox.show_all();
  return vbox;
}
