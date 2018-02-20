Ext.define('internetstores.controller.productlist.ProductList', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productlist',

    onProductGridSelectionChange: function(grid, selected, eOpts) {
        this.displayFormAndMapProduct();
    },

    onProductGridRowDoubleClick: function(grid, record, element, rowIndex, e, eOpts) {
        this.displayFormAndMapProduct();
    },

    onUpdateProduct: function(button, e) {
        var record = this.getProductRecord(),
            form = this.getProductForm();

        if (record && form.isValid()) {
            form.updateRecord(record);
            
            // Online date must be today
            record.data.online_date = new Date();
            record.commit();

            form.setVisible(false);
            
            Ext.Msg.alert('Inventory', 'The product was updated.');
        }
    },

    displayFormAndMapProduct: function() {
        var record = this.getProductRecord(),
            form = this.getProductForm();

        if (record) {
            form.loadRecord(record);
            form.setVisible(true);
        }
    },

    getProductRecord: function() {
        var grid = this.getView().down('#productgrid'),
            selected = grid.getSelectionModel().getSelection(),
            record;
        
        if (!Ext.isEmpty(selected)) {
            record = selected[0];
        }

        return record;
    },

    getProductForm: function() {
        return this.getView().down('#productform');
    }
});