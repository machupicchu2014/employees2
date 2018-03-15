var app = new Vue({
  el: '#app',
  data: {
    name: '',
    tempName: '',
    email: '',
    job: '',
    salary: '',
    notes: '',
    id: 0,
    employees: [],
    editing: true,
    adding: true,
    header: 'New Employee',
    about: false,
    buttonTitle: "Edit",
  },
  created: function(){
    this.getEmployees();
  },
  methods: {
    save: function(){
      if(this.name === ''){
        window.alert("You have to enter a name.");
      } else {
      axios.post("/api/employees", {
        name: this.name,
        email: this.email,
        job: this.job,
        salary: this.salary,
        notes: this.notes
      }).then(response => {
        this.name = '';
        this.email = '';
        this.job = '';
        this.salary = '';
        this.notes = '';
        this.getEmployees();
      }).catch(err => {
      });
    }
  },
  select: function(item){
    for(var x = 0; x < this.employees.length; x++){
      if(this.employees[x].name == item){
        this.name = this.employees[x].name;
        this.email = this.employees[x].email;
        this.job = this.employees[x].job;
        this.salary = this.employees[x].salary;
        this.notes = this.employees[x].notes;
        this.id = this.employees[x].id;
        this.editing = false;
        this.adding = false;
        this.header = "Person Details";
        this.buttonTitle = "Edit";
      }
    }
  },
  edit: function(){
    if(this.editing){
      if(this.name === ''){
        window.alert("You have to enter a name.");
      } else {
        this.editing = false;
        axios.put("/api/employees/" + this.id, {
          name: this.name,
          email: this.email,
          job: this.job,
          salary: this.salary,
          notes: this.notes
        }).then(response => {
          this.getEmployees();
          this.editing = false;
          this.adding = false;
          this.header = "Person Details"
          this.buttonTitle = "Edit";
        }).catch(err => {
        });
      }
    } else {
      this.tempName = this.id;
      this.editing = true;
      this.header = "Editing"
      this.buttonTitle = "Save"
    }
  },
  deletePerson: function(){
    axios.delete("/api/employees/" + this.id).then(response => {
      this.getEmployees();
      this.newEmployee();
    }).catch(err =>{
    });
  },
  newEmployee: function(){
  this.name = '';
  this.email = '';
  this.job = '';
  this.salary = '';
  this.notes = '';
  this.editing = true;
  this.adding = true;
  this.header = "New Employee"
},
setAbout: function(){
  this.about = true;
},
leaveAbout: function(){
  this.about = false;
},
getEmployees: function(){
  axios.get("/api/employees").then(response => {
    console.log(response.data);
    this.employees = response.data;
    return true;
  }).catch(err => {
  });
}
}
});

Vue.config.devtools = true;
