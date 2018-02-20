/**
 * Product model
 * @class
 */
Ext.define('internetstores.model.productlist.Product', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        {name: 'id', type: 'int', defaultValue: 0},
        {name: 'product_name', type: 'string'},
        {name: 'product_price', type: 'number'},
        {name: 'date_created', type: 'date', dateFormat: 'd-m-Y'},
        {name: 'online_date', type: 'date', dateFormat: 'd-m-Y'},
        {name: 'user_created', type: 'string'}
    ]
});