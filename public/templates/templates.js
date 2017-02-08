this["Demo"] = this["Demo"] || {};
this["Demo"]["templates"] = this["Demo"]["templates"] || {};
this["Demo"]["templates"]["item-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["item-listing/item-listing"],depth0,{"name":"item-listing/item-listing","hash":{"linkText":"Buy now"},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"item-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.contentData : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"usePartial":true,"useData":true});
this["Demo"]["templates"]["item-listing"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function";

  return "<div class=\"item-listing\">\n  <figure class=\"item-listing__figure\">\n    <img class=\"item-listing__image\" src=\""
    + container.escapeExpression(((helper = (helper = helpers.imageUrl || (depth0 != null ? depth0.imageUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imageUrl","hash":{},"data":data}) : helper)))
    + "\" alt=\" \" />\n    <figcaption>"
    + ((stack1 = ((helper = (helper = helpers.imageDescription || (depth0 != null ? depth0.imageDescription : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imageDescription","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</figcaption>\n  </figure>\n  <div class=\"item-listing__description\">\n    <h2 class=\"item-listing__title\">"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</h2>\n    "
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n"
    + ((stack1 = container.invokePartial(partials["button/button"],depth0,{"name":"button/button","hash":{"buttonText":(depth0 != null ? depth0.linkText : depth0)},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "  </div>\n</div>\n";
},"usePartial":true,"useData":true});
this["Demo"]["templates"]["button"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<button class=\"btn\">"
    + container.escapeExpression(((helper = (helper = helpers.buttonText || (depth0 != null ? depth0.buttonText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"buttonText","hash":{},"data":data}) : helper)))
    + "</button>\n";
},"useData":true});