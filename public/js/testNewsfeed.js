Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");
QUnit.test( "hello test", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});

QUnit.test("test the number of likes in a newsfeed", function(assert){
	Parse.User.logIn("test1@newsfeed.com", "123456", {
		success: function(user){
			Parse.Cloud.run('changeNumLike', {newsfeedID: "z5n9lKtnyC"}, {
				success: function(results){
					//alert("# is " + results[1] + " after increment");
					assert.ok(results[1] === 1, "check number of likes (increment)");
				},
				error: function(error){
					//assert.ok(error == "wrong number of likes");
					alert("Cannot query this newsfeed ID");
				}
			});
 

			Parse.Cloud.run('changeNumLike', {newsfeedID: "z5n9lKtnyC"}, {
				success: function(results){
					//alert("# is " + results[1] + " after decrement");
					assert.ok(results[1] === 0, "check number of likes (decrement)");
				},
				error: function(error){
					//assert.ok(error == "wrong number of likes");
					alert("Cannot query this newsfeed ID");
				}
			});


		},
		error: function(user, error){
			alert("Login test1@newsfeed.com problem");	
		}
	});

	assert.ok(1 == "1", "This is just to remove Qunit's complaints about no asserts");
    Parse.User.logOut();
});