/*!
 * jQuery ClassyPaypal
 * vox.SPACE
 *
 * Written by voxspace AT riseup.net
 * Licensed under the MIT license https://vox.SPACE/LICENSE-MIT
 * Version 1.1.0
 *
 */

(function ($, c) {
    function _ClassyPaypal(targetEl, parameters, fallbackSettings) {
        var paypalCommands = 'cmd,notify_url,bn,amount,discount_amount,discount_amount2,discount_rate,discount_rate2,discount_num,item_name,item_number,quantity,shipping,shipping2,tax,tax_rate,undefined_quantity,weight,weight_unit,on*,os*,option_index,option_select*,option_amount*,business,currency_code,a*,p*,t*,src,srt,sra,no_note,custom,invoice,modify,usr_manage,page_style,image_url,cpp_cart_border_color,cpp_header_image,cpp_headerback_color,cpp_headerborder_color,cpp_logo_image,cpp_payflow_color,lc,cn,no_shipping,return,rm,cbt,cancel_return,address1,address2,city,country,email,first_name,last_name,charset,night_phone_a,night_phone_b,night_phone_c,state,zip';
        this.button = $(targetEl);
        this.options = parameters;
        this.fallback = fallbackSettings || {};
        this.paypal = this.getPaypalVariables(paypalCommands);
        this.checkout = null;
        this.init();
    }
    _ClassyPaypal.prototype.init = function () {
        this.button.addClass('ClassyPaypal-type-' + this.options.type + ' ClassyPaypal-style-' + this.options.style);
        window.setTimeout($.proxy(function () {
            this.button.addClass('ClassyPaypal-transit');
        }, this), 30);
        if (this.options.innerHTML) {
            this.button.html(this.options.innerHTML);
        }
        if (this.options.tooltip) {
            this.tooltip();
        }
        this.button.on('click touchend', $.proxy(function (event) {
            event.preventDefault();
            if (this.button.hasClass('ClassyPaypal-button-disabled')) {
                return;
            }
            this.checkout = this.getOptions();
            if (typeof this.options.beforeSubmit === 'function') {
                var f = this.options.beforeSubmit.call(this.button.get(0), this.checkout);
                if (typeof f === 'object') {
                    this.checkout = f;
                } else {
                    return;
                }
            }
            this.submit();
        }, this));
        var self = this;
        this.api = {
            enable: function () {
                self.button.removeClass('ClassyPaypal-button-disabled');
                return this;
            },
            disable: function () {
                self.button.addClass('ClassyPaypal-button-disabled');
                return this;
            },
            setVariable: function (e, f) {
                if (e.indexOf('data-') !== 0) {
                    e = 'data-' + e.toLowerCase();
                }
                self.button.attr(e, f);
                return this;
            }
        };
        this.button.data('ClassyPaypal-api', this.api);
    };
    _ClassyPaypal.prototype.getPaypalVariables = function (value) {
        var g = value.split(',');
        for (var h = 0; h < g.length; h++) {
            var e = g[h];
            if (e.charAt(e.length - 1) === '*') {
                e = e.slice(0, -1);
                for (var d = 0; d < 10; d++) {
                    g.splice(h, (!d) & 1, e + d);
                }
            }
        }
        return g;
    };
    _ClassyPaypal.prototype.getOptions = function () {
        var e = this.fallback;
        var g = this.button.data('json');
        if (typeof g === 'object') {
            $.extend(e, g);
        } else {
            if (typeof g === 'string') {
                if (window.console) {
                    console.log('Error: Invalid JSON string in "data-json" attribute');
                }
            }
        }
        for (var h = 0; h < this.paypal.length; h++) {
            var d = this.paypal[h];
            var f = this.button.attr('data-' + d);
            if (f !== c && f !== '') {
                e[d] = f;
            }
        }
        switch (this.options.type) {
            case 'buynow':
                e.cmd = '_xclick';
                e.bn = 'PayNowPlugin_BuyNow_WPS_US';
                break;
            case 'subscribe':
                e.cmd = '_xclick-subscriptions';
                e.bn = 'PayNowPlugin_Subscribe_WPS_US';
                break;
            case 'donate':
                e.cmd = '_donations';
                e.bn = 'PayNowPlugin_Donate_WPS_US';
                break;
            default:
                e.cmd = "";
        }
        return e;
    };
    _ClassyPaypal.prototype.submit = function () {
        if (!this.checkout.cmd || !this.checkout.business) {
            return;
        }
        this.form = $('<form/>');
        this.form.attr({
            action: 'https://www.paypal.com/cgi-bin/webscr',
            method: 'POST',
            target: this.options.checkoutTarget
        }).hide();
        for (var e in this.checkout) {
            if (this.checkout.hasOwnProperty(e)) {
                var d = $('<input/>');
                d.attr({
                    type: 'hidden',
                    name: e,
                    value: this.checkout[e]
                });
                this.form.append(d);
            }
        }
        $(document.body).append(this.form);
        if (this.options.delaySubmit) {
            this.button.addClass('ClassyPaypal-submit');
            window.setTimeout($.proxy(function () {
                this.form.submit().remove();
                this.button.removeClass('ClassyPaypal-submit');
            }, this), this.options.delaySubmit);
        } else {
            this.form.submit().remove();
        }
    };
    _ClassyPaypal.prototype.tooltip = function () {
        var tooltipTime = this.options.tooltipTime;
        var d = $('body').children('.ClassyPaypal-tooltip');
        if (d.length === 0) {
            d = $('<div class="ClassyPaypal-tooltip"></div>').appendTo('body');
        }
        this.button.mouseenter($.proxy(function () {
            var ow = this.button.outerWidth();
            var oh = this.button.outerHeight();
            var st = this.button.offset().top - $(window).scrollTop();
            var sl = this.button.offset().left - $(window).scrollLeft();
            var j = (d.text(this.options.tooltip).outerWidth() - ow) / 2;
            d.css({
                top: st + oh + parseFloat(this.options.tooltipOffset),
                left: sl - j
            }).stop(true).delay(this.options.tooltipDelay).fadeIn(tooltipTime);
            if (this.options.tooltipHide) {
                d.data('timer', window.setTimeout(function () {
                    d.stop(true).fadeOut(tooltipTime);
                }, this.options.tooltipHide));
            }
        }, this));
        this.button.mouseleave(function () {
            d.stop(true).fadeOut(tooltipTime);
            window.clearTimeout(d.data('timer'));
        });
    };
    $.fn.ClassyPaypal = function (parameters, fallbackSettings) {
        var settings = $.extend({
            type: 'buynow',
            style: 'default',
            innerHTML: '',
            checkoutTarget: '_self',
            delaySubmit: 0,
            tooltip: '',
            tooltipHide: 3000,
            tooltipTime: 300,
            tooltipDelay: 400,
            tooltipOffset: 15,
            beforeSubmit: false
        }, parameters);
        return this.each(function () {
            new _ClassyPaypal(this, settings, fallbackSettings);
        });
    };
})(jQuery);