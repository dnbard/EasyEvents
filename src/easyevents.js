var events = { };

var s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

var guid = function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

var addEvent = function(eventName, event){
    var id = guid();
    var token = eventName + '::' + id;

    if (!events[eventName]) {
        events[eventName] = {};
        events[eventName][id] = event;
    } else {
        events[eventName][id] = event;
    }
    return token;
};

var trigger = function(eventName, data){
    var triggerEvents = events[eventName];

    if (triggerEvents) {
        for(var i in triggerEvents){
            if (triggerEvents.hasOwnProperty(i)){
                var triggerEvent = triggerEvents[i];
                setTimeout( function(){
                    triggerEvent(eventName, data);
                }, 0 );
            }
        }
    }
};

var triggerSync = function(eventName, data){
    var triggerEvents = events[eventName];

    if (triggerEvents) {
        for(var i in triggerEvents){
            if (triggerEvents.hasOwnProperty(i)){
                var triggerEvent = triggerEvents[i];
                triggerEvent(eventName, data);
            }
        }
    }
}

var removeEvent = function(eventData){
    var args = eventData.split('::');

    if (args.length > 1){
        // eventData = 'event-name::guid-token'

        var eventName = args[0],
            token = args[1];

        var eventTriggers = events[eventName];
        if (eventTriggers && eventTriggers[token]){
            delete eventTriggers[token];
        }
    } else {
        eventName = eventData;

        if (events[eventName]){
            delete events[eventName];
        }
    }
};

var removeAllEvents = function(){
    events = {};
};

EasyEvents = {
    subscribe: addEvent,
    publish: trigger,
    publishSync: triggerSync,
    remove: removeEvent,
    removeAll: removeAllEvents
};