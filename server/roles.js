// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
    
ac.grant("student")
 .readOwn("profile")
 .updateOwn("profile")

 ac.grant("teacher")
 .readOwn("profile")
 .readAny("profile")

// ac.grant("teacher")
//  .extend("student")
//  .readAny("profile")

ac.grant("admin")
 .extend("teacher")
 .extend("student")
 .updateAny("profile")
 .deleteAny("profile")

return ac;
})();