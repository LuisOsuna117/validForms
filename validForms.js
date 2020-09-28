(function (window, document, undefined) {

    /*
    * The exposed public object to validate a form:
    *
    * @param formName - String - The name attribute of the form (i.e. <form name="myForm"></form>)
    * @param fields - Array - [{
    *     fieldId: 'Field ID'
    *     fieldName: 'Field Name'
    *     filterName: 'alpha'
    *     rules: 'required|matches[password_confirm]'
    * }]
    */

    var FormValidator = function (formName, fields) {
        this.form = document.forms[formName];
        this.fields = fields;
        for (var i = 0; i < fields.length; i++) {
            document.getElementById(fields[i].fieldId).addEventListener('keypress', _checkInput, false);
        }

        function _checkInput(e) {
            console.log(e);
            var fieldId = e.target.id;
            var field = document.getElementById(fieldId);
            for (var i = 0; i < fields.length; i++) {
                if (fields[i].fieldId == fieldId) {
                    var rules = fields[i].rules.split("|");
                    var filter = fields[i].filterName;
                    for (var i = 0; i < rules.length; i++){
                        switch (rules) {
                            case 'required':
                                field.setAttribute("required", "");
                                break;
                            case 'preventCapture':
                                switch (filter) {
                                    case 'alpha':
                                        if (e.charCode != 32) {
                                            if ((e.charCode < 97 || e.charCode > 122) &&
                                                (e.charCode < 65 || e.charCode > 90)) {
                                                e.preventDefault();
                                            }
                                        }
                                        break;
                                    case 'alphaNumeric':
                                        if (e.charCode != 32) {
                                            if ((e.charCode < 97 || e.charCode > 122) &&
                                                (e.charCode < 65 || e.charCode > 90) &&
                                                (e.charCode < 48 || e.charCode > 57)) {
                                                e.preventDefault();
                                            }
                                        }
                                        break;
                                    case 'numeric':
                                        if (e.charCode != 32) {
                                            if (e.charCode < 48 || e.charCode > 57) {
                                                e.preventDefault();
                                            }
                                        }
                                    default:
                                        break;
                                }
                                break;
                            case 'visualFeedback':
                                switch (filter) {
                                    case 'alpha':
                                        if (e.charCode != 32) {
                                            if ((e.charCode < 97 || e.charCode > 122) &&
                                                (e.charCode < 65 || e.charCode > 90)) {
                                                e.preventDefault();
                                            }
                                        }
                                        break;
                                    case 'alphaNumeric':
                                        if (e.charCode != 32) {
                                            if ((e.charCode < 97 || e.charCode > 122) &&
                                                (e.charCode < 65 || e.charCode > 90) &&
                                                (e.charCode < 48 || e.charCode > 57)) {
                                                e.preventDefault();
                                            }
                                        }
                                        break;
                                    case 'numeric':
                                        if (e.charCode != 32) {
                                            if (e.charCode < 48 || e.charCode > 57) {
                                                e.preventDefault();
                                            }
                                        }
                                    default:
                                        break;
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        };
    };




    window.FormValidator = FormValidator;
})(window, document);

/*
 * Export as a CommonJS module
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormValidator;
}