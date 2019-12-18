var $ = jQuery;

( function( $ ) {
  var Neu = Neu || {};

  $.fn.printRecipe = function(options) {
      return this.each(function() {
          var printRecipe = Object.create(Neu.printRecipe);
          printRecipe.init(this, options);
      });
  };

  $.fn.printRecipe.options = {
      recipe: ".recipe",
      printBtn: ".printBtn",
      printContainer: ".print-container"
  };

  Neu.printRecipe = {
      init: function(elem, options) {
          var self = this;
          self.$container = $(elem);
          self.options = $.extend({}, $.fn.printRecipe.options, options);
          self.bindElements();
          self.bindEvents();

      },
      bindElements: function() {
        var self = this;

        self.$recipe = self.$container.find(self.options.recipe);
        self.$printContainer = self.$container.find(self.options.printContainer);

    },
    bindEvents: function() {
      var self = this;

      $(self.options.printBtn).each(function() {
        $(this).on("click", function() {
          var printContent = $(this).parents(self.options.recipe);
          self.printRecipe(printContent);
        })
      });

    },
    printRecipe: function(printContent) {
      var self = this;


      printContent.clone().appendTo(self.options.printContainer);
      window.print();
      $(self.options.printContainer).empty();
    }
  };

}( $ ) );

(function init () {
  $(document).ready(function() {
    $(".recipes-wrapper").printRecipe();
  });
})();
