Ember.Handlebars.helper('checkboxlist', function(list) {
  var element = "",
      maxIndex = list.length -1,
      size = list.length;
  
  for(var i=0; i<maxIndex; i++) {
    var escapedItem = Handlebars.Utils.escapeExpression(list[i]);
    if( (i + 1) % 2  == 1)
      element += "<div class=\"row\"> <div class=\"col-md-6\"> <input type=\"checkbox\" name=\"ethnicities\" value=\"" + escapedItem + "\" checked>" + escapedItem + "</div>";
      // element += "<div class=\"row\"> <div class=\"col-md-6\"> {{{input type=\"checkbox\" name=\"ethnicities\"}}}" + escapedItem + "</div>"; 
    else
      element += "<div class=\"col-md-6\"> <input type=\"checkbox\" name=\"ethnicities\" value=\"" + escapedItem + "\" checked>" + escapedItem + "</div> </div>";
      // element += "<div class=\"col-md-6\"> {{{input type=\"checkbox\" name=\"ethnicities\"}}}" + escapedItem + "</div> </div>";
  }
  
  var escapedItem = Handlebars.Utils.escapeExpression(list[maxIndex]);
  if(size % 2 == 1) {
    element += "<div class=\"row\"> <div class=\"col-md-6\"> <input type=\"checkbox\" name=\"ethnicities\" value=\"" + escapedItem + "\" checked>" + escapedItem + "</div> </div>";
    // element += "<div class=\"row\"> <div class=\"col-md-6\"> {{{input type=\"checkbox\" name=\"ethnicities\"}}}" + escapedItem + "</div> </div>";
  }
  else
    element += "<div class=\"col-md-6\"> <input type=\"checkbox\" name=\"ethnicities\" value=\"" + escapedItem + "\" checked>" + escapedItem + "</div> </div>";

  return new Ember.Handlebars.SafeString(element);
});