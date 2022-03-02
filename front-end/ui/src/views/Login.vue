<template>
    <div class="container" id="app">
        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block">
                                <img src="../assets/logo.png">
                            </div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Benvenuto!</h1>
                                    </div>
                                    <form class="user">
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user"
                                                v-model="email" aria-describedby="emailHelp"
                                                placeholder="Inserire indirizzo email">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                                v-model="pwd" placeholder="Password">
                                        </div>
                                        <div v-if="auth_fail" class="alert alert-danger form-control-user" role="alert">
                                        {{danger_message}}
                                        </div>
                                        <div v-if="empty_input" class="alert alert-warning form-control-user" role="alert">
                                        {{error_message}}
                                        </div>
                                        <div v-if="subscribed" class="alert alert-success form-control-user" role="alert">
                                        Registrazione avvenuta con successo
                                        </div>
                                        <a @click="checkAuth" class="btn btn-primary btn-user btn-block">
                                            Login
                                        </a>
                                        <hr>
                                        <a @click="goToPwd" class="btn btn-danger btn-user btn-block">
                                            Password Dimenticata?
                                        </a>
                                        <a @click="goToRegister" class="btn btn-info btn-user btn-block">
                                            Crea Account
                                        </a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
  name: 'Login',
  data(){
    return{
        pwd: '',
        email: '',
        response: '',
        alert_message:'',
        error_message:'',
        danger_message: '',
        auth_fail : false,
        empty_input : false,
        subscribed : false,
    }
  },
  created(){
    if(localStorage.token != undefined &&  localStorage.token.length == 128){
      this.axios.get( process.env.VUE_APP_ROOT_API + '/user/auth', { headers: { Authorization: `Bearer ${localStorage.token}` }})
                .then((response) => {
                    if(response.status == 200)
                        this.$router.push('User')   
                })
    }
    if(this.$route.query.failed){
        this.auth_fail = true
        this.danger_message = 'Attenzione, devi riautenticarti!'
        setTimeout(() => this.auth_fail = false, 5000)
    }
    if(this.$route.query.subscribed){
        this.subscribed = true
        setTimeout(() => this.subscribed = false, 5000)
    }
  },
  methods:{
      checkAuth(){
        this.auth_fail = false
        if(this.email == '' || this.pwd == ''){
            this.empty_input = true
            this.error_message = 'Compilare tutti i campi!'
        }
        else{
          this.empty_input = false
          const data = {"mail":this.email, "pwd":this.pwd}
          this.axios
            .post( process.env.VUE_APP_ROOT_API + '/user/auth', data)
            .then(response => {
                if(response.status==200){
                    localStorage.token = response.data.token
                    localStorage.email = this.email
                    localStorage.name = response.data.name
                    localStorage.surname = response.data.surname
                    this.$router.push('User')
                }
            })
            .catch((error) => {
                if(error.response.status == 401){
                    this.danger_message = error.response.data.message
                    this.auth_fail = true

                }else if (error.response.status == 403){
                    this.error_message = error.response.data.message
                    this.empty_input = true
                }
            })
        }
      },
      gotoPwd(){
          this.$router.push('/Forgot-pwd')
      },
      goToRegister(){
          this.$router.push('/Register')
      }
  }
}
</script>

<style>
    img{
        width:50%
    }
</style>