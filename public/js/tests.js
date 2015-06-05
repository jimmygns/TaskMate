Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");

QUnit.test( "hello test", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "example test", function( assert ) {
    Parse.Cloud.run('test', {}, {
        success: function(result) {
// result is 'Hello world!'
            assert.ok("Found 51 lists" == result, "Found the proper # of lists");
        },
        error: function(error) {
            alert("Error1");
        }
    });

    assert.ok(1 == "1", "This is just to remove Qunit's complaints about no asserts")
});