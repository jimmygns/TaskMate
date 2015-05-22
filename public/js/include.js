Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");

var Child = Parse.Object.extend("Child");
var Parent = Parse.Object.extend("Parent");
var query = new Parse.Query(Child);

query.include("owner");

query.find({
    success: function(objects) {
        for (var i = 0; i < objects.length; i++) {
            var parent = objects[i].get("owner");
            alert(objects[i].get("value"));
            alert(parent.get("value"));
        }
    }
});