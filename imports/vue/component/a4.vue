<template>
    <div class="page-a4">
        <div class="a4">
            <!--<div class="center">-->
                <!--<slot name="header"></slot>-->
            <!--</div>-->
            <!--<div class="content">-->
                <!--<slot name="content"></slot>-->
            <!--</div>-->
            <!--<slot name="footer"></slot>-->
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                msg: 'hi'
            }
        }
    }
</script>

<style scope>
    @page {
        size: A4;
        margin: 0;
    }

    @media print {
        html, body {
            width: 210mm;
            height: auto;
        }

        table {
            background: #000;
            height: auto;
        }

        /* ... the rest of the rules ... */
    }
</style>