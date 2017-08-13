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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var error_service_1 = require("../Global/error.service");
var user_service_1 = require("./user.service");
var hero_service_1 = require("../Hero/hero.service");
var LoginComponent = (function () {
    function LoginComponent(fb, errorService, userService, heroService, router) {
        this.fb = fb;
        this.errorService = errorService;
        this.userService = userService;
        this.heroService = heroService;
        this.router = router;
        this.isLoading = false;
        this.createForm();
    }
    /* Cree le formualaire */
    LoginComponent.prototype.createForm = function () {
        this.logForm = this.fb.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
        });
    };
    /* Envoie du formualaire d'inscription */
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isLoading = true;
        var formModel = this.logForm.value;
        var data = {
            username: formModel.username,
            password: formModel.password,
        };
        this.userService.loginUser(data)
            .subscribe(function (response) {
            localStorage.setItem('token', response.token);
            _this.redirectAfterLog();
            _this.isLoading = false;
            _this.loadUserInfo();
        }, function (error) { return _this.errorService.newErrorMessage(error); });
    };
    LoginComponent.prototype.loadUserInfo = function () {
        var _this = this;
        this.userService.infosUser()
            .subscribe(function (user) { return _this.userService.setUser(user); }, function (error) { return _this.errorService.newErrorMessage(error); });
        this.heroService.getHeroSelected()
            .subscribe(function (hero) {
            _this.heroService.setHeroInfo(hero);
        }, function (error) { return _this.errorService.newErrorMessage(error); });
    };
    LoginComponent.prototype.redirectAfterLog = function () {
        this.router.navigate(['home']);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'registration',
        templateUrl: './login.component.html',
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        error_service_1.ErrorService,
        user_service_1.UserService,
        hero_service_1.HeroService,
        router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map