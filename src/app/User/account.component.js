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
var error_service_1 = require("../Global/error.service");
var user_service_1 = require("./user.service");
var forms_1 = require("@angular/forms");
var match_password_directive_1 = require("../Global/match-password.directive");
var AccountComponent = (function () {
    function AccountComponent(errorService, fb, userService) {
        this.errorService = errorService;
        this.fb = fb;
        this.userService = userService;
        this.user = new user_service_1.User(0, "", "", 0, new Date());
        this.isChangeMail = false;
        this.isChangePwd = false;
        this.createForm();
    }
    AccountComponent.prototype.createForm = function () {
        this.changeMailForm = this.fb.group({
            email: [this.user.email, [forms_1.Validators.email, forms_1.Validators.required]]
        });
        this.changePwdForm = this.fb.group({
            oldPwd: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            newPwd: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6), forms_1.Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$")]],
            confirmPwd: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
        }, match_password_directive_1.matchPasswordValidator);
    };
    AccountComponent.prototype.getUser = function () {
        var _this = this;
        this.user = this.userService.getUser();
        this.userService.infosUser()
            .subscribe(function (user) {
            _this.user = user;
            _this.userService.setUser(_this.user);
        }, function (error) { return _this.errorService.newErrorMessage(error); });
    };
    /**
     * Mail modification
     */
    AccountComponent.prototype.changeMail = function () {
        this.isChangeMail = true;
    };
    AccountComponent.prototype.saveNewMail = function () {
        var _this = this;
        var formModel = this.changeMailForm.value;
        this.userService.changeMail(formModel.email)
            .subscribe(function (user) {
            _this.user = user;
            _this.userService.setUser(_this.user);
            _this.isChangeMail = false;
            _this.getUser();
        }, function (error) { return _this.errorService.newErrorMessage(error); });
    };
    /**
     * Password modification
     */
    AccountComponent.prototype.changePassword = function () {
        this.isChangePwd = true;
    };
    AccountComponent.prototype.saveNewPassword = function () {
        var _this = this;
        var formModel = this.changePwdForm.value;
        this.userService.changePassword(formModel.newPwd)
            .subscribe(function (user) {
            _this.user = user;
            _this.userService.setUser(_this.user);
            _this.isChangePwd = false;
        }, function (error) { return _this.errorService.newErrorMessage(error); });
    };
    /** ng Init **/
    AccountComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    return AccountComponent;
}());
AccountComponent = __decorate([
    core_1.Component({
        selector: 'account',
        templateUrl: './account.component.html',
    }),
    __metadata("design:paramtypes", [error_service_1.ErrorService,
        forms_1.FormBuilder,
        user_service_1.UserService])
], AccountComponent);
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=account.component.js.map