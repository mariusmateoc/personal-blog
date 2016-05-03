
(function() {
    (function($) {
        $.fn.typewrite = function(options) {
            var settings, type_next_element;
            type_next_element = function(index) {
                var current_element, final_text, type_next_character;
                type_next_character = function(element, i) {
                    element.html(final_text.substr(0, i) + "<span class='cursor' style='color:#e74c3c'>|</span>");
                    if (final_text.length >= i) {
                        setTimeout((function() {
                            type_next_character(element, i + 1);
                        }), settings.delay);
                    } else {
                        if (++index < settings.selector.length) {
                            type_next_element(index);
                        } else {
                            if (settings.callback) {
                                settings.callback();
                            }
                        }
                    }
                };
                current_element = $(settings.selector[index]);
                final_text = current_element.text();
                if (settings.trim) {
                    final_text = $.trim(final_text);
                }
                current_element.html("").show();
                type_next_character(current_element, 0);
            };
            settings = {
                selector: this,
                delay: 150,
                trim: false,
                callback: null
            };
            if (options) {
                $.extend(settings, options);
            }
            type_next_element(0);
            return this;
        };
        $(".moto").typewrite();
        $(".menu").on("click", function(e) {
            $(".menu-open, .menu").toggleClass("is-active");
        });

        // $(".js-submit").on("click", function(e) {
        //   $(".successfull-submision").removeClass("hidden");

        //   setTimeout((function() {
        //     $(".successfull-submision").addClass("hidden");
        //   }), 10000);
        // });
    })(jQuery);

}).call(this);
