var $ = jQuery;

( function( $ ) {
  var Neu = Neu || {};

  $.fn.openRecipe = function(options) {
      return this.each(function() {
          var openRecipe = Object.create(Neu.openRecipe);
          openRecipe.init(this, options);
      });
  };

  $.fn.openRecipe.options = {
      tab: ".recipe__tab"
  };

  Neu.openRecipe = {
      init: function(elem, options) {
          var self = this;
          self.$container = $(elem);
          self.options = $.extend({}, $.fn.openRecipe.options, options);
          self.bindElements();
          self.bindEvents();

      },
      bindElements: function() {
        var self = this;

        self.$tab = self.$container.find(self.options.tab);

    },
    bindEvents: function() {
      var self = this;

      $(self.options.tab).each(function() {
        $(this).on("click", function() {
          var tab = $(this);
          self.openRecipe(tab);
        })
      });

      var openRecipe = $("#open");

      //close highlighted story on click outside and resume cycleStories
      $(document).on('click', function(event) {
        // var isClickInside = openRecipe.contains(event.target);

        //clicked outside
        if (!(openRecipe.is(event.target))) {
          self.closeRecipe();
        }
      });
    },
    openRecipe: function(tab) {
      var self = this;
      var target = $(tab).parents(".recipe");
      target.addClass("opening");
      setTimeout(function() {
        target.addClass("open");
        target.attr("id", "open");
        target.removeClass("opening");
      },1900)
    },
    closeRecipe: function(tab) {
      var self = this;
      var target = $("#open");

      if ( target.length ) {
        target.addClass("closing");
        target.removeClass("open");
        setTimeout(function() {
          target.removeClass("closing");
          target.attr("id", "");
        },1900)
      }
    }
  };

}( $ ) );

(function init () {
  $(document).ready(function() {
    $(".recipes-wrapper").openRecipe();
  });
})();
