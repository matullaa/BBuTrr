Ext.define('BBuTrr.view.Main', {
    extend:'Ext.tab.Panel',
    xtype:'main',
    fullscreen:true,
    requires:[
        'Ext.TitleBar',
        'BBuTrr.view.TransportsList'
    ],
    alias:"widget.main",

    config:{
        id:'tab-id',
        tabBarPosition:'bottom',
        layout:{
            type:'card',
            //animation:'fade'
        },
        translationMethod:'slide',
        listeners:{
            activeitemchange:function (tabPanel, tab, oldTab) {
                // Ext.Msg.alert('activeitemchange', 'Current tab: ' + tab.config.title);
            } // activeitemchange
        } // listeners
    },

    initialize:function () {
        this.callParent(arguments);
        console.log("initialize");

        var refButton = {
            xtype:"button",
            text:"Refresh",
            ui:"mask",
            handler:this.onRefreshButtonTap,
            scope:this
        };

        var spacer = {
            xtype:"spacer"
        };

        var list = {
            xtype:"transportslist",
            layout:'fit',
            store:Ext.getStore("Transports"),
            width:'100%',
            height:'100%',
            listeners:{
                disclose:{fn:this.onTransportListDisclose, scope:this}
            }
        };

        var tablist = {
            xtype:'container',
            title:'Transports',
            iconCls:'home',
            scrollable:true,
            badgeText:BBuTrr.app.listCount,
            layout:'fit',
            items:[
                {
                    docked:'top',
                    xtype:'titlebar',
                    title:'Saint-Gobain Transports',
                    layout:'fit',
                    items:[spacer, refButton]
                },
                list
            ]
        };

        var tabParam = {
            xtype:'container',
            title:'Parameters',
            iconCls:'more',
            scrollable:true,
            items:{
                docked:'top',
                xtype:'titlebar',
                title:'Parameters',
                layout:'fit'
            }
        };

        this.add([tablist, tabParam]);//Adding TabList of transport
    },

    onRefreshButtonTap:function () {
        console.log("refresh data called !!");
        this.fireEvent("RefreshTransports", this);
    },

    onTransportListDisclose:function (list, record, target, index, evt, options) {
        console.log("validatetransportCommand");
        this.fireEvent("ValidateTransport", this, record);
    }
});
