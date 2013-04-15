/**
 * Created with JetBrains PhpStorm.
 * User: R5596333
 * Date: 19/12/12
 * Time: 17:06
 * To change this template use File | Settings | File Templates.
 */
Ext.define("BBuTrr.controller.Notes", {
    extend:"Ext.app.Controller",

    config:{
        refs:{
            mainList:"main"
        },
        control:{
            mainList:{
                RefreshTransports:"onRefreshTransports"
            }
        }
    },
    onRefreshTransports:function () {
        console.log("onRefreshtransports");
    },

    launch:function () {
        this.callParent(arguments);
        Ext.getStore("Transports").load();
        console.log("Launch event Controller ");
    },

    init:function () {
        console.log("Init event Controller");
    }
});


