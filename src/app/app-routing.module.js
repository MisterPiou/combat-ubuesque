"use strict";
var routes = [
    { path: '', redirectTo: '/hero', pathMatch: 'full' },
    { path: 'hero', component: HeroComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map