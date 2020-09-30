(function (window, document, undefined) {
    /*
     * The exposed public object to validate a form:
     *
     * @param formName - String - The name attribute of the form (i.e. <form name="myForm"></form>)
     * @param fields - Array - [{
     *     fieldId: 'Field ID'
     *     fieldName: 'Field Name'
     *     filterName: 'alpha'
     *     rules: 'required|preventCapture'
     *     onSubmit: myFunction() - Optional
     * }]
     */

    var FormValidator = function (formName, fields, callback) {
        this.form = document.forms[formName];
        this.fields = fields;
        this.form.onsubmit = callback;
        for (var i = 0; i < fields.length; i++) {
            var field = document.getElementById(fields[i].fieldId);
            field.onpaste = (e) => e.preventDefault();
            var rules = fields[i].rules.split("|");
            for (var j = 0; j < rules.length; j++) {
                switch (rules[j]) {
                    case "required":
                        field.setAttribute("required", "");
                        break;
                    case "preventCapture":
                        switch (fields[i].filterName) {
                            case "alpha":
                                document
                                    .getElementById(fields[i].fieldId)
                                    .addEventListener(
                                        "input",
                                        function (e) {
                                            _checkInput(e, "alpha");
                                        },
                                        false
                                    );
                                break;
                            case "alphaNumeric":
                                document
                                    .getElementById(fields[i].fieldId)
                                    .addEventListener(
                                        "input",
                                        function (e) {
                                            _checkInput(e, "alphaNumeric");
                                        },
                                        false
                                    );
                                break;
                            case "numeric":
                                document
                                    .getElementById(fields[i].fieldId)
                                    .addEventListener(
                                        "input",
                                        function (e) {
                                            _checkInput(e, "numeric");
                                        },
                                        false
                                    );
                                break;
                            default:
                                break;
                        }

                        break;
                    default:
                        break;
                }
            }
        }
        function _checkInput(e, filter) {
            console.log(e.data);
            var field = document.getElementById(e.target.id);
            var alpha = "abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
            var alphaNumeric = "abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ";
            var numeric = "1234567890";
            switch (filter) {
                case "alpha":
                    if (!alpha.includes(e.data) && e.data != null) {
                        field.value = field.value.slice(0, -1);
                    }
                    break;
                case "alphaNumeric":
                    if (!alphaNumeric.includes(e.data) && e.data != null) {
                        field.value = field.value.slice(0, -1);
                    }
                    break;
                case "numeric":
                    field.value = field.value.replaceAll(" ","");
                    if (!numeric.includes(e.data) && e.data != null && e.data != " ") {
                        field.value = field.value.slice(0, -1);
                    }
                    break;
                default:
                    break;
            }
        }
    };

    window.FormValidator = FormValidator;
})(window, document);

/*
 * Export as a CommonJS module
 */
if (typeof module !== "undefined" && module.exports) {
    module.exports = FormValidator;
}