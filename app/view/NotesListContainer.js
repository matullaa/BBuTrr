/**
 * Created with JetBrains PhpStorm.
 * User: R5596333
 * Date: 19/12/12
 * Time: 16:57
 * To change this template use File | Settings | File Templates.
 */
Ext.define("BBuTrr.view.NotesListContainer", {
    extend:"Ext.Container",
    alias:"widget.noteslistcontainer",

    initialize:function () {
        this.callParent(arguments);

//        var refButton = {
//            xtype:"button",
//            text:"Refresh",
//            ui:"action",
//            handler:this.onRefreshButtonTap,
//            scope:this
//        };
//
//        var deleteButton = {
//            xtype:"button",
//            iconCls:"trash",
//            iconMask:true,
//            scope:this
//        };
//
//        var topToolbar = {
//            xtype:"toolbar",
//            title:"Saint-Gobain Transport",
//            docked:"top",
//            items:[
//                {xtype:"spacer"},
//                refButton,
//            ]
//        };

//        var bottomToolbar = {
//            xtype:"toolbar",
//            docked:"bottom",
//            items:[
//                deleteButton
//            ]
//        };

        var transportsList = {
            xtype:"transportslist",
            store:Ext.getStore("Transports"),
            listeners:{
                disclose:{fn:this.onTransportListDisclose, scope:this}
            }
        }
        this.add(transportsList);
    },

    onRefreshButtonTap:function () {
        console.log("refresh data called !!");
        this.fireEvent("RefreshTransports", this);
    },

    onTransportListDisclosure:function () {
        console.log("validatetransportCommand");
        this.fireEvent("validatetransportCommand", this, record);
    },

    config:{
        layout:{
            type:"fit"
        }
    }
})
;

