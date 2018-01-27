import { Component} from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Rx';


@Component({
    selector: 'my-app',
    templateUrl: '../app/app.html'
})
export class AppComponent {
    TEXT_DANGER: string = "text-danger";
    TEXT_SUCCESS: string = "text-success";

    employees: Employee[] = new Array<Employee>();
    employee: Employee = new Employee();

    editToggle: boolean[] = new Array<boolean>();

    responseMsg: string = " "; 
    text_decoration: string = "";
    searchText: string = "";

    isAddButtonVisible: boolean = true;
    showToolTip: boolean = false;

    constructor(public http: Http) {
        this.http.get("api/Employees").subscribe((x) => {
            this.employees = x.json();
            this.setEditToggleValueToFalse()
           
        });

        
    }

    onClick() {
        this.http.post("api/Employees", this.employee).subscribe((x) => {
            if (x.ok) {
                this.employees.push(x.json());
                this.editToggle.push(false);
                this.text_decoration = this.TEXT_SUCCESS;
                this.responseMsg = "Added Successfully";
                this.fadeToolTip();
            }
            else {
                this.text_decoration = this.TEXT_DANGER;
                this.responseMsg = "Error adding";
                this.fadeToolTip();
            }
                
        });
    }

    onDelete(emp: Employee) {
        this.editToggle[this.employees.indexOf(emp)] = false;

        this.http.delete("api/Employees/" + emp.Id).subscribe((x) => {
            if (x.ok) {
                //console.log(emp);
                this.employees.splice(this.employees.indexOf(emp), 1);

                this.editToggle.splice(this.employees.indexOf(emp), 1);

                this.text_decoration = this.TEXT_SUCCESS;
                this.responseMsg = "Deleted Successfully";
                this.fadeToolTip();

                this.editToggle[this.employees.indexOf(emp)] = true;
                this.isAddButtonVisible = true;
            }
            else {
                this.text_decoration = this.TEXT_DANGER;
                this.responseMsg = "Error deleting"
                this.fadeToolTip();
            }
        });
       
    }

    onEdit(emp: Employee) {
        this.isAddButtonVisible = false;

        this.setEditToggleValueToFalse();

        this.editToggle[this.employees.indexOf(emp)] = true;

        this.employee = emp;
    }

    updateChanges() {
        this.http.put("api/Employees/" + this.employee.Id, this.employee).subscribe(
            (response) => {
                if (response.ok) {
                    this.editToggle[this.employees.indexOf(this.employee)] = false;
                    this.isAddButtonVisible = true;
                    this.text_decoration = this.TEXT_SUCCESS;
                    this.responseMsg = "Updated Successfully";
                    this.fadeToolTip();

                    this.employee = new Employee();
                }
                else {
                    this.text_decoration = this.TEXT_DANGER;
                    this.responseMsg = "Error updating changes";
                    this.fadeToolTip();
                }
            }
        );
    }

    searchTextChanged(searchText: string) {
        this.setEditToggleValueToFalse();
        this.http.get("api/Employees/search?name=" + searchText).subscribe((response) => {
            this.employees = response.json();
        });
    }

    //HELPER FUNCTION
    editToggleStatusForEmployee(employee: Employee) {
        var index = this.employees.indexOf(employee);
        return this.editToggle[index];
    }

    setEditToggleValueToFalse() {
        for (var i = 0; i < this.employees.length; i++)
            this.editToggle[i] = false;
    }
    
    fadeToolTip() {
        this.showToolTip = true;
        Observable.interval(3000).subscribe(() => {
            this.showToolTip = false;
        });
    }
}
class Employee {
    Id: number;
    Name: string;
    Address: string;
}