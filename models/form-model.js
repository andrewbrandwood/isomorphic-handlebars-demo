(function(){
  'use strict';

  var rawData = null;

  var FormModel = function(data) {

    rawData = data;

    return {
      email : data.email,
      firstName: data.firstname,
      lastName: data.lastname,
      phone : data.phone,
      organisation : data.organisation,
      website: data.website
    };
  };

  module.exports = FormModel;

}());
