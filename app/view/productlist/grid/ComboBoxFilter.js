/**
 * ComboBoxFilter custom component for grid columns
 * @class
 */
Ext.define('internetstores.view.productlist.grid.ComboBoxFilter', {
    extend: 'Ext.grid.filters.filter.SingleFilter',
    alias: 'grid.filter.combobox',

    /**
     * @private
     * @property {String} type
     * The custom filter type
     */
    type: 'combobox',

    /**
     * @private
     * @property {String} operator
     * The custom filter operator
     * NOTE: Take a look at the {@link Ext.grid.filters.filter.SingleFilter} implementation
     */
    operator: '==',

    /**
     * @property {Object} itemDefaults
     * Contains the default component properties
     */
    itemDefaults: {
        emptyText: 'Select Item',
        iconCls: Ext.String.format('{0}{1}', Ext.baseCSSPrefix, 'grid-filters-find')
    },

    config: {
        /**
         * @property {Ext.data.Store} store 
         * The grid store to be used
         */
        store: null,

        /**
         * @property {String} displayField
         * The model atribute from the grid store that will be used 
         * as the display value for the combobox records
         */
        displayField: null,

        /**
         * @property {String} valueField
         * The model atribute from the grid store that will be used 
         * as the value to be obtained from a combobox record
         */
        valueField: null
    },

    /** @override */
    activateMenu: function() {
        this.inputItem.setValue(this.filter.getValue());
    },

    /** @override */
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

    /** @override */
    setValue: function(value) {
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

    /** @override */
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