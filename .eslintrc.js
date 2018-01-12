module.exports = {
    "extends": "airbnb",
    "rules":{
        "react/prop-types":"off",
        "prefer-destructuring": ["error", {
            "VariableDeclarator": {
              "array": true,
              "object": true
            },
            "AssignmentExpression": {
              "array": true,
              "object": true
            }
          }, {
            "enforceForRenamedProperties": false
          }]
    }
};