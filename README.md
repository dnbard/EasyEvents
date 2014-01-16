EasyEvents
==========

EasyEvents is free publish/subscribe library for JavaScript.

Key features
==========
* Dependency free
* All subscriber calls are asynchronous
* Working in any browser or environment that support Javascript
* Easy to use and understand
* Small, less than 1kb minified

Example
==========
```javascript
// create a function to receive messages
var myFunc = function(event, data){
  console.log(new Date() + ' Event with name "' + event + '" triggered');
};

// subscribe function to message with name 'message-name'
// method returns token that can be used to unsubscribe that function
var EVENT_TITLE = 'message-name';
var token = EasyEvents.subscribe(EVENT_TITLE, myFunc);

// publish a message
EasyEvents.publish(EVENT_TITLE);

// publish a message synchronously
// use with caution and only if you know why your messages should be sent synchronously
EasyEvents.publishSync(EVENT_TITLE);

// unsubscribe from further messages by token
EasyEvents.remove(token);
// unsubscribe from further messages by event name
// this method will remove all functions for that event
EasyEvents.remove(EVENT_TITLE);

//remove ALL subscriptions
EasyEvents.removeAll();
