import {BlazeLayout} from 'meteor/kadira:blaze-layout';
export const _Main = (tmpl) => {
    BlazeLayout.render('MainLayout', {content: tmpl})
}

export const _Report = (tmpl) => {
    BlazeLayout.render('ReportLayout', {content: tmpl})
}

export const _ReportNoSideBar = (tmpl) => {
    BlazeLayout.render('ReportLayoutNoSideBar', {content: tmpl})
}