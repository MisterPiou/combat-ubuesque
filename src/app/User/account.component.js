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
var AccountComponent = (function () {
    function AccountComponent(errorService, userService) {
        this.errorService = errorService;
        this.userService = userService;
        this.user = [];
    }
    AccountComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.infosUser()
            .subscribe(function (user) { return _this.user = user; }, function (error) { return _this.errorService.newErrorMessage(error); });
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
        user_service_1.UserService])
], AccountComponent);
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=account.component.js.map