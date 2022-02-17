<template>
    <div class="container">

        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                <!-- Nested Row within Card Body -->
                <div class="row">
                    <div class="col-lg-5 d-none d-lg-block">
                        <img src="../assets/logo.png">
                    </div>
                    <div class="col-lg-7">
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Registrati!</h1>
                            </div>
                            <form class="user">
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="text" class="form-control form-control-user" v-model="name"
                                            placeholder="Nome">
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control form-control-user" v-model="surname"
                                            placeholder="Cognome">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-user" v-model="email"
                                        placeholder="Email">
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" class="form-control form-control-user"
                                            v-model="pwd" placeholder="Password">
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="password" class="form-control form-control-user"
                                            v-model="pwd2" placeholder="Reinserire Password">
                                    </div>
                                </div>
                                <div v-if="alert_message"  class="alert alert-warning form-control-user" role="alert">
                                    {{alert_message}}
                                </div>
                                
                                <a @click="register" class="btn btn-primary btn-user btn-block">
                                    Registrati
                                </a>
                                <hr>
                                <a @click="goToPwd" class="btn btn-danger btn-user btn-block">
                                    Password Dimenticata?
                                </a>
                                <a @click="goToLogin" class="btn btn-info btn-user btn-block">
                                    Accedi
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'Register',
  data(){
      return{
          name: '',
          surname: '',
          pwd2: '',
          pwd: '',
          email: '',
          alert_message: ''
      }
  },
  created(){
    if(localStorage.token.length == 128){
        this.axios.get('http://localhost:3000/api/user/auth', { headers: { Authorization: `Bearer ${localStorage.token}` }})
                    .then((response) => {
                        if(response.status == 200)
                            this.$router.push('User')   
                    })
        }
  },
  methods:{
      register(){
        if(this.pwd == '' || this.email == '' || this.name == '' || this.surname == '')
            this.alert_message = 'Attenzione compilare tutti i campi!'
        else if(this.pwd != this.pwd2)
            this.alert_message="Attenzione! Le password non coincidono"
        else{
            var data = {
                "mail": this.email,
                "pwd": this.pwd,
                "name": this.name,
                "surname": this.surname,
                "country": "Italy"
            }
            this.axios.post('http://localhost:3000/api/user/register', data)
                .then( response => {
                if(response.status==200) //subscribed
                    this.$router.push('Login?subscribed=true')
                })
                .catch( this.alert_message="Email già utilizzata")
        }
      },
      goToLogin(){
          this.$router.push('Login') 
      },
      gotoPwd(){
          this.router.push('Forgot-pwd')
      }
  }
}
</script>
