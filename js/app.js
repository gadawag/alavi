//------------------------------------------------------------
// UI Module:
// Anything that is related to the user interface will go here
//------------------------------------------------------------
var UIcontroller = (function() {

    /**
     * @param
     * @function: object that has class name of elements
     * @return
    **/
    var formStrings = {
        inputText: 'home-form__text',
        inputTextarea: 'home-form__textarea',
        labelWrapper: 'home-form__label-wr',
        inputLabel: 'home-form__label',
        hideLabel: 'home-form__hide-label',
    };

    /**
     * @param: elements to check
     * @function: check if element has value
     * @return: boolean
    **/
    var inputIsEmpty = function(el) {
        if (el.value === '') {
            return false;
        } else {
            return true;
        }
    }

    /**
     * @param: class, element, boolean
     * @function: add or remove class
     * @return
    **/
    var classManager = function(classToToggle, element, boolean) {
        if (boolean) {
            element.classList.add(classToToggle);
        } else {
            element.classList.remove(classToToggle);
        }
    }

    /**
     * Public methods returned as object, why object? because we want to return not only single function but multiple functions. And uses the closures 
     * Closures: inner functions have always access to the outer function, even the outer function has returned.
    **/
    return {
        getInputStrings: function() {
            return formStrings;
        },
        checkInputValue: function(el) {
            return inputIsEmpty(el);
        },
        classToggler: function(cl, el, bool) {
            classManager(cl, el, bool);
        }
    }

})();


//------------------------------------------------------------
// controller:
// Interact with other module to tell them what to do.
// Also, to set our event handlers
//------------------------------------------------------------
var controller = (function(UIctrl) {

    /**
     * @param
     * @function: initalize the application to set the event handlers.
     * @return
    **/
    var init = function() {
        var inputStrings = UIctrl.getInputStrings();
        
        var inputs = document.getElementsByClassName(inputStrings.inputText);
        var textAreas = document.getElementsByClassName(inputStrings.inputTextarea);

        formEventHandler(inputs, inputStrings.hideLabel);
        formEventHandler(textAreas, inputStrings.hideLabel);
    };

    /** 
     * @param: arraylist of element, and the class to manipulate
     * @function: adding events to the input array
     * @return
    **/
    var formEventHandler = function(inputArray, cl) {
        for (var i = 0; i < inputArray.length; i++) {

            inputArray[i].addEventListener('focus', function() {
                this.labels[0].classList.add(cl);
            });

            inputArray[i].addEventListener('focusout', function() {
                UIctrl.classToggler(cl, this.labels[0], UIctrl.checkInputValue(this));
            });
        }
    }

    /**
     * Public methods returned as object, why object? because we want to return not only single function but multiple functions. And uses the closures 
     * Closures: inner functions have always access to the outer function, even the outer function has returned.
    **/
    return {
        initializeApp: function() {
            init();
        }
    }

})(UIcontroller);

controller.initializeApp();