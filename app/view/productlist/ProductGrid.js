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

    initComponent: function() {
        this.columns = this.createColumns();
        this.dockedItems = this.createDockedItems();

        this.callParent(arguments);

        this.loadInventory();
    },

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

    createDockedItems: function() {
        return [{
            xtype: 'pagingtoolbar',
            bind: '{productStore}',
            dock: 'bottom',
            displayInfo: true
        }];
    },

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
            renderer: Ext.util.Format.dateRenderer('d-m-Y')
        }, {
            dataIndex: 'online_date',
            text: 'Online Date',
            renderer: Ext.util.Format.dateRenderer('d-m-Y')
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

    loadInventory: function() {
        this.setLoading(true);
        
        Ext.Ajax.request({
            url: 'app/data/productlist/inventory.json',
            scope: this,
            callback: function(options, success, response) {
                if (success) {
                    var inventory = Ext.decode(response.responseText), 
                        store = this.getViewModel().getStore('productStore');

                    store.getProxy().setData(inventory);
                    store.load();
                }

                this.setLoading(false);
            }
        });
    }
});