/**
 * ProductList controller
 * @class
 */
Ext.define('internetstores.controller.productlist.ProductList', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productlist',

    /**
     * Product grid 'selectionchange' event handler
     */
    onProductGridSelectionChange: function() {
        this.displayFormAndMapProduct();
    },

    /**
     * Product grid 'rowdblclick' event handler
     */
    onProductGridRowDoubleClick: function() {
        this.displayFormAndMapProduct();
    },

    /**
     * Product form save button handler
     */
    onUpdateProduct: function() {
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

    /**
     * Used to show the product form and map the record with it
     */
    displayFormAndMapProduct: function() {
        var record = this.getProductRecord(),
            form = this.getProductForm();

        if (record) {
            form.loadRecord(record);
            form.setVisible(true);
        }
    },

    /**
     * Used to get the selected record from the product grid
     * @returns {internetstores.model.productlist.Product} record
     */
    getProductRecord: function() {
        var grid = this.getView().down('#productgrid'),
            selected = grid.getSelectionModel().getSelection(),
            record;
        
        if (!Ext.isEmpty(selected)) {
            record = selected[0];
        }

        return record;
    },

    /**
     * Used to get the product form
     * @returns {Ext.form.Panel}
     */
    getProductForm: function() {
        return this.getView().down('#productform');
    }
});