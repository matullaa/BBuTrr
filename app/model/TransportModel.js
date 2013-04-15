/**
 * Created with JetBrains PhpStorm.
 * User: R5596333
 * Date: 04/04/13
 * Time: 22:28
 * To change this template use File | Settings | File Templates.
 */
Ext.define("BBuTrr.model.TransportModel", {
    extend:"Ext.data.Model",
    config:{
        idProperty:'id',
        fields:[
            {name:'trkor', type:'string'},
            {name:'astxt', type:'string'},
            {name:'sysid', type:'string'},
            {name:'clint', type:'int'}
        ]
    }
});
