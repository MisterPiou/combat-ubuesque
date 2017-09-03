"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var error_service_1 = require("../Global/error.service");
var user_service_1 = require("./user.service");
var RegistrationComponent = (function () {
    function RegistrationComponent(fb, errorService, userService) {
        this.fb = fb;
        this.errorService = errorService;
        this.userService = userService;
        this.isLoading = false;
        this.etatMsgBox = 'errMsg';
        this.createForm();
    }
    RegistrationComponent.prototype.createForm = function () {
        this.userForm = this.fb.group({
            username: ['', [forms_1.Validators.required, forms_1.Validators.minLength(4)]],
            email: ['', [forms_1.Validators.email, forms_1.Validators.required]],
            first: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            second: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
        });
    };
    RegistrationComponent.prototype.resetForm = function () {
        this.userForm.reset();
    };
    RegistrationComponent.prototype.onSubmit = function () {
        var _this = this;
        var formModel = this.userForm.value;
        this.isLoading = true;
        var data = {
            username: formModel.username,
            email: formModel.email,
            plainPassword: {
                first: formModel.first,
                second: formModel.second
            }
        };
        this.userService.registerUser(data)
            .subscribe(function (response) {
            _this.response = response;
            if (_this.response) {
                _this.resetForm();
                _this.activeSuccesMessage();
            }
            _this.isLoading = false;
        }, function (error) {
            _this.errorService.newErrorMessage(error);
            _this.isLoading = false;
        });
    };
    /* Animation message success */
    RegistrationComponent.prototype.activeSuccesMessage = function () {
        this.etatMsgBox = 'errMsgActive';
    };
    return RegistrationComponent;
}());
RegistrationComponent = __decorate([
    core_1.Component({
        selector: 'registration',
        templateUrl: './registration.component.html',
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        error_service_1.ErrorService,
        user_service_1.UserService])
], RegistrationComponent);
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registration.component.js.map