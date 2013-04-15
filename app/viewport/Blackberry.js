Ext.define('BBuTrr.viewport.Blackberry', {
    extend:'Ext.viewport.Default',
    constructor:function (config) {
        // Blackberry does not like height: 100%                   
        this.superclass.config.height = this.getWindowHeight() + 'px';
        this.callParent([config]);
        return this;
    },
    getWindowHeight:function () {
        /* blackberry variable is defined if we are in a webworks project */
        var height = window.innerHeight;
        if (typeof blackberry !== 'undefined') {
            var useragent = navigator.userAgent.toLowerCase();
            var moreHeight = 0;
            if (useragent.indexOf("9810") != -1) { // Torch 9810                
                height = 425;
            }
            else if (useragent.indexOf("9850") != -1) { // Torch 9850                
                height = 533;
            }
            else if (useragent.indexOf("9860") != -1) { // Torch 9860                
                height = 533;
            }
            else if (useragent.indexOf("berry 99") != -1) { // Bold 9900/9930                
                height = 267;
            }
            return height;
        }
        return height;
    }

}, function () {


});