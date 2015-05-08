/**
 * Created by yuezhao on 5/5/15.
 */
Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");
Parse.Cloud.run('test', {}, {
    success: function(result) {
// result is 'Hello world!'
        alert(result);
    },
    error: function(error) {
        alert("Error1");
    }
});

Parse.Cloud.run('test2', {color: "blue"}, {
    success: function(result) {
        alert(result);
    },
    error: function(error) {
        alert("Error2");
    }
});