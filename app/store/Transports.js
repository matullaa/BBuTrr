/**
 * Created with JetBrains PhpStorm.
 * User: R5596333
 * Date: 04/04/13
 * Time: 22:39
 * To change this template use File | Settings | File Templates.
 */
Ext.define("BBuTrr.store.Transports", {
    extend:"Ext.data.Store",
    requires:"Ext.data.proxy.LocalStorage",

    config:{
        model:"BBuTrr.model.TransportModel",


        data:[
            {trkor:"DI1K900001", astxt:"First TR", sysid:"SPIKE"},
            {trkor:"DI1K900002", astxt:"Second TR", sysid:"SPIKE"},
            {trkor:"DI1K900003", astxt:"Third TR", sysid:"SPIKE"},
            {trkor:"DG2K910003", astxt:"Another TR", sysid:"GLASS"},
            {trkor:"DI1K900004", astxt:"Fourth TR", sysid:"SPIKE"},
            {trkor:"DI1K900014", astxt:"Fourth TR", sysid:"SPIKE"},
            {trkor:"DI1K900024", astxt:"Fourth TR", sysid:"SPIKE"},
            {trkor:"DI1K900034", astxt:"Fourth TR", sysid:"SPIKE"},
            {trkor:"DI1K900044", astxt:"Fourth TR", sysid:"SPIKE"},
            {trkor:"DI1K900234", astxt:"Fourth TR", sysid:"SPIKE"},
            {trkor:"DI1K900084", astxt:"Fourth TR", sysid:"SPIKE"},
            {trkor:"DI1K900064", astxt:"Fourth TR", sysid:"SPIKE"},
            {trkor:"DI1K900022", astxt:"Fourth TR", sysid:"SPIKE"}
        ],
        sorters:[
            {property:'sysid', direction:'ASC'}
        ],
        grouper:{
            sortProperty:"sysid",
            direction:"ASC",
            groupFn:function (record) {
                if (record && record.data.sysid) {
                    return record.data.sysid;
                } else {
                    return '';
                }
            }
        }
    }
});
