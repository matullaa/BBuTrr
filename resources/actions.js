/*global $, openDatabase, blackberry, setTimeout*/

var db = null;

/**
 * Clears information log.
 */
function clearlog() {
    "use strict";
    $('#log').html('');
}

/**
 * Logs information to the footer.
 */
function log(item) {
    "use strict";

    var debug = $('#log').html(),
        d = new Date(),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds();

    if (h < 10) {
        h = '0' + h;
    }

    if (m < 10) {
        m = '0' + m;
    }

    if (s < 10) {
        s = '0' + s;
    }

    $('#log').html('<div>' + h + ':' + m + ':' + s + ' ' + item + '</div>' + debug);
}

/**
 * Request background instead of exit.
 */
function toBackground() {
    "use strict";

    log('toBackground()');
    try {
        blackberry.app.requestBackground();
    } catch (err) {
        log('Error: ' + err);
    }
}

/**
 * Handles transitions between our detailed profile page and our main profile list.
 * Here we leverage the JQuery $.mobile object to navigate between pages. Transitions
 * are disabled due to visual artifacts which were occuring during testing.
 */
function navBack() {
    "use strict";

    log('navBack()');
    try {
        if ($('.ui-page-active').attr('id') === 'home') {
            toBackground();
        } else {
            $.mobile.changePage($('#home'), {transition:'none'});
        }
    } catch (err) {
        log('Error: ' + err);
    }
}

/**
 * This method takes data about one specific profile and populates our #detail page
 * before we display it. Deep linking is used on conjunction with the phone, email, and
 * PIN values to provide a more interactive experience. Each row is formatted to conform
 * to a JQuery Mobile friendly format.
 */
function processdetails(tx, results) {
    "use strict";

    log('processdetails()');
    var i = 0, html = "";
    try {
        if (results.rows.length > 0) {
            for (i = 0; i < results.rows.length; i = i + 1) {
                //Set the header to the contact name.
                $('#profilename').html(results.rows.item(i).name);

                //Load an image based on the gender.
                $('#divimage').html('<img src="../images/' + results.rows.item(i).sex + '.jpg"/>');

                //If we have a telephone number, provide the detail as well as links to launch the Phone and SMS applications.
                if (results.rows.item(i).tele !== null && results.rows.item(i).tele !== "") {
                    html = html + '<div>' + results.rows.item(i).tele + '&nbsp;<a style="outline: 0;" href="tel:' + results.rows.item(i).tele + '"><img src="../images/phone.png"></a>&nbsp;<a style="outline: 0;" href="sms:' + results.rows.item(i).tele + '"><img src="../images/sms.png" /></a></div>';
                }

                //If we have an email, provide the detail as well as a link to the Messaging application.
                if (results.rows.item(i).email !== null && results.rows.item(i).email !== "") {
                    html = html + '<div>' + results.rows.item(i).email + '&nbsp;<a style="outline: 0;" href="mailto:' + results.rows.item(i).email + '"><img src="../images/email.png"></a></div>';
                }

                //If we have a PIN, provide the detail as well as a link to the Messaging application.
                if (results.rows.item(i).pin !== null && results.rows.item(i).pin !== "") {
                    html = html + '<div>' + results.rows.item(i).pin + '&nbsp;<a style="outline: 0;" href="pin:' + results.rows.item(i).pin + '"><img src="../images/pin.png"></a></div>';
                }

                //If we have an address, provide the detail.
                if (results.rows.item(i).addr !== null && results.rows.item(i).addr !== "") {
                    html = html + '<div>' + results.rows.item(i).addr + '</div>';
                }

                //Refresh the HTML associated with our #divinfo.
                $('#divinfo').html(html);
            }
            //Inform the user that the SMS protocol is only available as of 6.0.
            $('#divnotes').html('SMS available on 6.0+');

            //Display the content we just populated.
            $.mobile.changePage($('#detail'), {transition:'none'});
        } else {
            log('No results found.');
        }
    } catch (err) {
        log('Error: ' + err);
    }
}

/**
 * Retrieve the records from our database that match a specific id. On success,
 * we process those records for display.
 */
