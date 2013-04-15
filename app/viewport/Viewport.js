Ext.define('BBuTrr.viewport.Viewport', {
    requires:[
        'Ext.viewport.Ios',
        'Ext.viewport.Android',
        'BBuTrr.viewport.Blackberry'
    ],

    constructor:function (config) {
        var osName = Ext.os.name,
            viewportName, viewport;
        switch (osName) {
            case 'Android':
                viewportName = (Ext.browser.name == 'ChromeMobile') ? 'Ext.viewport.Default' : 'Ext.viewport.Android';
                break;
            case 'BlackBerry':
                viewportName = 'BBuTrr.viewport.Blackberry';
                break;
            case 'iOS':
                viewportName = 'Ext.viewport.Ios';
                break;
            default:
                viewportName = 'Ext.viewport.Default';
        }
        console.log("Osname:", osName, " ", viewportName);
        viewport = Ext.create(viewportName, config);

        return viewport;
    }
});