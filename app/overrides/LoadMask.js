/**
 * Created with JetBrains PhpStorm.
 * User: R5596333
 * Date: 05/04/13
 * Time: 14:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define("BBuTrr.overrides.LoadMask", {
    override:"Ext.LoadMask",
    alias:"widget.loadmask",

    getTemplate:function () {
        var prefix = Ext.baseCSSPrefix;
        //console.log("LoadMask was called");
        return [
            {
                //it needs an inner so it can be centered within the mask, and have a background
                reference:'innerElement',
                cls:prefix + 'mask-inner',
                children:[
                    //the elements required for the CSS loading {@link #indicator}
                    {
                        html:'<img src="resources/icons/icone.png"/>'
                    },
                    {
                        reference:'indicatorElement',
                        cls:prefix + 'loading-spinner-outer',
                        children:[
                            {
                                cls:prefix + 'loading-spinner',
                                children:[
                                    { tag:'span', cls:prefix + 'loading-top' },
                                    { tag:'span', cls:prefix + 'loading-right' },
                                    { tag:'span', cls:prefix + 'loading-bottom' },
                                    { tag:'span', cls:prefix + 'loading-left' }
                                ]
                            }
                        ]
                    },
                    //the element used to display the {@link #message}
                    {
                        reference:'messageElement'
                    }
                ]
            }
        ]
            ;
    }
})
;
