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
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var angular2_jwt_1 = require("angular2-jwt");
var angular2_jwt_2 = require("angular2-jwt");
var data_1 = require("../data");
var User = (function () {
    function User(id, username, email, state, last_login) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.state = state;
        this.last_login = last_login;
    }
    return User;
}());
exports.User = User;
var UserService = (function () {
    function UserService(http, authHttp) {
        this.http = http;
        this.authHttp = authHttp;
        this.headers = new http_2.Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
        });
        this.userUrl = data_1.url_base + 'user/'; //'app/test.json';
        this.options = new http_2.RequestOptions({ headers: this.headers });
        this.user = null;
    }
    UserService.prototype.registerUser = function (data) {
        return this.http.post(this.userUrl + 'register', data, { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    UserService.prototype.loginUser = function (data) {
        var body = new http_1.URLSearchParams();
        body.append('username', data.username);
        body.append('password', data.password);
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.userUrl + 'login_check', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UserService.prototype.infosUser = function () {
        return this.authHttp.get(this.userUrl + 'infosUser')
            .map(this.extractData)
            .catch(this.handleError);
    };
    UserService.prototype.changeMail = function (newMail) {
        return this.authHttp.post(this.userUrl + 'changeMail', { 'newMail': newMail }, { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    UserService.prototype.changePassword = function (newPassword) {
        return this.authHttp.post(this.userUrl + 'changePassword', { 'newPassword': newPassword }, { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    UserService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    UserService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = err.replace(/{|}|"/g, " ");
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    /* Acceso User */
    UserService.prototype.getUser = function () {
        return this.user;
    };
    UserService.prototype.setUser = function (user) {
        this.user = user;
    };
    UserService.prototype.logout = function () {
        localStorage.removeItem('token');
    };
    UserService.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, angular2_jwt_2.AuthHttp])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map