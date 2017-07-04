Template.registerHelper('formatDate', (date) => {

    if (date) {
        return moment(date).format("DD/MMMM/YYYY");
    }
});

Template.registerHelper('formatNumber', (dataNumber) => {

    if (dataNumber) {
        return numeral(dataNumber).format("0,00.00");
    }
});
