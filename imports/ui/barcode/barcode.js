import "./barcode.html"
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import JsBarcode from "jsbarcode";

let indexTmpl = Template.barcode;

indexTmpl.onRendered(function () {
    let instance = Template.instance();
    // console.log(instance.data.code);
    JsBarcode("#barcode", (instance.data.code || ""), {
        format: "pharmacode",
        lineColor: "#0aa",
        width: 2,
        // height: 40,
        height: 30,
        fontSize: 9,
        displayValue: true
    });
})
