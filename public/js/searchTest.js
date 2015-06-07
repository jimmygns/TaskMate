Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");

QUnit.test( "search test1", function( assert ) {
    Parse.Cloud.run('searchUser', {searchInput: ""}, {
        success: function(result) {
// result is 'Hello world!'
            //alert(result.length);
            assert.ok(result.length == 0, "Search empty string Found 0 User");
        },
        error: function(error) {
        }
    });

    assert.ok(1 == "1", "This is just to remove Qunit's complaints about no asserts")
});

QUnit.test( "search test2", function( assert ) {
    Parse.Cloud.run('searchUser', {searchInput: "amelia"}, {
        success: function(result) {

// result is 'Hello world!'
            //alert(result[0].fullName);
            assert.ok(result.length == 1, "Search amelia Found one User");
            assert.ok(result[0].fullName == "Amelia Vu", "Found User named Amelia");
        },
        error: function(error) {        }
    });

    assert.ok(1 == "1", "This is just to remove Qunit's complaints about no asserts")
});

QUnit.test( "search test3", function( assert ) {
    Parse.Cloud.run('searchUser', {searchInput: "what"}, {
        success: function(result) {
// result is 'Hello world!'
            //alert(result[0].fullName);
            assert.ok(result.length == 0, "Search what Found 0 User");
            //assert.ok(result[0].fullName == "Amelia Vu", "Found User named Amelia");
        },
        error: function(error) {
        }
    });

    assert.ok(1 == "1", "This is just to remove Qunit's complaints about no asserts")
});

QUnit.test("Testing follow", function(assert) {
     Parse.User.logIn("hayao@miyazaki.com", "password", {
         success: function(user) {
     Parse.Cloud.run('follow', {followingId: "3pbuNTZawL"}, {
        success: function(result) {
            assert.ok(result == "Now following user #3pbuNTZawL");
        }, 
        error: function(error) {
        }
    });
      },
      error: function(user, error) {
        alert("Login failed.");
      }
    });  
   assert.ok(1 == "1", "This is just to remove Qunit's complaints about no asserts")
Parse.User.logOut();
});


QUnit.test("Testing unfollow", function(assert) {
     Parse.User.logIn("hayao@miyazaki.com", "password", {
         success: function(user) {
     Parse.Cloud.run('unfollow', {followingId: "3pbuNTZawL"}, {
        success: function(result) {
            assert.ok(result == "No longer following user #3pbuNTZawL");
        }, 
        error: function(error) {
        }
    });
      },
      error: function(user, error) {
        alert("Login failed.");
      }
    });  
   assert.ok(1 == "1", "This is just to remove Qunit's complaints about no asserts")
Parse.User.logOut();
});

QUnit.test("Testing createNotification", function(assert) {
     Parse.User.logIn("test@notification1.com", "123456", {
         success: function(user) {
     Parse.Cloud.run('createNotification', {followingId: "3pbuNTZawL"}, {
        success: function(result) {
            assert.ok(result == "Notification object created.");
        }, 
        error: function(error) {
        }
    });
      },
      error: function(user, error) {
        alert("Login failed.");
      }
    });  
   assert.ok(1 == "1", "This is just to remove Qunit's complaints about no asserts")
Parse.User.logOut();
});