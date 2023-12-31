var $modal = jQuery("<div class=\"woopdfinv-backdrop\">\n        <div class=\"woopdfinv-dialog\">\n            <div class=\"woopdfinv-header\" style=\"border-bottom: #eeeeee solid 1px;background: #fbfbfb;padding: 15px 20px;position: relative;margin-bottom: -10px;\">\n                <h4 style=\"margin: 0;padding: 0;text-transform: uppercase;font-size: 1.2em;font-weight: bold;color: #cacaca;text-shadow: 1px 1px 1px #fff;letter-spacing: 0.6px;-webkit-font-smoothing: antialiased;\">Quick Feedback</h4>\n            </div>\n            <div class=\"woopdfinv-body\" style=\"    border: 0;background: #fefefe;padding: 20px;\">\n                <h3 style=\"margin:0;\"><strong>If you have a moment, please let us know why you are deactivating:</strong></h3>\n                <ul>\n                    <li>\n                        <input value=\"Didn't work\" class=\"woopdfinv-deactivationReason\" name=\"deactivationReason\" type=\"radio\" id=\"woopdfinv-didntwork\"/>\n                        <label  for=\"woopdfinv-didntwork\">The plugin didn't work</label>\n                        <input  class=\"woopdfinv-deactivation-detail\" type=\"text\" placeholder=\"Could you briefly explain the issue so we do our best to fix it?\"/>\n                    </li>\n                    <li>\n                        <input value=\"Better plugin\" class=\"woopdfinv-deactivationReason\" name=\"deactivationReason\" type=\"radio\" id=\"woopdfinv-found-better\"/>\n                        <label for=\"woopdfinv-found-better\">I found a better plugin</label>\n                        <input class=\"woopdfinv-deactivation-detail\" type=\"text\" placeholder=\"What's the plugin name?\"/>\n                    </li>\n                    <li>\n                        <input value=\"Temporal\" class=\"woopdfinv-deactivationReason\" name=\"deactivationReason\" type=\"radio\" id=\"woopdfinv-temporary\"/>\n                        <label for=\"woopdfinv-temporary\">It's a temporary deactivation. I will activate it later.</label>\n                    </li>\n                    <li>\n                        <input value=\"Other\" class=\"woopdfinv-deactivationReason\" name=\"deactivationReason\" type=\"radio\" id=\"woopdfinv-other\"/>\n                        <label for=\"woopdfinv-other\">Other</label>\n                        <input class=\"woopdfinv-deactivation-detail\" type=\"text\" placeholder=\"Kindly tell us the reason so we can improve.\"/>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"woopdfinv-footer\" style=\"border-top: #eeeeee solid 1px;padding:10px;text-align: right;\">\n                <a href=\"#\" class=\"wooPdfSubmitButton button button-secondary button-deactivate allow-deactivate\">Skip &amp; Deactivate</a>\n                <a href=\"#\" class=\"wooPdfCancelButton button button-primary button-close\">Cancel</a>                \n            </div>\n        </div>\n        \n    </div>");
jQuery('body').append($modal);
jQuery('.woopdfinv-backdrop').click(function () {
    $modal.removeClass('woopdfinv-show');
});
jQuery('.woopdfinv-dialog').click(function (e) { e.stopImmediatePropagation(); });
$modal.find('input:radio').click(function (e) {
    $modal.find('li').removeClass('woopdfinv-selected');
    var $radio = jQuery(e.currentTarget);
    $radio.parent().addClass('woopdfinv-selected');
    $radio.parent().find('.woopdfinv-deactivation-detail').focus();
    if ($modal.find('.woopdfinv-deactivationReason:checked').length > 0) {
        $modal.find('.wooPdfSubmitButton').text('Submit & Deactivate');
    }
    else {
        $modal.find('.wooPdfSubmitButton').text('Skip & Deactivate');
    }
});
$modal.find('.wooPdfSubmitButton').click(function () {
    if ($modal.find('.woopdfinv-deactivationReason:checked').length > 0) {
        $modal.find('.wooPdfSubmitButton').attr('disabled', 'disabled').text('Deactivating plugin...');
        var reason = $modal.find('.woopdfinv-deactivationReason:checked').val();
        if (reason != 'Temporal') {
            var details = $modal.find('.woopdfinv-deactivationReason:checked').parent().find('.woopdfinv-deactivation-detail').val();
            jQuery.post('http://wooinvoice.rednao.com/wp-admin/admin-ajax.php', {
                reason: reason,
                details: (details == null ? '' : details),
                action: 'rednao_woo_deactivation_reason'
            });
        }
        setTimeout(function () {
            window.location.href = wooPDFInvoiceDeactivationLink;
        }, 2000);
    }
    else {
        window.location.href = wooPDFInvoiceDeactivationLink;
    }
});
var wooPDFInvoiceDeactivationLink = jQuery('[data-plugin="woo-pdf-invoice-builder/woocommerce-pdf-invoice.php"] .deactivate a').attr('href');
jQuery('[data-plugin="woo-pdf-invoice-builder/woocommerce-pdf-invoice.php"] .deactivate a').click(function (e) {
    e.preventDefault();
    $modal.find('.woopdfinv-deactivationReason:checked').removeAttr('checked');
    $modal.find('li').removeClass('woopdfinv-selected');
    $modal.addClass('woopdfinv-show');
});
$modal.find('.wooPdfCancelButton').click(function () {
    $modal.removeClass('woopdfinv-show');
});
//# sourceMappingURL=DeactivationModal.js.map