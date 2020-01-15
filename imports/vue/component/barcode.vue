<template>
    <div class="barcode">
        <!--<div class="barcode-product-component" style="margin-right: -11px; margin-top: -11px;">-->
        <svg class="barcode"></svg>
    </div>
</template>
<script>
    export default {
        props: ['doc'],
        mounted() {
            this.$nextTick(function () {
                JsBarcode(this.$el.querySelector('svg.barcode'), (this.doc && this.doc._id || ""), {
                    textAlign: 'left',
                    fontSize: 9,
                    width: 1.1,
                    height: 40,
                    displayValue: false

                    // text: this.company.enShortName + (this.doc && this.doc.code || "")
//                marginLeft: 920.7
                });
            });
        },
        watch: {
            "doc"(obj) {
                JsBarcode(this.$el.querySelector('svg.barcode'), (obj._id || ""), {
                    textAlign: 'left',
                    fontSize: 9,
                    width: 1.1,
                    height: 40,
                    displayValue: false
                    // text: this.company.enShortName + (this.doc && this.doc.code || "")
//                marginLeft: 920.7
                });
            }
        }
    }
</script>