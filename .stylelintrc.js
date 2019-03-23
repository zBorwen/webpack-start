module.exports = {
  "extends": ["stylelint-config-standard", "stylelint-config-recess-order"],
  "piugins": ["stylelint-order", "stylelint-scss"],
  "rules": {
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": [
        "mixin", "extend", "content"
      ]
    }],
    "order/order": [
      "custom-properties",
      "declarations"
    ],
    "order/properties-alphabetical-order": true,
    "at-rule-empty-line-before": null
  }
}
