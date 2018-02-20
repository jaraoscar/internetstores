/**
 * ProductGrid component
 * @class
 */
Ext.define('internetstores.view.productlist.ProductGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.productgrid',

    title: 'Inventory',
    iconCls: 'product-icon',

    selModel: {
        mode: 'SINGLE'
    },

    viewModel: {
        stores: {
            productStore: {
                type: 'productstore'
            }
        }   
    },
    
    bind: '{productStore}',
    plugins: 'gridfilters',

    /**
     * @private
     * @constant {String} DEFAULT_DATE_FORMAT 
     * The format used for displaying dates
     */
    DEFAULT_DATE_FORMAT: 'd-m-Y',

    /** @inheritdoc */
    initComponent: function() {
        this.columns = this.createColumns();
        this.dockedItems = this.createDockedItems();

        this.callParent(arguments);

        // Load data for the first time
        this.loadInventory();
    },

    /**
     * @private
     * Used to get the component columns
     * @returns {Object[]} columns
     */
    createColumns: function() {
        var columns = this.getColumnsCfg();

        Ext.Array.each(columns, function(column) {
            column.sortable = true;
            column.resizable = true;
            column.draggable = true;
            column.hideable = false;
            column.flex = 1;
        });

        return columns;
    },

    /**
     * @private
     * Used to get the component columns
     * @returns {Object[]} columns
     */
    createDockedItems: function() {
        return [{
            xtype: 'pagingtoolbar',
            bind: '{productStore}',
            dock: 'top',
            displayInfo: true
        }];
    },

    /**
     * @private
     * Used to get the component columns definition
     * @returns {Object[]}
     */
    getColumnsCfg: function() {
        return [{
            dataIndex: 'id',
            text: 'Id'
        }, {
            dataIndex: 'product_name',
            text: 'Name',
            filter: {
                type: 'string'
            },
        }, {
            dataIndex: 'product_price', 
            text: 'Price (&euro;)'
        }, {
            dataIndex: 'date_created',
            text: 'Create Date',
            filter: {
                type: 'date'
            },
            renderer: Ext.util.Format.dateRenderer(this.DEFAULT_DATE_FORMAT)
        }, {
            dataIndex: 'online_date',
            text: 'Online Date',
            renderer: Ext.util.Format.dateRenderer(this.DEFAULT_DATE_FORMAT)
        }, {
            dataIndex: 'user_created',
            text: 'Create User',
            filter: {
                type: 'combobox',
                store: this.getViewModel().getStore('productStore'),
                displayField: 'user_created',
                valueField: 'user_created'
            }
        }];
    },

    /**
     * Used to fetch data from the server
     * NOTE: This sets the grid into a loading state until the data is fetched
     */
    loadInventory: function() {
        this.setLoading(true);
        
        Ext.Ajax.request({
            url: 'app/data/productlist/inventory.json',
            scope: this,
            callback: function(options, success, response) {
                if (success) {
                    var inventory = Ext.decode(response.responseText), 
                        store = this.getViewModel().getStore('productStore');

                    // Load the store with the inventory
                    store.getProxy().setData(inventory);
                    store.load();
                }

                this.setLoading(false);
            }
        });
    }
});