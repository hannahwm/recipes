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
      recipe: ".recipe",
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

        self.$recipe = self.$container.find(self.options.recipe);
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

      $(self.options.recipe).each(function() {
        $(this).on("click", function() {
          var printBtn = $(".printBtn");
          var tab = $(this).children(self.options.tab);

          //run unless clicked on the print button
           if (!(printBtn.is(event.target))) {
             self.openRecipe(tab);
           }

        })
      });


      //close highlighted story on click outside and resume cycleStories
      $(document).on('click', function(event) {
        var curOpenRecipe = document.getElementById("open");
        var isClickInside;
        if (curOpenRecipe) {
          isClickInside = curOpenRecipe.contains(event.target);
        }

        //clicked outside
        if (!isClickInside) {
          self.closeRecipe();
        }
      });
    },
    openRecipe: function(tab) {
      var self = this;
      var target = $(tab).parents(".recipe");

      if (target.hasClass("open")) {
        return;
      }
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
    var pTags = $(document).find("p");
    for (var i=0; i<pTags.length; i++) {
  	   var elm = pTags[i];
    	if ($(elm).html().replace(/\s|&nbsp;/g, '').length == 0) {
    	  $(elm).css("display", "none");
    	}
    }
    $(".recipes-wrapper").openRecipe();
  });
})();
