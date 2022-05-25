import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './scss/style.scss';
import './css/style.css';
import '@fortawesome/fontawesome-free/js/all.min';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js';









$(function () {

        $('[data-toggle="tooltip"]').tooltip();

        $('.add-to-cart-btn').click(function () {
                alert('أضيف المنتج إلى سلة الشراء')
        });

        $('#fullyear').text(new Date().getFullYear());


        $('.product-option input[type="radio"]').change(function () {
                $(this).parents('.product-option').siblings().removeClass('active');
                $(this).parents('.product-option').addClass('active');
        });

        $('[data-product-quantity]').change(function () {
                var newQuantity = $(this).val();
                var parent = $(this).parents('[data-product-info]');
                var pricePerUnit = parent.attr('data-product-price');
                var totalPrice = newQuantity * pricePerUnit;
                parent.find('.total-price-for-product').text(totalPrice + '$');

                calculateTotalPrice();
        });
        $('[data-remove-from-cart').click(function () {
                $(this).parents('[data-product-info]').remove();
                calculateTotalPrice();
        })

        function calculateTotalPrice() {
                var totalPriceForAllProducts = 0;
                $('[data-product-info]').each(function () {

                        var pricePerUnit = $(this).attr('data-product-price');

                        var quantity = $(this).find('[data-product-quantity]').val();

                        var totalPriceForAllProduct = pricePerUnit * quantity;

                        totalPriceForAllProducts = totalPriceForAllProducts + totalPriceForAllProduct;
                });
                $('#total-price-for-all-products').text(totalPriceForAllProducts + '$ دولار ');
        };

        var citiesByCountry = {
                sa: ['جدة', 'الرياض'],
                eg: ['الإسكندريه', 'القاهرة'],
                jo: ['الزرقاء', 'عمان'],
                sy: ['حماه', 'خلب', 'دمشق'],
        };
        $('#form-checkout select[name="country"]').change(function () {
                var country = $(this).val();
                var cities = citiesByCountry[country];
                $('#form-checkout select[name="city"]').empty();
                $('#form-checkout select[name="city"]').append(
                        '<option disabled selected>اختر المدينة</option>'
                );
                cities.forEach(function (city) {
                        var newOption = $('<option></option>')
                        newOption.text(city);
                        newOption.val(city);
                        $('#form-checkout select[name="city"]').append(newOption);

                });
        });



        $('#form-checkout input[name="payment_method"]').change(function () {
                var paymentMethod = $(this).val();

                if (paymentMethod === 'on_delivery') {
                        $('#credit-card-info input').prop('disabled', true);
                }
                else {
                        $('#credit-card-info input').prop('disabled', false);
                }
                $('#credit-card-info').toggle();
        });



        $("#price-range").slider({
                range: true,
                min: 50,
                max: 1000,
                step: 50,
                values: [250, 800],
                slide: function (event, ui) {
                        $('#price-min').text(ui.values[0]);
                        $('#price-max').text(ui.values[1]);
                }
        });
       
})