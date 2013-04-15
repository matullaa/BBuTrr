//<debug>
Ext.Loader.setPath({
    'BBuTrr':'app'
});
//</debug>

Ext.application({
    name:'BBuTrr',
    listCount:10,
    requires:[
        'Ext.MessageBox',
        'Ext.util.DelayedTask',
        'BBuTrr.overrides.LoadMask',
        'BBuTrr.viewport.Viewport'
    ],

    models:['TransportModel'],
    stores:['Transports'],
    controllers:['Notes'],
    views:['NotesListContainer',
        'TransportsList',
        'Main'],
    overrides:['LoadMask'],

    icon:{
        '57':'resources/icons/Icon.png',
        '72':'resources/icons/Icon~ipad.png',
        '114':'resources/icons/Icon@2x.png',
        '144':'resources/icons/Icon~ipad@2x.png'
    },

    viewport:{
        xclass:'BBuTrr.viewport.Viewport'
    },

    isIconPrecomposed:true,

    startupImage:{
        '320x460':'resources/startup/320x460.jpg',
        '640x920':'resources/startup/640x920.png',
        '768x1004':'resources/startup/768x1004.png',
        '748x1024':'resources/startup/748x1024.png',
        '1536x2008':'resources/startup/1536x2008.png',
        '1496x2048':'resources/startup/1496x2048.png'
    },

    launch:function () {
        // Destroy the #appLoadingIndicator element
        //Ext.fly('appLoadingIndicator').destroy();
//        Ext.Viewport.setMasked(
//            {
//                xtype:'loadmask',
//                message:'Attend donc BrougreDane !!'
//            });
//        new Ext.util.DelayedTask(function () {
//            Ext.Viewport.setMasked(false);
        // Initialize the main view

//        var notesListContainer = {
//            xtype:"noteslistcontainer"
//        };
        var mainList = {xtype:"main"}
        //Ext.Viewport.add(notesListContainer);
        Ext.Viewport.add(mainList);

//        }).delay(5000);
    },

    onUpdated:function () {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function (buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});