function loaddetail(idvalue) {
    "use strict";

    log('loaddetail()');
    try {
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM Items WHERE id=?;", [idvalue], processdetails, function (tx, error) {
                log("Could not load data.");
            });
        });
    } catch (err) {
        log('Error: ' + err);
    }
}

/**
 * This method populates our #home page with a list of all the profiles. The displayed
 * information includes the contact's name and quick links to contact the profile via
 * the available methods (phone, SMS, email, PIN.) HTML items are defined in a JQuery
 * Mobile friendly way.
 */
function populate(tx, results) {
    "use strict";

    log('populate()');
    var i = 0, html = "";
    try {
        for (i = 0; i < results.rows.length; i = i + 1) {
            //Our main list item that display's the user's name.
            html = html + "<li><a style='outline: 0;' onclick='javascript: loaddetail(" + results.rows.item(i).id + ");'>" + results.rows.item(i).name + "</a>";

            //Due to how JQuery Mobile formats its elements, we must place the short-cuts within a div below the name. We also want to ensure that if a user clicks on that
            //div, the profile is still loaded.
            html = html + "<div onclick='javascript: loaddetail(" + results.rows.item(i).id + ");'>";

            //Shortcuts are added to the list item. We use event.stopPropogation() to prevent the container div from firing its onclick() method whenever one of our shortcuts
            //are clicked. Otherwise, we would invoke the shortcut AND display the contact all in one click.

            //If we have a telephone number available, add the Phone and SMS shortcuts.
            if (results.rows.item(i).tele !== null && results.rows.item(i).tele !== "") {
                html = html + "<a style='margin: 2px; padding: 1px; outline: 0;' href='tel:" + results.rows.item(i).tele + "' onclick='javascript: void(0); event.stopPropagation();'><img src='../images/phone.png' /></a>";
                html = html + "<a style='margin: 2px; padding: 1px; outline: 0;' href='sms:" + results.rows.item(i).tele + "' onclick='javascript: void(0); event.stopPropagation();'><img src='../images/sms.png' /></a>";
            }

            //If we have an email available, add the Messaging shortcut.
            if (results.rows.item(i).email !== null && results.rows.item(i).email !== "") {
                html = html + "<a style='margin: 2px; padding: 1px; outline: 0;' href='mailto:" + results.rows.item(i).email + "' onclick='javascript: void(0); event.stopPropagation();'><img src='../images/email.png' /></a>";
            }

            //If we have a PIN available, add the Messaging shortcut.
            if (results.rows.item(i).pin !== null && results.rows.item(i).pin !== "") {
                html = html + "<a style='margin: 2px; padding: 1px; outline: 0;' href='pin:" + results.rows.item(i).pin + "' onclick='javascript: void(0); event.stopPropagation();'><img src='../images/pin.png' /></a>";
            }

            //Close off our open tags.
            html = html + "</div></li>";
        }
        //Here we replace the list with our new data and call a JQuery Mobile refresh.
        $('#listprofiles').html(html).listview("refresh");
    } catch (err) {
        log('Error: ' + err);
    }
}

/**
 * This application gets all of our profiles (sorted by name) and calls populate to display them.
 */
function refresh() {
    "use strict";

    log('refresh()');
    try {
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM Items ORDER BY name;", [], populate, function (tx, error) {
                log('Error populating table: ' + error);
            });
        });
    } catch (err) {
        log('Error: ' + err);
    }
}

/**
 * If our database has not been created, we create it here.
 */
function initdb() {
    "use strict";

    log('initdb()');
    try {
        if (db === null) {
            db = openDatabase("webworksecl", "1.0", "WebWorksECL", 2000, null);
        }
        db.transaction(function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Items(id INTEGER, sex TEXT, name TEXT, tele TEXT, email TEXT, pin TEXT, addr TEXT);", [], refresh, function (tx, error) {
                log('Could not create table: ' + error);
            });
        });
    } catch (err) {
        log('Error: ' + err);
    }
}

