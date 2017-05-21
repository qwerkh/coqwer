import { FilesCollection } from 'meteor/ostrio:files';

this.Images = new FilesCollection({
    collectionName: 'Images',
    storagePath: 'assets/app/uploads/Images',
    allowClientCode: true, // Required to let you remove uploaded file
    onBeforeUpload: function (file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.ext)) {
            return true;
        } else {
            return 'Please upload image, with size equal or less than 10MB';
        }
    }
});


if (Meteor.isClient) {
    Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
    Meteor.publish('files.images.all', function () {
        return Images.collection.find({});
    });
}