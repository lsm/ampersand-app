var assign = require('lodash.assign');
var toArray = require('lodash.toarray');
var EventEmitter = require('eventemitter3');


// instance app, can be used just by itself
// or by calling as function to pass labels
// by attaching all instances to this, we can
// avoid globals
var app = {
  extend: function() {
    var args = toArray(arguments);
    args.unshift(this);
    return assign.apply(null, args);
  },
  reset: function() {
    // clear all events
    this.off();
    // remove all but main two methods
    for (var item in this) {
      if (item !== 'extend' && item !== 'reset') {
        delete this[item];
      }
    }
    // remix events
    assign(app, EventEmitter.prototype)
  }
};

assign(app, EventEmitter.prototype)

// export our singleton
module.exports = app;
