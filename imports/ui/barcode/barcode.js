import "./barcode.html"
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import JsBarcode from "jsbarcode";

let indexTmpl = Template.barcode;

indexTmpl.onRendered(function () {
    let instance = Template.instance();
    JsBarcode("#barcode", (instance.data.code || ""), {
        format: "pharmacode",
        lineColor: "#0aa",
        width: 4,
        height: 40,
        displayValue: false
    });
})
