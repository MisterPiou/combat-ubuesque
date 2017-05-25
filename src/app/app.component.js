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
var error_service_1 = require("./Global/error.service");
var AppComponent = (function () {
    function AppComponent(errorService) {
        var _this = this;
        this.errorService = errorService;
        this.etatMsgBox = 'errMsg';
        this.subscription = errorService.errorMessage$.subscribe(function (errorMessage) {
            _this.errorMessage = errorMessage;
            _this.activeErrorMessage();
        });
    }
    AppComponent.prototype.activeErrorMessage = function () {
        var _this = this;
        this.etatMsgBox = 'errMsgActive';
        this.interval = setInterval(function () { _this.inactiveErrorMessage(); }, 3500);
    };
    AppComponent.prototype.inactiveErrorMessage = function () {
        this.etatMsgBox = 'errMsgInactive';
        clearInterval(this.interval);
        //this.interval = setInterval(() => {this.endErrorMessage(); }, 500);
    };
    AppComponent.prototype.endErrorMessage = function () {
        this.etatMsgBox = 'errMsg';
        clearInterval(this.interval);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
    }),
    __metadata("design:paramtypes", [error_service_1.ErrorService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map