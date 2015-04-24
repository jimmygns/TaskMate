Parse.initialize("ZLDPnL5t8AzKUzPF2OJfLcP7GGS5584iJSMGXkRS", "3VWB7w2Gri9KbRTmzKp8Lr6hInyAYaiSVjig87uB");

var List = Parse.Object.extend("List");

var list = new List();

var name = prompt("Enter the name: ");

list.set("Name", name);

list.save();
