export const _Main = (tmpl) => {

    BlazeLayout.render('MainLayout', {content: tmpl})
}

export const _Report = (tmpl) => {
    BlazeLayout.render('ReportLayout', {content: tmpl})
}