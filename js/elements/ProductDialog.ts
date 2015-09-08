/// <reference path="../common/model/Product.ts" />
/// <reference path="../jquery.d.ts" />
/// <reference path="../util/Formatter.ts"/>
/// <reference path="ProductCounter.ts"/>
/// <reference path="../common/rest/ProductApi.ts"/>

class ProductDialog {

    private _formatter:Formatter = new Formatter();
    private _currentProduct:common.Product;
    private _productCounter:ProductCounter;
    private _productApi: ProductApi = new ProductApi();

    private modalHeaderName = $("#myModalLabel");
    private modalProductIdLabel = $("#modal-productid");
    private modalProductNameLabel = $("#modal-productname");
    private modalProductDescriptionLabel = $("#modal-productdescription");
    private modalProductPriceLabel = $("#modal-productprice");
    private modalProductUnitLabel = $("#modal-productunit");
    private modalProductLocationLabel = $("#modal-productlocation");
    private modalProductCategoryLabel = $("#modal-productCategory");
    private modalProductMapLink = $("#modal-productMap");
    private modalProductAddToCart = $("#modal-productAddToCart");

    private modalProductCounterUp = $("#modal-number-up");
    private modalProductCounterDown = $("#modal-number-down");
    private modalProductCounterValue = $("#modal-number");


    constructor(aProduct:common.Product) {
        this._currentProduct = aProduct;
        console.log("Create ProductDialog with Product " + this._currentProduct.name);


        this.modalProductAddToCart.attr("data-product", JSON.stringify(this._currentProduct));
        this.modalHeaderName.text(this._currentProduct.name);
        this.modalProductIdLabel.text(this._currentProduct.productId + "");
        this.modalProductNameLabel.text(this._currentProduct.name);
        this.modalProductDescriptionLabel.text(this._currentProduct.description);
        var formattetPrice = this._formatter.formatNumberToPrice(this._currentProduct.price);
        this.modalProductPriceLabel.text(formattetPrice + " \u20AC");
        this.modalProductUnitLabel.text(this._currentProduct.unit);
        this.modalProductLocationLabel.text(this._currentProduct.locationString);
        this.modalProductCategoryLabel.text(this._currentProduct.categoryString);

        var preparedLocationString = this._currentProduct.locationForProductMap;

        var newlocationURL = this._productApi.getLinkToProductMap() + "?id=" + preparedLocationString;
        this.modalProductMapLink.attr("href", newlocationURL);

        this._productCounter = new ProductCounter(aProduct.uomObject.rounding);

        this.modalProductCounterValue.val("1");

        /*
        this.setFunctionIncrementProductCounter();
        this.setFunctionDeclineProductCounter();
         */
    }






/*
    public setFunctionIncrementProductCounter():any {
        return (function () {
            console.log("starteIncrement with Product " + ProductDialog._currentProduct.name);
            var productCounter = new ProductCounter(ProductDialog._currentProduct.uomObject.rounding);
            var modalProductCounterValue = $("#modal-number");
            console.log(modalProductCounterValue.val());
            var oldValue: number = modalProductCounterValue.val();

            productCounter.incrementValue(Number(oldValue));
            var newValue:number = productCounter.getCurrentValue();

            modalProductCounterValue.val(newValue + "");
            var newPrice:number = ProductDialog._currentProduct.price * newValue;
            var formatedPrice = ProductDialog._formatter.formatNumberToPrice(ProductDialog._currentProduct.price);
            var formatedNewPrice = ProductDialog._formatter.formatNumberToPrice(newPrice);
            var modalProductPriceLabel = $("#modal-productprice");
            modalProductPriceLabel.text(formatedPrice + " \u20AC" + " (" + formatedNewPrice + " \u20AC" + ")");
        })
    }

    private setFunctionDeclineProductCounter():void {
        this.modalProductCounterDown.click(function () {
            console.log("starteIncrement with Product " + ProductDialog._currentProduct.name);
            var productCounter = new ProductCounter(ProductDialog._currentProduct.uomObject.rounding);
            var modalProductCounterValue = $("#modal-number");
            var oldValue: number = modalProductCounterValue.val();
            productCounter.declineValue(Number(oldValue));
            var newValue:number = productCounter.getCurrentValue();

            modalProductCounterValue.val(newValue + "");
            var newPrice:number = ProductDialog._currentProduct.price * newValue;
            var formatedPrice = ProductDialog._formatter.formatNumberToPrice(ProductDialog._currentProduct.price);
            var formatedNewPrice = ProductDialog._formatter.formatNumberToPrice(newPrice);
            var modalProductPriceLabel = $("#modal-productprice");
            modalProductPriceLabel.text(formatedPrice + " \u20AC" + " (" + formatedNewPrice + " \u20AC" + ")");
        });
    }
*/
}