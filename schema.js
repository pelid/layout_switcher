const Gio = imports.gi.Gio
const ExtensionUtils = imports.misc.extensionUtils
const Me = imports.misc.extensionUtils.getCurrentExtension();

function buildGsettingsSchema() {
  let schema = Me.metadata['settings-schema']
  const GioSSS = Gio.SettingsSchemaSource
  let schemaSource = GioSSS.new_from_directory(Me.path + "/schemas", GioSSS.get_default(), false)
  let schemaObj = schemaSource.lookup(schema, true)
  if (!schemaObj)
    throw new Error('Schema ' + schema + ' could not be found for extension '
                    + Me.metadata.uuid + '. Please check your installation.')

  return new Gio.Settings({ settings_schema: schemaObj })
}
