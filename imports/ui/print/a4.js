import './a4.html';

let indexTmpl = Template.co_printA4;

indexTmpl.onCreated(function () {
    this.printData = new ReactiveVar({});
    // this.autorun(() => {
    let inv = FlowRouter.query.get('inv');
    if (inv) {
        Meteor.call('printA4', {invoiceId: inv}, (err, result) => {
            if (result) {
                this.printData.set(result);
            }
        });
    }
    // });
});

indexTmpl.helpers({

    data(){
        let instance = Template.instance();
        return instance.printData.get();
    },
    no(index){
        return index + 1;
    },

});
indexTmpl.events({
    'click .printInvoice'(event, instance){
        window.print();
    }
});