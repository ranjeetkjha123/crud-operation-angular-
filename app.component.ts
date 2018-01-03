import { Component ,OnInit } from '@angular/core';
import { AppModel } from './app.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Getting and Posting Data to Server in Angular 2 using Observable';
  description = "This application implement how to get data from and post data to backend server using Angular 2 framework";
  courses = [];
  errorMsg :string;
  errorFlag: boolean = false;
  defaultCourseCredit:string = "1";
  alldata:AppModel[]=[];

  constructor(private appService:AppService ){
}
    fetchCourseData() {
    this.appService.getCourses()
     .subscribe(  
                  (data: AppModel[]) => {  this.courses = data; },
                 (error) =>  {this.errorMsg = error; this.errorFlag = true}
                )
            
    }


    addCourse(course: AppModel) {
    this.appService.createCourse(course)
                   .subscribe(
                              (course)  => {this.courses.push(course)},
                              (error) =>  {this.errorMsg = error}
                          
                     );
                
}

    deleteStatus(course:AppModel){
 
    this.appService.deleteTask(course)
 
    .subscribe(
 
     (data:any)=>{
 
      this.alldata.splice(this.alldata.indexOf(course),1);
      this.fetchCourseData(); 
      },
 
      function(error){
 
      console.log(error);
 
      },
	  function(){
       this.fetchCourseData(); 
       console.log('completed');
 
     }
 
    
     );
 
    }
	updateStatus(course:AppModel){
    this.appService.editTask(course)
  .subscribe(
    (data:any)=>{
      
    },
    function(error){
      console.log(error);
    },
    function(){
      alert('Edited successfully');
    }
  );
}

  
 
  ngOnInit(){
    this.fetchCourseData(); 
  }
  
}
