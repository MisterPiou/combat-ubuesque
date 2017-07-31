"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./Global/home.component");
var registration_component_1 = require("./User/registration.component");
var login_component_1 = require("./User/login.component");
var account_component_1 = require("./User/account.component");
var auth_guard_1 = require("./Global/auth.guard");
var routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'account', component: account_component_1.AccountComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'register', component: registration_component_1.RegistrationComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    {
        path: 'hero',
        loadChildren: 'app/Hero/hero.module#HeroModule',
        data: { preload: true },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'arena',
        loadChildren: 'app/Arena/arena.module#ArenaModule',
        data: { preload: true },
        canActivate: [auth_guard_1.AuthGuard]
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map