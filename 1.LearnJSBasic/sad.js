var person = function() { 
    this.hp = function() { // 상속 
        console.log("100"); } } // 공유 
        person.prototype.power = 5; var p1 = new person(); var p2 = new person(); p1.hp = function() { console.log("50"); } p1.mp = function() { console.log("100"); } p1.hp(); // 50 p2.hp(); // 100 p1.mp(); // 100 p2.mp(); // p2.mp is not a function p1.power; // 5 p2.power; // 5 p1.toString(); // [object]
