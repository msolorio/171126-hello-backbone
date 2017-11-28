var Item = Backbone.Model.extend({
  defaults: {
    part1: 'hello',
    part2: 'world'
  }
});

var List = Backbone.Collection.extend({
  model: Item
});

var ItemView = Backbone.View.extend({
  tagName: 'li',
  initialize: function() {
    // this in render will refer to itemView instance object
    // and is returned from render
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    // need jQuery selector bc html is jQuery method
    $(this.el).html(
      '<span>' + this.model.get('part1') + ' ' + this.model.get('part2') + '</span>'
    );

    return this;
  }
});

var ListView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click button#add': 'addItem'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'addItem', 'appendItem');

    this.collection = new List();
    this.collection.bind('add', this.appendItem);

    this.counter = 0;
    this.render();
  },

  render: function() {
    var self = this;

    // need jQuery selector bc append is jQuery metbod
    $(this.el).append('<button id="add">add an item</button>');
    $(this.el).append('<ul></ul>');

    this.collection.models.forEach(function(item) {
      self.appendItem(item);
    });
  },

  addItem: function() {
    this.counter++;
    var item = new Item();

    item.set({
      part2: item.get('part2') + ' ' + this.counter
    });

    this.collection.add(item);
  },

  appendItem: function(item) {
    var itemView = new ItemView({
      model: item
    });

    $('ul', this.el).append(itemView.render().el);
  }
});

var listView = new ListView();
