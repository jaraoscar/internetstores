/**
 * ProductList view
 * @class
 */
Ext.define('internetstores.view.productlist.ProductList', {
    extend: 'Ext.Container',
    controller: 'productlist',

    layout: 'hbox',

    fullscreen: true,

    /** @inheritdoc */
    initComponent: function() {
        this.items = this.createItems();

        this.callParent(arguments);
    },

    /**
     * Used to get the component items
     * @returns {Object[]}
     */
    createItems: function() {
        return [{
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            flex: 1,
            items: [{
                xtype: 'productgrid',
                itemId: 'productgrid',
                flex: 1,
                listeners: {
                    selectionchange: 'onProductGridSelectionChange',
                    rowdblclick: 'onProductGridRowDoubleClick' 
                }
            }]
        }, {
            xtype: 'form',
            itemId: 'productform',
            iconCls: 'edit-icon',
            componentCls: 'left-border',
            header: {
                title: 'Details'
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            flex: 1,
            bodyPadding: 5,
            fieldDefaults: {
                anchor: '100%',
                labelAlign: 'right'
            },
            hidden: true,
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Product Id',
                name: 'id',
                allowBlank: false,
                disabled: true
            }, {
                xtype: 'textfield',
                fieldLabel: 'Create User',
                name: 'user_created',
                allowBlank: false,
                disabled: true
            }, {
                xtype: 'textfield',
                fieldLabel: 'Create Date',
                name: 'date_created',
                allowBlank: false,
                disabled: true
            }, {
                xtype: 'textfield',
                fieldLabel: 'Online Date',
                minLength: 10,
                maxLength: 10,
                allowBlank: false,
                value: Ext.Date.format(new Date(), 'd-m-Y'),
                readOnly: true,
                listeners: {
                    render: this.onOnlineDateRender
                }
            }, {
                xtype: 'textfield',
                fieldLabel: 'Product Name',
                name: 'product_name',
                minLength: 4,
                maxLength: 20,
                allowBlank: false,
                validator: this.onValidateProductName
            }, {
                xtype: 'textfield',
                fieldLabel: 'Product Price',
                name: 'product_price',
                minLength: 1,
                maxLength: 10,
                allowBlank: false,
                validator: this.onValidateProductPrice
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'save-icon',
                    text: 'Save',
                    handler: 'onUpdateProduct'
                }]
            }]
        }];
    },

    /**
     * OnlineDate field 'render' event handler
     * NOTE: This is used just to set a tooltip
     */
    onOnlineDateRender: function(field) {
        field.getEl().set({'data-qtip': 'The Online Date cannot be before today'});
    },

    /**
     * ProductName field validator
     * NOTE: The value should not be empty
     * @returns {Boolean/String} `true` if conditions are valid or an error message
     */
    onValidateProductName: function(value) {
        value = Ext.String.trim(value || '');
        
        return value ? true : 'Empty values are not allowed';
    },

    /**
     * ProductPrice field validator
     * NOTE: The value should be numeric, not empty and greater than zero
     * @returns {Boolean/String} `true` if conditions are valid or an error message
     */
    onValidateProductPrice: function(value) {
        value = Ext.String.trim(value || '');
        value = parseFloat(value);

        return (!!value && value > 0) ? true : 'The value should be numeric and greater than zero';
    }
});