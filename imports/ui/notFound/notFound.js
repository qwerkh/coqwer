import  './notFound.html';


Template.Co_notFound.helpers({
    currentRoute(){
        return FlowRouter.current() && FlowRouter.current().path;
    }
});