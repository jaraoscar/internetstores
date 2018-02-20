Ext.define('internetstores.view.productlist.grid.ComboBoxFilter', {
    extend: 'Ext.grid.filters.filter.SingleFilter',
    alias: 'grid.filter.combobox',

    type: 'combobox',

    operator: '==',

    itemDefaults: {
        emptyText: 'Select Item',
        iconCls: Ext.String.format('{0}{1}', Ext.baseCSSPrefix, 'grid-filters-find')
    },

    config: {
        store: null,
        displayField: null,
        valueField: null
    },

    activateMenu: function () {
        this.inputItem.setValue(this.filter.getValue());
    },

    createMenu: function() {
        this.callParent();

        var cfg = this.getItemDefaults();

        cfg.xtype = 'combobox';
        cfg.labelSeparator = '';
        cfg.labelWidth = 30;
        cfg.margin = 0;
        cfg.hideEmptyLabel = false;
        cfg.editable = false;
        cfg.forceSelection = true;
        cfg.labelClsExtra = Ext.String.format('{0}{1} {2}', Ext.baseCSSPrefix, 'grid-filters-icon', cfg.iconCls);
        cfg.displayField = this.getDisplayField();
        cfg.valueField = this.getValueField();
        cfg.store = this.getStore();

        this.inputItem = this.menu.add(cfg);

        this.inputItem.on({
            scope: this,
            select: function(combo) {
                this.setValue(combo.getValue());
            }
        });
    },

    setValue: function (value) {
        if (this.inputItem) {
            this.inputItem.setValue(value);
        }

        this.filter.setValue(value);

        if (value && this.active) {
            this.value = value;
            this.updateStoreFilter();
        } else {
            this.setActive(!!value);
        }
    },

    createFilter: function(cfg, key) {
        if (Ext.isDefined(this.filterFn)) {
            return Ext.create('Ext.util.Filter', {
                filterFn: function(record) {
                    return Ext.callback(this.filterFn, this.scope, [record, this.inputItem.getValue()]);
                }
            });
        } else {
            return this.callParent(arguments);
        }
    }
});