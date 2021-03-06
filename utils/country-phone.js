(function(factory) {
  var intlTelInput = factory(window, document);
  window.intlTelInput = intlTelInput;
})(function(window, document, undefined) {
  "use strict";
  return (function() {
    var allCountries = [
      ["Армения", "am", "374"],
      ["Азербайджан", "az", "994"],
      ["Беларусь", "by", "375"],
      ["Грузия", "ge", "995"],
      ["Россия", "ru", "7", 0],
      ["Украина", "ua", "380"],
      ["Казахстан", "kz", "77", 1, ["33", "77"]],
      ["Кыргызстан", "kg", "996"],
      ["Молдавия", "md", "373"],
      ["Таджикистан", "tj", "992"],
      ["Туркменистан", "tm", "993"],
      ["Узбекистан", "uz", "998"]
    ];
    for (var i = 0; i < allCountries.length; i++) {
      var c = allCountries[i];
      allCountries[i] = {
        name: c[0],
        iso2: c[1],
        dialCode: c[2],
        priority: c[3] || 0,
        areaCodes: c[4] || null
      };
    }
    ("use strict");

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || !1;
        descriptor.configurable = !0;
        if ("value" in descriptor) descriptor.writable = !0;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    window.intlTelInputGlobals = {
      getInstance: function getInstance(input) {
        var id = input.getAttribute("data-intl-tel-input-id");
        return window.intlTelInputGlobals.instances[id];
      },
      instances: {}
    };
    var id = 0;
    var defaults = {
      allowDropdown: !0,
      autoHideDialCode: !0,
      autoPlaceholder: "polite",
      customContainer: "",
      customPlaceholder: null,
      dropdownContainer: null,
      excludeCountries: [],
      formatOnDisplay: !0,
      geoIpLookup: null,
      hiddenInput: "",
      initialCountry: "",
      localizedCountries: null,
      nationalMode: !0,
      onlyCountries: [],
      placeholderNumberType: "MOBILE",
      preferredCountries: ["us", "gb"],
      separateDialCode: !1,
      utilsScript: ""
    };
    var regionlessNanpNumbers = [
      "800",
      "822",
      "833",
      "844",
      "855",
      "866",
      "877",
      "880",
      "881",
      "882",
      "883",
      "884",
      "885",
      "886",
      "887",
      "888",
      "889"
    ];
    window.addEventListener("load", function() {
      window.intlTelInputGlobals.windowLoaded = !0;
    });
    var forEachProp = function forEachProp(obj, callback) {
      var keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        callback(keys[i], obj[keys[i]]);
      }
    };
    var forEachInstance = function forEachInstance(method) {
      forEachProp(window.intlTelInputGlobals.instances, function(key) {
        window.intlTelInputGlobals.instances[key][method]();
      });
    };
    var Iti = (function() {
      function Iti(input, options) {
        var _this = this;
        _classCallCheck(this, Iti);
        this.id = id++;
        this.telInput = input;
        this.activeItem = null;
        this.highlightedItem = null;
        var customOptions = options || {};
        this.options = {};
        forEachProp(defaults, function(key, value) {
          _this.options[key] = customOptions.hasOwnProperty(key)
            ? customOptions[key]
            : value;
        });
        this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
      }
      _createClass(Iti, [
        {
          key: "_init",
          value: function _init() {
            var _this2 = this;
            if (this.options.nationalMode) this.options.autoHideDialCode = !1;
            if (this.options.separateDialCode) {
              this.options.autoHideDialCode = this.options.nationalMode = !1;
            }
            if (typeof Promise !== "undefined") {
              var autoCountryPromise = new Promise(function(resolve, reject) {
                _this2.resolveAutoCountryPromise = resolve;
                _this2.rejectAutoCountryPromise = reject;
              });
              var utilsScriptPromise = new Promise(function(resolve, reject) {
                _this2.resolveUtilsScriptPromise = resolve;
                _this2.rejectUtilsScriptPromise = reject;
              });
              this.promise = Promise.all([
                autoCountryPromise,
                utilsScriptPromise
              ]);
            } else {
              this.resolveAutoCountryPromise = this.rejectAutoCountryPromise = function() {};
              this.resolveUtilsScriptPromise = this.rejectUtilsScriptPromise = function() {};
            }
            this.selectedCountryData = {};
            this._processCountryData();
            this._generateMarkup();
            this._setInitialState();
            this._initListeners();
            this._initRequests();
          }
        },
        {
          key: "_processCountryData",
          value: function _processCountryData() {
            this._processAllCountries();
            this._processCountryCodes();
            this._processPreferredCountries();
            if (this.options.localizedCountries)
              this._translateCountriesByLocale();
            if (
              this.options.onlyCountries.length ||
              this.options.localizedCountries
            ) {
              this.countries.sort(this._countryNameSort);
            }
          }
        },
        {
          key: "_addCountryCode",
          value: function _addCountryCode(iso2, dialCode, priority) {
            if (dialCode.length > this.dialCodeMaxLen) {
              this.dialCodeMaxLen = dialCode.length;
            }
            if (!this.countryCodes.hasOwnProperty(dialCode)) {
              this.countryCodes[dialCode] = [];
            }
            for (var i = 0; i < this.countryCodes[dialCode].length; i++) {
              if (this.countryCodes[dialCode][i] === iso2) return;
            }
            var index =
              priority !== undefined
                ? priority
                : this.countryCodes[dialCode].length;
            this.countryCodes[dialCode][index] = iso2;
          }
        },
        {
          key: "_processAllCountries",
          value: function _processAllCountries() {
            if (this.options.onlyCountries.length) {
              var lowerCaseOnlyCountries = this.options.onlyCountries.map(
                function(country) {
                  return country.toLowerCase();
                }
              );
              this.countries = allCountries.filter(function(country) {
                return lowerCaseOnlyCountries.indexOf(country.iso2) > -1;
              });
            } else if (this.options.excludeCountries.length) {
              var lowerCaseExcludeCountries = this.options.excludeCountries.map(
                function(country) {
                  return country.toLowerCase();
                }
              );
              this.countries = allCountries.filter(function(country) {
                return lowerCaseExcludeCountries.indexOf(country.iso2) === -1;
              });
            } else {
              this.countries = allCountries;
            }
          }
        },
        {
          key: "_translateCountriesByLocale",
          value: function _translateCountriesByLocale() {
            for (var i = 0; i < this.countries.length; i++) {
              var iso = this.countries[i].iso2.toLowerCase();
              if (this.options.localizedCountries.hasOwnProperty(iso)) {
                this.countries[i].name = this.options.localizedCountries[iso];
              }
            }
          }
        },
        {
          key: "_countryNameSort",
          value: function _countryNameSort(a, b) {
            return a.name.localeCompare(b.name);
          }
        },
        {
          key: "_processCountryCodes",
          value: function _processCountryCodes() {
            this.dialCodeMaxLen = 0;
            this.countryCodes = {};
            for (var i = 0; i < this.countries.length; i++) {
              var c = this.countries[i];
              this._addCountryCode(c.iso2, c.dialCode, c.priority);
            }
            for (var _i = 0; _i < this.countries.length; _i++) {
              var _c = this.countries[_i];
              if (_c.areaCodes) {
                var rootCountryCode = this.countryCodes[_c.dialCode][0];
                for (var j = 0; j < _c.areaCodes.length; j++) {
                  var areaCode = _c.areaCodes[j];
                  for (var k = 1; k < areaCode.length; k++) {
                    var partialDialCode = _c.dialCode + areaCode.substr(0, k);
                    this._addCountryCode(rootCountryCode, partialDialCode);
                    this._addCountryCode(_c.iso2, partialDialCode);
                  }
                  this._addCountryCode(_c.iso2, _c.dialCode + areaCode);
                }
              }
            }
          }
        },
        {
          key: "_processPreferredCountries",
          value: function _processPreferredCountries() {
            this.preferredCountries = [];
            for (var i = 0; i < this.options.preferredCountries.length; i++) {
              var countryCode = this.options.preferredCountries[
                i
              ].toLowerCase();
              var countryData = this._getCountryData(countryCode, !1, !0);
              if (countryData) this.preferredCountries.push(countryData);
            }
          }
        },
        {
          key: "_createEl",
          value: function _createEl(name, attrs, container) {
            var el = document.createElement(name);
            if (attrs)
              forEachProp(attrs, function(key, value) {
                return el.setAttribute(key, value);
              });
            if (container) container.appendChild(el);
            return el;
          }
        },
        {
          key: "_generateMarkup",
          value: function _generateMarkup() {
            this.telInput.setAttribute("autocomplete", "off");
            var parentClass = "iti";
            if (this.options.allowDropdown)
              parentClass += " iti--allow-dropdown";
            if (this.options.separateDialCode)
              parentClass += " iti--separate-dial-code";
            if (this.options.customContainer) {
              parentClass += " ";
              parentClass += this.options.customContainer;
            }
            var wrapper = this._createEl("div", {
              class: parentClass
            });
            this.telInput.parentNode.insertBefore(wrapper, this.telInput);
            this.flagsContainer = this._createEl(
              "div",
              {
                class: "iti__flag-container"
              },
              wrapper
            );
            wrapper.appendChild(this.telInput);
            this.selectedFlag = this._createEl(
              "div",
              {
                class: "iti__selected-flag",
                role: "combobox",
                "aria-owns": "country-listbox"
              },
              this.flagsContainer
            );
            this.selectedFlagInner = this._createEl(
              "div",
              {
                class: "iti__flag"
              },
              this.selectedFlag
            );
            if (this.options.separateDialCode) {
              this.selectedDialCode = this._createEl(
                "div",
                {
                  class: "iti__selected-dial-code"
                },
                this.selectedFlag
              );
            }
            if (this.options.allowDropdown) {
              // this.selectedFlag.setAttribute("tabindex", "-1");
              this.dropdownArrow = this._createEl(
                "div",
                {
                  class: "iti__arrow"
                },
                this.selectedFlag
              );
              this.countryList = this._createEl("ul", {
                class: "iti__country-list iti__hide",
                id: "country-listbox",
                "aria-expanded": "false",
                role: "listbox"
              });
              if (this.preferredCountries.length) {
                this._appendListItems(
                  this.preferredCountries,
                  "iti__preferred"
                );
                this._createEl(
                  "li",
                  {
                    class: "iti__divider",
                    role: "separator",
                    "aria-disabled": "true"
                  },
                  this.countryList
                );
              }
              this._appendListItems(this.countries, "iti__standard");
              wrapper.appendChild(this.countryList);
            }
            if (this.options.hiddenInput) {
              var hiddenInputName = this.options.hiddenInput;
              var name = this.telInput.getAttribute("name");
              if (name) {
                var i = name.lastIndexOf("[");
                if (i !== -1)
                  hiddenInputName = ""
                    .concat(name.substr(0, i), "[")
                    .concat(hiddenInputName, "]");
              }
              this.hiddenInput = this._createEl("input", {
                type: "hidden",
                name: hiddenInputName
              });
              wrapper.appendChild(this.hiddenInput);
            }
          }
        },
        {
          key: "_appendListItems",
          value: function _appendListItems(countries, className) {
            var tmp = "";
            for (var i = 0; i < countries.length; i++) {
              var c = countries[i];
              tmp += "<li class='iti__country "
                .concat(className, "' id='iti-item-")
                .concat(c.iso2, "' role='option' data-dial-code='")
                .concat(c.dialCode, "' data-country-code='")
                .concat(c.iso2, "'>");
              tmp += "<div class='iti__flag-box'><div class='iti__flag iti__".concat(
                c.iso2,
                "'></div></div>"
              );
              tmp += "<span class='iti__country-name'>".concat(
                c.name,
                "</span>"
              );
              tmp += "<span class='iti__dial-code'>+".concat(
                c.dialCode,
                "</span>"
              );
              tmp += "</li>";
            }
            this.countryList.insertAdjacentHTML("beforeend", tmp);
          }
        },
        {
          key: "_setInitialState",
          value: function _setInitialState() {
            var val = this.telInput.value;
            var dialCode = this._getDialCode(val);
            var isRegionlessNanp = this._isRegionlessNanp(val);
            var _this$options = this.options,
              initialCountry = _this$options.initialCountry,
              nationalMode = _this$options.nationalMode,
              autoHideDialCode = _this$options.autoHideDialCode,
              separateDialCode = _this$options.separateDialCode;
            if (dialCode && !isRegionlessNanp) {
              this._updateFlagFromNumber(val);
            } else if (initialCountry !== "auto") {
              if (initialCountry) {
                this._setFlag(initialCountry.toLowerCase());
              } else {
                if (dialCode && isRegionlessNanp) {
                  this._setFlag("us");
                } else {
                  this.defaultCountry = this.preferredCountries.length
                    ? this.preferredCountries[0].iso2
                    : this.countries[0].iso2;
                  if (!val) {
                    this._setFlag(this.defaultCountry);
                  }
                }
              }
              if (
                !val &&
                !nationalMode &&
                !autoHideDialCode &&
                !separateDialCode
              ) {
                this.telInput.value = "+".concat(
                  this.selectedCountryData.dialCode
                );
              }
            }
            if (val) this._updateValFromNumber(val);
          }
        },
        {
          key: "_initListeners",
          value: function _initListeners() {
            this._initKeyListeners();
            if (this.options.autoHideDialCode) this._initBlurListeners();
            if (this.options.allowDropdown) this._initDropdownListeners();
            if (this.hiddenInput) this._initHiddenInputListener();
          }
        },
        {
          key: "_initHiddenInputListener",
          value: function _initHiddenInputListener() {
            var _this3 = this;
            this._handleHiddenInputSubmit = function() {
              _this3.hiddenInput.value = _this3.getNumber();
            };
            if (this.telInput.form)
              this.telInput.form.addEventListener(
                "submit",
                this._handleHiddenInputSubmit
              );
          }
        },
        {
          key: "_getClosestLabel",
          value: function _getClosestLabel() {
            var el = this.telInput;
            while (el && el.tagName !== "LABEL") {
              el = el.parentNode;
            }
            return el;
          }
        },
        {
          key: "_initDropdownListeners",
          value: function _initDropdownListeners() {
            var _this4 = this;
            this._handleLabelClick = function(e) {
              if (_this4.countryList.classList.contains("iti__hide"))
                _this4.telInput.focus();
              else e.preventDefault();
            };
            var label = this._getClosestLabel();
            if (label) label.addEventListener("click", this._handleLabelClick);
            this._handleClickSelectedFlag = function() {
              if (
                _this4.countryList.classList.contains("iti__hide") &&
                !_this4.telInput.disabled &&
                !_this4.telInput.readOnly
              ) {
                _this4._showDropdown();
                _this4.telInput.focus();
              }
            };
            this.selectedFlag.addEventListener(
              "click",
              this._handleClickSelectedFlag
            );
            this._handleFlagsContainerKeydown = function(e) {
              var isDropdownHidden = _this4.countryList.classList.contains(
                "iti__hide"
              );
              if (
                isDropdownHidden &&
                ["ArrowUp", "ArrowDown", " ", "Enter"].indexOf(e.key) !== -1
              ) {
                e.preventDefault();
                e.stopPropagation();
                _this4._showDropdown();
              }
              if (e.key === "Tab") _this4._closeDropdown();
            };
            this.flagsContainer.addEventListener(
              "keydown",
              this._handleFlagsContainerKeydown
            );
          }
        },
        {
          key: "_initRequests",
          value: function _initRequests() {
            var _this5 = this;
            if (this.options.utilsScript && !window.intlTelInputUtils) {
              if (window.intlTelInputGlobals.windowLoaded) {
                window.intlTelInputGlobals.loadUtils(this.options.utilsScript);
              } else {
                window.addEventListener("load", function() {
                  window.intlTelInputGlobals.loadUtils(
                    _this5.options.utilsScript
                  );
                });
              }
            } else this.resolveUtilsScriptPromise();
            if (this.options.initialCountry === "auto") this._loadAutoCountry();
            else this.resolveAutoCountryPromise();
          }
        },
        {
          key: "_loadAutoCountry",
          value: function _loadAutoCountry() {
            if (window.intlTelInputGlobals.autoCountry) {
              this.handleAutoCountry();
            } else if (!window.intlTelInputGlobals.startedLoadingAutoCountry) {
              window.intlTelInputGlobals.startedLoadingAutoCountry = !0;
              if (typeof this.options.geoIpLookup === "function") {
                this.options.geoIpLookup(
                  function(countryCode) {
                    window.intlTelInputGlobals.autoCountry = countryCode.toLowerCase();
                    setTimeout(function() {
                      return forEachInstance("handleAutoCountry");
                    });
                  },
                  function() {
                    return forEachInstance("rejectAutoCountryPromise");
                  }
                );
              }
            }
          }
        },
        {
          key: "_initKeyListeners",
          value: function _initKeyListeners() {
            var _this6 = this;
            this._handleKeyupEvent = function() {
              if (_this6._updateFlagFromNumber(_this6.telInput.value)) {
                _this6._triggerCountryChange();
              }
            };
            this.telInput.addEventListener("keyup", this._handleKeyupEvent);
            this._handleClipboardEvent = function() {
              setTimeout(_this6._handleKeyupEvent, 500);
            };
            this.telInput.addEventListener("cut", this._handleClipboardEvent);
            this.telInput.addEventListener("paste", this._handleClipboardEvent);
          }
        },
        {
          key: "_cap",
          value: function _cap(number) {
            var max = this.telInput.getAttribute("maxlength");
            return max && number.length > max ? number.substr(0, max) : number;
          }
        },
        {
          key: "_initBlurListeners",
          value: function _initBlurListeners() {
            var _this7 = this;
            this._handleSubmitOrBlurEvent = function() {
              _this7._removeEmptyDialCode();
            };
            if (this.telInput.form)
              this.telInput.form.addEventListener(
                "submit",
                this._handleSubmitOrBlurEvent
              );
            this.telInput.addEventListener(
              "blur",
              this._handleSubmitOrBlurEvent
            );
          }
        },
        {
          key: "_removeEmptyDialCode",
          value: function _removeEmptyDialCode() {
            if (this.telInput.value.charAt(0) === "+") {
              var numeric = this._getNumeric(this.telInput.value);
            }
          }
        },
        {
          key: "_getNumeric",
          value: function _getNumeric(s) {
            return s.replace(/\D/g, "");
          }
        },
        {
          key: "_trigger",
          value: function _trigger(name) {
            var e = document.createEvent("Event");
            e.initEvent(name, !0, !0);
            this.telInput.dispatchEvent(e);
          }
        },
        {
          key: "_showDropdown",
          value: function _showDropdown() {
            this.countryList.classList.remove("iti__hide");
            this.countryList.setAttribute("aria-expanded", "true");
            this._setDropdownPosition();
            if (this.activeItem) {
              this._highlightListItem(this.activeItem, !1);
              this._scrollTo(this.activeItem, !0);
            }
            this._bindDropdownListeners();
            this.dropdownArrow.classList.add("iti__arrow--up");
            this._trigger("open:countrydropdown");
          }
        },
        {
          key: "_toggleClass",
          value: function _toggleClass(el, className, shouldHaveClass) {
            if (shouldHaveClass && !el.classList.contains(className))
              el.classList.add(className);
            else if (!shouldHaveClass && el.classList.contains(className))
              el.classList.remove(className);
          }
        },
        {
          key: "_setDropdownPosition",
          value: function _setDropdownPosition() {
            var _this8 = this;
            if (this.options.dropdownContainer) {
              this.options.dropdownContainer.appendChild(this.dropdown);
            }
            if (!this.isMobile) {
              var pos = this.telInput.getBoundingClientRect();
              var windowTop =
                window.pageYOffset || document.documentElement.scrollTop;
              var inputTop = pos.top + windowTop;
              var dropdownHeight = this.countryList.offsetHeight;
              var dropdownFitsBelow =
                inputTop + this.telInput.offsetHeight + dropdownHeight <
                windowTop + window.innerHeight;
              var dropdownFitsAbove = inputTop - dropdownHeight > windowTop;
              this._toggleClass(
                this.countryList,
                "iti__country-list--dropup",
                !dropdownFitsBelow && dropdownFitsAbove
              );
              if (this.options.dropdownContainer) {
                var extraTop =
                  !dropdownFitsBelow && dropdownFitsAbove
                    ? 0
                    : this.telInput.offsetHeight;
                this.dropdown.style.top = "".concat(inputTop + extraTop, "px");
                this.dropdown.style.left = "".concat(
                  pos.left + document.body.scrollLeft,
                  "px"
                );
                this._handleWindowScroll = function() {
                  return _this8._closeDropdown();
                };
                window.addEventListener("scroll", this._handleWindowScroll);
              }
            }
          }
        },
        {
          key: "_getClosestListItem",
          value: function _getClosestListItem(target) {
            var el = target;
            while (
              el &&
              el !== this.countryList &&
              !el.classList.contains("iti__country")
            ) {
              el = el.parentNode;
            }
            return el === this.countryList ? null : el;
          }
        },
        {
          key: "_bindDropdownListeners",
          value: function _bindDropdownListeners() {
            var _this9 = this;
            this._handleMouseoverCountryList = function(e) {
              var listItem = _this9._getClosestListItem(e.target);
              if (listItem) _this9._highlightListItem(listItem, !1);
            };
            this.countryList.addEventListener(
              "mouseover",
              this._handleMouseoverCountryList
            );
            this._handleClickCountryList = function(e) {
              var listItem = _this9._getClosestListItem(e.target);
              if (listItem) _this9._selectListItem(listItem);
            };
            this.countryList.addEventListener(
              "click",
              this._handleClickCountryList
            );
            var isOpening = !0;
            this._handleClickOffToClose = function() {
              if (!isOpening) _this9._closeDropdown();
              isOpening = !1;
            };
            document.documentElement.addEventListener(
              "click",
              this._handleClickOffToClose
            );
            var query = "";
            var queryTimer = null;
            this._handleKeydownOnDropdown = function(e) {
              e.preventDefault();
              if (e.key === "ArrowUp" || e.key === "ArrowDown")
                _this9._handleUpDownKey(e.key);
              else if (e.key === "Enter") _this9._handleEnterKey();
              else if (e.key === "Escape") _this9._closeDropdown();
              else if (/^[a-zA-ZÀ-ÿ ]$/.test(e.key)) {
                if (queryTimer) clearTimeout(queryTimer);
                query += e.key.toLowerCase();
                _this9._searchForCountry(query);
                queryTimer = setTimeout(function() {
                  query = "";
                }, 1e3);
              }
            };
            document.addEventListener("keydown", this._handleKeydownOnDropdown);
          }
        },
        {
          key: "_handleUpDownKey",
          value: function _handleUpDownKey(key) {
            var next =
              key === "ArrowUp"
                ? this.highlightedItem.previousElementSibling
                : this.highlightedItem.nextElementSibling;
            if (next) {
              if (next.classList.contains("iti__divider")) {
                next =
                  key === "ArrowUp"
                    ? next.previousElementSibling
                    : next.nextElementSibling;
              }
              this._highlightListItem(next, !0);
            }
          }
        },
        {
          key: "_handleEnterKey",
          value: function _handleEnterKey() {
            if (this.highlightedItem)
              this._selectListItem(this.highlightedItem);
          }
        },
        {
          key: "_searchForCountry",
          value: function _searchForCountry(query) {
            for (var i = 0; i < this.countries.length; i++) {
              if (this._startsWith(this.countries[i].name, query)) {
                var listItem = this.countryList.querySelector(
                  "#iti-item-".concat(this.countries[i].iso2)
                );
                this._highlightListItem(listItem, !1);
                this._scrollTo(listItem, !0);
                break;
              }
            }
          }
        },
        {
          key: "_startsWith",
          value: function _startsWith(a, b) {
            return a.substr(0, b.length).toLowerCase() === b;
          }
        },
        {
          key: "_updateValFromNumber",
          value: function _updateValFromNumber(originalNumber) {
            var number = originalNumber;
            if (
              this.options.formatOnDisplay &&
              window.intlTelInputUtils &&
              this.selectedCountryData
            ) {
              var useNational =
                !this.options.separateDialCode &&
                (this.options.nationalMode || number.charAt(0) !== "+");
              var _intlTelInputUtils$nu = intlTelInputUtils.numberFormat,
                NATIONAL = _intlTelInputUtils$nu.NATIONAL,
                INTERNATIONAL = _intlTelInputUtils$nu.INTERNATIONAL;
              var format = useNational ? NATIONAL : INTERNATIONAL;
              number = intlTelInputUtils.formatNumber(
                number,
                this.selectedCountryData.iso2,
                format
              );
            }
            number = this._beforeSetNumber(number);
            this.telInput.value = number;
          }
        },
        {
          key: "_updateFlagFromNumber",
          value: function _updateFlagFromNumber(originalNumber) {
            var number = originalNumber;
            var selectedDialCode = this.selectedCountryData.dialCode;
            var isNanp = selectedDialCode === "1";
            if (
              number &&
              this.options.nationalMode &&
              isNanp &&
              number.charAt(0) !== "+"
            ) {
              if (number.charAt(0) !== "1") number = "1".concat(number);
              number = "+".concat(number);
            }
            if (
              this.options.separateDialCode &&
              selectedDialCode &&
              number.charAt(0) !== "+"
            ) {
              number = "+".concat(selectedDialCode).concat(number);
            }
            var dialCode = this._getDialCode(number);
            var numeric = this._getNumeric(number);
            var countryCode = null;
            if (dialCode) {
              var countryCodes = this.countryCodes[this._getNumeric(dialCode)];
              var alreadySelected =
                countryCodes.indexOf(this.selectedCountryData.iso2) !== -1 &&
                numeric.length <= dialCode.length - 1;
              var isRegionlessNanpNumber =
                selectedDialCode === "1" && this._isRegionlessNanp(numeric);
              if (!isRegionlessNanpNumber && !alreadySelected) {
                for (var j = 0; j < countryCodes.length; j++) {
                  if (countryCodes[j]) {
                    countryCode = countryCodes[j];
                    break;
                  }
                }
              }
            } else if (number.charAt(0) === "+" && numeric.length) {
              countryCode = "";
            } else if (!number || number === "+") {
              countryCode = this.defaultCountry;
            }
            if (countryCode !== null) {
              return this._setFlag(countryCode);
            }
            return !1;
          }
        },
        {
          key: "_isRegionlessNanp",
          value: function _isRegionlessNanp(number) {
            var numeric = this._getNumeric(number);
            if (numeric.charAt(0) === "1") {
              var areaCode = numeric.substr(1, 3);
              return regionlessNanpvNumbers.indexOf(areaCode) !== -1;
            }
            return !1;
          }
        },
        {
          key: "_highlightListItem",
          value: function _highlightListItem(listItem, shouldFocus) {
            var prevItem = this.highlightedItem;
            if (prevItem) prevItem.classList.remove("iti__highlight");
            this.highlightedItem = listItem;
            this.highlightedItem.classList.add("iti__highlight");
            if (shouldFocus) this.highlightedItem.focus();
          }
        },
        {
          key: "_getCountryData",
          value: function _getCountryData(
            countryCode,
            ignoreOnlyCountriesOption,
            allowFail
          ) {
            var countryList = ignoreOnlyCountriesOption
              ? allCountries
              : this.countries;
            for (var i = 0; i < countryList.length; i++) {
              if (countryList[i].iso2 === countryCode) {
                return countryList[i];
              }
            }
            if (allowFail) {
              return null;
            }
            throw new Error("No country data for '".concat(countryCode, "'"));
          }
        },
        {
          key: "_setFlag",
          value: function _setFlag(countryCode) {
            var prevCountry = this.selectedCountryData.iso2
              ? this.selectedCountryData
              : {};
            this.selectedCountryData = countryCode
              ? this._getCountryData(countryCode, !1, !1)
              : {};
            if (this.selectedCountryData.iso2) {
              this.defaultCountry = this.selectedCountryData.iso2;
            }
            this.selectedFlagInner.setAttribute(
              "class",
              "iti__flag iti__".concat(countryCode)
            );
            var title = countryCode
              ? ""
                  .concat(this.selectedCountryData.name, ": +")
                  .concat(this.selectedCountryData.dialCode)
              : "Unknown";
            this.selectedFlag.setAttribute("title", title);
            if (this.options.separateDialCode) {
              var dialCode = this.selectedCountryData.dialCode
                ? "+".concat(this.selectedCountryData.dialCode)
                : "";
              this.selectedDialCode.innerHTML = dialCode;
              var selectedFlagWidth =
                this.selectedFlag.offsetWidth ||
                this._getHiddenSelectedFlagWidth();
              this.telInput.style.paddingLeft = "".concat(
                selectedFlagWidth + 6,
                "px"
              );
            }
            this._updatePlaceholder();
            if (this.options.allowDropdown) {
              var prevItem = this.activeItem;
              if (prevItem) {
                prevItem.classList.remove("iti__active");
                prevItem.setAttribute("aria-selected", "false");
              }
              if (countryCode) {
                var nextItem = this.countryList.querySelector(
                  "#iti-item-".concat(countryCode)
                );
                nextItem.setAttribute("aria-selected", "true");
                nextItem.classList.add("iti__active");
                this.activeItem = nextItem;
                this.countryList.setAttribute(
                  "aria-activedescendant",
                  nextItem.getAttribute("id")
                );
              }
            }
            return prevCountry.iso2 !== countryCode;
          }
        },
        {
          key: "_getHiddenSelectedFlagWidth",
          value: function _getHiddenSelectedFlagWidth() {
            var containerClone = this.telInput.parentNode.cloneNode();
            containerClone.style.visibility = "hidden";
            document.body.appendChild(containerClone);
            var selectedFlagClone = this.selectedFlag.cloneNode(!0);
            containerClone.appendChild(selectedFlagClone);
            var width = selectedFlagClone.offsetWidth;
            containerClone.parentNode.removeChild(containerClone);
            return width;
          }
        },
        {
          key: "_updatePlaceholder",
          value: function _updatePlaceholder() {
            var shouldSetPlaceholder =
              this.options.autoPlaceholder === "aggressive" ||
              (!this.hadInitialPlaceholder &&
                this.options.autoPlaceholder === "polite");
            if (window.intlTelInputUtils && shouldSetPlaceholder) {
              var numberType =
                intlTelInputUtils.numberType[
                  this.options.placeholderNumberType
                ];
              var placeholder = this.selectedCountryData.iso2
                ? intlTelInputUtils.getExampleNumber(
                    this.selectedCountryData.iso2,
                    this.options.nationalMode,
                    numberType
                  )
                : "";
              placeholder = this._beforeSetNumber(placeholder);
              if (typeof this.options.customPlaceholder === "function") {
                placeholder = this.options.customPlaceholder(
                  placeholder,
                  this.selectedCountryData
                );
              }
              this.telInput.setAttribute("placeholder", placeholder);
            }
          }
        },
        {
          key: "_selectListItem",
          value: function _selectListItem(listItem) {
            var flagChanged = this._setFlag(
              listItem.getAttribute("data-country-code")
            );
            this._closeDropdown();
            this._updateDialCode(listItem.getAttribute("data-dial-code"), !0);
            this.telInput.focus();
            var len = this.telInput.value.length;
            this.telInput.setSelectionRange(len, len);
            if (flagChanged) {
              this._triggerCountryChange();
              this.telInput.value = "+".concat(
                this.selectedCountryData.dialCode
              );
            }
          }
        },
        {
          key: "_closeDropdown",
          value: function _closeDropdown() {
            this.countryList.classList.add("iti__hide");
            this.countryList.setAttribute("aria-expanded", "false");
            this.dropdownArrow.classList.remove("iti__arrow--up");
            document.removeEventListener(
              "keydown",
              this._handleKeydownOnDropdown
            );
            document.documentElement.removeEventListener(
              "click",
              this._handleClickOffToClose
            );
            this.countryList.removeEventListener(
              "mouseover",
              this._handleMouseoverCountryList
            );
            this.countryList.removeEventListener(
              "click",
              this._handleClickCountryList
            );
            if (this.options.dropdownContainer) {
              if (!this.isMobile)
                window.removeEventListener("scroll", this._handleWindowScroll);
              if (this.dropdown.parentNode)
                this.dropdown.parentNode.removeChild(this.dropdown);
            }
            this._trigger("close:countrydropdown");
          }
        },
        {
          key: "_scrollTo",
          value: function _scrollTo(element, middle) {
            var container = this.countryList;
            var windowTop =
              window.pageYOffset || document.documentElement.scrollTop;
            var containerHeight = container.offsetHeight;
            var containerTop =
              container.getBoundingClientRect().top + windowTop;
            var containerBottom = containerTop + containerHeight;
            var elementHeight = element.offsetHeight;
            var elementTop = element.getBoundingClientRect().top + windowTop;
            var elementBottom = elementTop + elementHeight;
            var newScrollTop = elementTop - containerTop + container.scrollTop;
            var middleOffset = containerHeight / 2 - elementHeight / 2;
            if (elementTop < containerTop) {
              if (middle) newScrollTop -= middleOffset;
              container.scrollTop = newScrollTop;
            } else if (elementBottom > containerBottom) {
              if (middle) newScrollTop += middleOffset;
              var heightDifference = containerHeight - elementHeight;
              container.scrollTop = newScrollTop - heightDifference;
            }
          }
        },
        {
          key: "_updateDialCode",
          value: function _updateDialCode(
            newDialCodeBare,
            hasSelectedListItem
          ) {
            var inputVal = this.telInput.value;
            var newDialCode = "+".concat(newDialCodeBare);
            var newNumber;
            if (inputVal.charAt(0) === "+") {
              var prevDialCode = this._getDialCode(inputVal);
              if (prevDialCode) {
                newNumber = inputVal.replace(prevDialCode, newDialCode);
              } else {
                newNumber = newDialCode;
              }
            } else if (
              this.options.nationalMode ||
              this.options.separateDialCode
            ) {
              return;
            } else {
              if (inputVal) {
                newNumber = newDialCode + inputVal;
              } else if (
                hasSelectedListItem ||
                !this.options.autoHideDialCode
              ) {
                newNumber = newDialCode;
              } else {
                return;
              }
            }
            this.telInput.value = newNumber;
          }
        },
        {
          key: "_getDialCode",
          value: function _getDialCode(number) {
            var dialCode = "";
            if (number.charAt(0) === "+") {
              var numericChars = "";
              for (var i = 0; i < number.length; i++) {
                var c = number.charAt(i);
                if (!isNaN(parseInt(c, 10))) {
                  numericChars += c;
                  if (this.countryCodes[numericChars]) {
                    dialCode = number.substr(0, i + 1);
                  }
                  if (numericChars.length === this.dialCodeMaxLen) {
                    break;
                  }
                }
              }
            }
            return dialCode;
          }
        },
        {
          key: "_getFullNumber",
          value: function _getFullNumber() {
            var val = this.telInput.value.trim();
            var dialCode = this.selectedCountryData.dialCode;
            var prefix;
            var numericVal = this._getNumeric(val);
            if (
              this.options.separateDialCode &&
              val.charAt(0) !== "+" &&
              dialCode &&
              numericVal
            ) {
              prefix = "+".concat(dialCode);
            } else {
              prefix = "";
            }
            return prefix + val;
          }
        },
        {
          key: "_beforeSetNumber",
          value: function _beforeSetNumber(originalNumber) {
            var number = originalNumber;
            if (this.options.separateDialCode) {
              var dialCode = this._getDialCode(number);
              if (dialCode) {
                dialCode = "+".concat(this.selectedCountryData.dialCode);
                var start =
                  number[dialCode.length] === " " ||
                  number[dialCode.length] === "-"
                    ? dialCode.length + 1
                    : dialCode.length;
                number = number.substr(start);
              }
            }
            return this._cap(number);
          }
        },
        {
          key: "_triggerCountryChange",
          value: function _triggerCountryChange() {
            this._trigger("countrychange");
          }
        },
        {
          key: "handleAutoCountry",
          value: function handleAutoCountry() {
            if (this.options.initialCountry === "auto") {
              this.defaultCountry = window.intlTelInputGlobals.autoCountry;
              if (!this.telInput.value) {
                this.setCountry(this.defaultCountry);
              }
              this.resolveAutoCountryPromise();
            }
          }
        },
        {
          key: "handleUtils",
          value: function handleUtils() {
            if (window.intlTelInputUtils) {
              if (this.telInput.value) {
                this._updateValFromNumber(this.telInput.value);
              }
              this._updatePlaceholder();
            }
            this.resolveUtilsScriptPromise();
          }
        },
        {
          key: "destroy",
          value: function destroy() {
            var form = this.telInput.form;
            if (this.options.allowDropdown) {
              this._closeDropdown();
              this.selectedFlag.removeEventListener(
                "click",
                this._handleClickSelectedFlag
              );
              this.flagsContainer.removeEventListener(
                "keydown",
                this._handleFlagsContainerKeydown
              );
              var label = this._getClosestLabel();
              if (label)
                label.removeEventListener("click", this._handleLabelClick);
            }
            if (this.hiddenInput && form)
              form.removeEventListener("submit", this._handleHiddenInputSubmit);
            if (this.options.autoHideDialCode) {
              if (form)
                form.removeEventListener(
                  "submit",
                  this._handleSubmitOrBlurEvent
                );
              this.telInput.removeEventListener(
                "blur",
                this._handleSubmitOrBlurEvent
              );
            }
            this.telInput.removeEventListener("keyup", this._handleKeyupEvent);
            this.telInput.removeEventListener(
              "cut",
              this._handleClipboardEvent
            );
            this.telInput.removeEventListener(
              "paste",
              this._handleClipboardEvent
            );
            this.telInput.removeAttribute("data-intl-tel-input-id");
            var wrapper = this.telInput.parentNode;
            wrapper.parentNode.insertBefore(this.telInput, wrapper);
            wrapper.parentNode.removeChild(wrapper);
            delete window.intlTelInputGlobals.instances[this.id];
          }
        },
        {
          key: "getExtension",
          value: function getExtension() {
            if (window.intlTelInputUtils) {
              return intlTelInputUtils.getExtension(
                this._getFullNumber(),
                this.selectedCountryData.iso2
              );
            }
            return "";
          }
        },
        {
          key: "getNumber",
          value: function getNumber(format) {
            if (window.intlTelInputUtils) {
              var iso2 = this.selectedCountryData.iso2;
              return intlTelInputUtils.formatNumber(
                this._getFullNumber(),
                iso2,
                format
              );
            }
            return "";
          }
        },
        {
          key: "getNumberType",
          value: function getNumberType() {
            if (window.intlTelInputUtils) {
              return intlTelInputUtils.getNumberType(
                this._getFullNumber(),
                this.selectedCountryData.iso2
              );
            }
            return -99;
          }
        },
        {
          key: "getSelectedCountryData",
          value: function getSelectedCountryData() {
            return this.selectedCountryData;
          }
        },
        {
          key: "getValidationError",
          value: function getValidationError() {
            if (window.intlTelInputUtils) {
              var iso2 = this.selectedCountryData.iso2;
              return intlTelInputUtils.getValidationError(
                this._getFullNumber(),
                iso2
              );
            }
            return -99;
          }
        },
        {
          key: "isValidNumber",
          value: function isValidNumber() {
            var val = this._getFullNumber().trim();
            var countryCode = this.options.nationalMode
              ? this.selectedCountryData.iso2
              : "";
            return window.intlTelInputUtils
              ? intlTelInputUtils.isValidNumber(val, countryCode)
              : null;
          }
        },
        {
          key: "setCountry",
          value: function setCountry(originalCountryCode) {
            var countryCode = originalCountryCode.toLowerCase();
            if (
              !this.selectedFlagInner.classList.contains(
                "iti__".concat(countryCode)
              )
            ) {
              this._setFlag(countryCode);
              this._updateDialCode(this.selectedCountryData.dialCode, !1);
              this._triggerCountryChange();
            }
          }
        },
        {
          key: "setNumber",
          value: function setNumber(number) {
            var flagChanged = this._updateFlagFromNumber(number);
            this._updateValFromNumber(number);
            if (flagChanged) {
              this._triggerCountryChange();
            }
          }
        },
        {
          key: "setPlaceholderNumberType",
          value: function setPlaceholderNumberType(type) {
            this.options.placeholderNumberType = type;
            this._updatePlaceholder();
          }
        }
      ]);
      return Iti;
    })();
    window.intlTelInputGlobals.getCountryData = function() {
      return allCountries;
    };
    var injectScript = function injectScript(
      path,
      handleSuccess,
      handleFailure
    ) {
      var script = document.createElement("script");
      script.onload = function() {
        forEachInstance("handleUtils");
        if (handleSuccess) handleSuccess();
      };
      script.onerror = function() {
        forEachInstance("rejectUtilsScriptPromise");
        if (handleFailure) handleFailure();
      };
      script.className = "iti-load-utils";
      script.async = !0;
      script.src = path;
      document.body.appendChild(script);
    };
    window.intlTelInputGlobals.loadUtils = function(path) {
      if (
        !window.intlTelInputUtils &&
        !window.intlTelInputGlobals.startedLoadingUtilsScript
      ) {
        window.intlTelInputGlobals.startedLoadingUtilsScript = !0;
        if (typeof Promise !== "undefined") {
          return new Promise(function(resolve, reject) {
            return injectScript(path, resolve, reject);
          });
        }
        injectScript(path);
      }
      return null;
    };
    window.intlTelInputGlobals.defaults = defaults;
    window.intlTelInputGlobals.version = "16.0.2";
    return function(input, options) {
      var iti = new Iti(input, options);
      iti._init();
      input.setAttribute("data-intl-tel-input-id", iti.id);
      window.intlTelInputGlobals.instances[iti.id] = iti;
      return iti;
    };
  })();
});
