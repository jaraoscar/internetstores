/**
 * Product store
 * @class
 */
Ext.define('internetstores.store.productlist.ProductStore', {
    extend: 'Ext.data.Store',
    model: 'internetstores.model.productlist.Product',
    alias: 'store.productstore',
    autoLoad: false,
    pageSize: 10,
    proxy: {
        type: 'memory',
        enablePaging: true,
        reader: {
            type: 'json'
        }
    }
});