/**
 * Mainly for testing purposes, this method gives the user the ability to clear their database. This functionality is made available to the
 * user through a link on the #home page.
 */
function resetdb() {
    "use strict";

    log('resetdb()');
    try {
        //Open our database if it has not yet been opened.
        if (db === null) {
            db = openDatabase("webworksecl", "1.0", "WebWorksECL", 2000, null);
        }

        //Drop/delete our table if we can.
        db.transaction(function (tx) {
            tx.executeSql("DROP TABLE IF  EXISTS Items;", [], function () {
                //Create new table.
                db.transaction(function (tx) {
                    tx.executeSql("CREATE TABLE IF NOT EXISTS Items(id INTEGER, sex TEXT, name TEXT, tele TEXT, email TEXT, pin TEXT, addr TEXT);", [], refresh, function (tx, error) {
                        log('Could not create table: ' + error);
                    });
                });
            }, function (tx, error) {
                log('Could not drop table: ' + error);
            });
        });
    } catch (err) {
        log('Error: ' + err);
    }
}

/**
 * This method is called to insert a profile into the database.
 */
function insertIntoDB(contact) {
    "use strict";

    log('insertIntoDB()');
    try {
        if (contact !== null) {
            try {
                db.transaction(function (tx) {
                    tx.executeSql("INSERT INTO Items(id, sex, name, tele, email, pin, addr) VALUES(?, ?, ?, ?, ?, ?, ?);", [contact.id, contact.sex, contact.name, contact.tele, contact.email, contact.pin, contact.addr], refresh, function (tx, error) {
                        log('insertIntoDB failed: ' + error);
                    });
                });
            } catch (err1) {
                log('Error1: ' + err1);
            }
        } else {
            log('Push contained no data.');
        }
    } catch (err2) {
        log('Error2: ' + err2);
    }
}

/**
 * When we receive data, we insert it at 500ms intervals to avoid conflict with our database object.
 * If the application is in the background, we will update the icon to indicate new data.
 */
function processdata(ecldata) {
    "use strict";

    log('processdata()');
    var i = 0;
    try {
        for (i = 0; i < ecldata.contact.length; i = i + 1) {
            setTimeout(insertIntoDB(ecldata.contact[i]), (i * 500));
        }
        if (!blackberry.app.isForeground) {
            blackberry.app.setHomeScreenIcon('local:///images/eclwwnew.png');
        }
    } catch (err) {
        log('Error: ' + err);
    }
}

/**
 * When we receive new data, we will process and insert it into our database.
 */
function ondata(data) {
    "use strict";

    log('ondata()');
    var ecldata = null;
    try {
        if (data !== null) {
            /**
             * JSLint: eval is evil.
             *
             * Special care must be taken with the use of eval() as it will attempt to execute any script that is
             * passed to it. A JSON parser could be used to construct the ecldata variable in place of eval.
             */
            ecldata = eval('(' + blackberry.utils.blobToString(data.payload) + ')');
            try {
                //When new data is received, clear old items.
                db.transaction(function (tx) {
                    tx.executeSql("DELETE FROM Items;", [], processdata(ecldata), function (tx, error) {
                        log('Could not clear table: ' + error);
                    });
                });
            } catch (err1) {
                log('Error1: ' + err1);
            }
        } else {
            log('Push contained no data.');
        }
    } catch (err2) {
        log('Error2: ' + err2);
    }
}

/**
 * Actions to take when we want to unsubscribe the listener.
 */
function unsubscribe() {
    "use strict";

    log('unsubscribe()');
    try {
        blackberry.push.closePushListener();
        log('Success.');
    } catch (err) {
        log('Error: ' + err);
    }
}

/**
 * Here we subscribe our listener. When the SIM is changed, we invoke unsubscribe. Further pushes
 * will not be received in this case.
 */
function subscribe() {
    "use strict";

    log('subscribe()');
    var ops = {port:233, wakeUpPage:'index.html', maxQueueCap:100};
    try {
        blackberry.push.openBESPushListener(ops, ondata, unsubscribe);
        log('Success.');
    } catch (err) {
        log('Error: ' + err);
    }
}