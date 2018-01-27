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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var AppComponent = (function () {
    function AppComponent(http) {
        var _this = this;
        this.http = http;
        this.TEXT_DANGER = "text-danger";
        this.TEXT_SUCCESS = "text-success";
        this.employees = new Array();
        this.employee = new Employee();
        this.editToggle = new Array();
        this.responseMsg = " ";
        this.text_decoration = "";
        this.searchText = "";
        this.isAddButtonVisible = true;
        this.showToolTip = false;
        this.http.get("api/Employees").subscribe(function (x) {
            _this.employees = x.json();
            _this.setEditToggleValueToFalse();
        });
    }
    AppComponent.prototype.onClick = function () {
        var _this = this;
        this.http.post("api/Employees", this.employee).subscribe(function (x) {
            if (x.ok) {
                _this.employees.push(x.json());
                _this.editToggle.push(false);
                _this.text_decoration = _this.TEXT_SUCCESS;
                _this.responseMsg = "Added Successfully";
                _this.fadeToolTip();
            }
            else {
                _this.text_decoration = _this.TEXT_DANGER;
                _this.responseMsg = "Error adding";
                _this.fadeToolTip();
            }
        });
    };
    AppComponent.prototype.onDelete = function (emp) {
        var _this = this;
        this.editToggle[this.employees.indexOf(emp)] = false;
        this.http.delete("api/Employees/" + emp.Id).subscribe(function (x) {
            if (x.ok) {
                //console.log(emp);
                _this.employees.splice(_this.employees.indexOf(emp), 1);
                _this.editToggle.splice(_this.employees.indexOf(emp), 1);
                _this.text_decoration = _this.TEXT_SUCCESS;
                _this.responseMsg = "Deleted Successfully";
                _this.fadeToolTip();
                _this.editToggle[_this.employees.indexOf(emp)] = true;
                _this.isAddButtonVisible = true;
            }
            else {
                _this.text_decoration = _this.TEXT_DANGER;
                _this.responseMsg = "Error deleting";
                _this.fadeToolTip();
            }
        });
    };
    AppComponent.prototype.onEdit = function (emp) {
        this.isAddButtonVisible = false;
        this.setEditToggleValueToFalse();
        this.editToggle[this.employees.indexOf(emp)] = true;
        this.employee = emp;
    };
    AppComponent.prototype.updateChanges = function () {
        var _this = this;
        this.http.put("api/Employees/" + this.employee.Id, this.employee).subscribe(function (response) {
            if (response.ok) {
                _this.editToggle[_this.employees.indexOf(_this.employee)] = false;
                _this.isAddButtonVisible = true;
                _this.text_decoration = _this.TEXT_SUCCESS;
                _this.responseMsg = "Updated Successfully";
                _this.fadeToolTip();
                _this.employee = new Employee();
            }
            else {
                _this.text_decoration = _this.TEXT_DANGER;
                _this.responseMsg = "Error updating changes";
                _this.fadeToolTip();
            }
        });
    };
    AppComponent.prototype.searchTextChanged = function (searchText) {
        var _this = this;
        this.setEditToggleValueToFalse();
        this.http.get("api/Employees/search?name=" + searchText).subscribe(function (response) {
            _this.employees = response.json();
        });
    };
    //HELPER FUNCTION
    AppComponent.prototype.editToggleStatusForEmployee = function (employee) {
        var index = this.employees.indexOf(employee);
        return this.editToggle[index];
    };
    AppComponent.prototype.setEditToggleValueToFalse = function () {
        for (var i = 0; i < this.employees.length; i++)
            this.editToggle[i] = false;
    };
    AppComponent.prototype.fadeToolTip = function () {
        var _this = this;
        this.showToolTip = true;
        Rx_1.Observable.interval(3000).subscribe(function () {
            _this.showToolTip = false;
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: '../app/app.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
var Employee = (function () {
    function Employee() {
    }
    return Employee;
}());
//# sourceMappingURL=app.component.js.map