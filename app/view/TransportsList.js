/**
 * Created with JetBrains PhpStorm.
 * User: R5596333
 * Date: 04/04/13
 * Time: 21:51
 * To change this template use File | Settings | File Templates.
 */
Ext.define("BBuTrr.view.TransportsList", {
    extend:"Ext.dataview.List",
    alias:"widget.transportslist",
    configure:{
        loadingText:"Loading transport list....",
        emptyText:'</pre> <div class="transport-list-empty-text">No transport found</div><pre>',
        onItemDisclosure:true,
        itemTpl:'</pre><div class="list-item-title" x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);">{trkor}</div>' +
            '</pre><div class="list-item-narrative">{astxt}</div>' +
            '<pre>'

    }
})
;
