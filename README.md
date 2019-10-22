# Internetstores ExtJS Sample App
- Use of `Ext.grid.Panel` from the `classic` toolkit.
- Includes sorting, custom filtering, pagination and records can be updated.
- Data is handled by a JSON file.

## Getting started
### Prerequisites
- Install [Sencha Cmd](https://www.sencha.com/products/extjs/cmd-download) (6.5.3)
- Download [Sencha ExtJS](https://ext4all.com/ext/download/ext-6.2.0-gpl.zip) (6.2.0 GPL) I recommend
 extracting ExtJS into a `"sencha-sdks"` folder in your home directory.

On Windows, the "~" part of the path will be replaced by something like "C:\Users\Me\".

### Configure the app
Install the ExtJS framework for the application:

    $ cd internetstores
    $ sencha app install ~/sencha-sdks
    or
    $ sencha app upgrade ~/sencha-sdks/ext-<version of the sdk>

Note: If you use `sencha app install ~/sencha-sdks` here, the version of the SDK inside ~/sencha-sdks will
have to mach the version specified in `workspace.json`.

### Run the app
    $ sencha app watch
