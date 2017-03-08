import './preloader.html';
let indexTmpl = Template.co_preloader;

indexTmpl.helpers({
    onSumitForm(){
        let paramsSumit= FlowRouter.query.get('s');
        return !!paramsSumit;
    }
});