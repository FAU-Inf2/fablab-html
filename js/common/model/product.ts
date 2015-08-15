/// <reference path="category.ts" />
/// <reference path="uom.ts" />
module common {
    export class product {

        public _productId:number;
        public _name:string;
        public _description:string;
        public _price:number;
        public _itemsAvailable:number;
        public _unit:string;

        public _categoryString:string;
        public _locationString:string;

        public _categoryId:number;
        public _oumId:number;

        constructor(record) {
            this._productId = record.productId;
            this._name = record.name;
            this._description = record.description;
            this._price = record.price;
            this._unit = record.unit;
            this._itemsAvailable = record.itemsAvailable;

            this._categoryId = record.location_id;
            this._oumId = record.oum_id;

            this._categoryString = record.categoryString;
            this._locationString = record.location;
        }

    }
}