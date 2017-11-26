var ListView = Backbone.View.extend({
  el: $('body'),

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    console.log('in render');
    this.el.append('<ul> <li>hello world</li> </ul>');
  }
});

var listView = new ListView();
