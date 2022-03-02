<template> 
    <div>
        <div id="wrapper">

            <!-- Sidebar -->
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" :class="{ 'toggled' : toggled == true}" id="accordionSidebar">

                <!-- Sidebar - Brand -->
                <a class="sidebar-brand d-flex align-items-center justify-content-center">
                    <div class="sidebar-brand-icon rotate-n-15">
                        <i class="fab fa-forumbee"></i>
                    </div>
                    <div class="sidebar-brand-text mx-3 active"><sup>My Forum</sup></div>
                </a>

                <!-- Divider -->
                <hr class="sidebar-divider my-0">

                <!-- Nav Item - MyForum -->
                <li class="nav-item" @click="this.$router.push('User')">
                    <a class="nav-link">
                        <i class="fas fa-paper-plane"></i>
                        <span>My Forum</span></a>
                </li>

                <!-- Divider -->
                <hr class="sidebar-divider">

                <!-- Nav Item - Creation Post -->
                <li class="nav-item">
                    <a class="nav-link" @click="this.$router.push('Write')">
                        <i class="fas fa-pencil-alt"></i>
                        <span>Crea Post</span></a>
                </li>
                <!-- Nav Item - Profile -->
                <li class="nav-item active">
                    <a class="nav-link" >
                        <i class="fas fa-user"></i>
                        <span>Profilo</span></a>
                </li>
            </ul>
            <!-- End of Sidebar -->

            <!-- Content Wrapper -->
            <div id="content-wrapper" class="d-flex flex-column">

                <!-- Main Content -->
                <div id="content">

                    <!-- Topbar -->
                    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                        <!-- Sidebar Toggle (Topbar) -->
                        <button id="sidebarToggleTop" class="btn btn-link rounded-circle mr-3" @click="checkSidebar">
                            <i class="fa fa-bars"></i>
                        </button>

                        <!-- Topbar Navbar -->
                        <ul class="navbar-nav ml-auto">
                                
                            <!-- Nav Item - User Information -->
                            <li class="nav-item dropdown no-arrow">
                                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="mr-2 d-lg-inline text-gray-600 small" v-html="name"></span>
                                    <span class="mr-2 d-lg-inline text-gray-600 small" v-html="surname"></span>
                                    <img class="img-profile rounded-circle"
                                        src="../assets/undraw_profile.svg">
                                </a>
                                <!-- Dropdown - User Information -->
                                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="userDropdown">
                                    <a class="dropdown-item" href="#/Profile">
                                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Profile
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" @click="logout" data-toggle="modal" data-target="#logoutModal">
                                        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Logout
                                    </a>
                                </div>
                            </li>

                        </ul>

                    </nav>
                    <!-- End of Topbar -->

                    <!-- Begin Page Content -->
                    <div class="container-fluid">

                        <!-- Content Row -->                        
                        <div class="d-flex justify-content-center">

                            <div class="col-lg-7">
                                <div class="p-7">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Aggiorna il tuo profilo!</h1>
                                    </div>
                                    <br>
                                    <form class="user">
                                        <!-- Name -->
                                        <div class="form-group row">
                                            <div class="col-sm-7 mb-sm-2">
                                                <input type="text" class="form-control form-control-user" v-html="name" v-model="name" @click="this.name_success=false; this.name_error=false"
                                                    placeholder="Nome">
                                            </div>
                                            <div class="col-sm-5 mb-sm-2">
                                                <button type="button" class="btn btn-primary btn-user btn-block" @click="updateName()">Aggiorna Nome</button>
                                            </div>
                                        </div>
                                        <!-- Name alerts -->
                                        <div class="form-group" v-if="name_success || name_error">
                                            <div class="alert alert-success btn-user btn-block" v-if="name_success" role="alert">
                                            Nome cambiato con successo
                                            </div>
                                        </div>
                                        <div>
                                            <div class="alert alert-danger btn-user btn-block" v-if="name_error" role="alert">
                                            Errore, riprova!
                                            </div>
                                        </div>
                                        <!-- Surname -->
                                        <div class="form-group row">
                                            <div class="col-sm-7 mb-sm-2">
                                                <input type="text" class="form-control form-control-user" v-html="surname" v-model="surname" @click="this.surname_success=false; this.surname_error=false"
                                                    placeholder="Cognome">
                                            </div>
                                            <div class="col-sm-5 mb-sm-2">
                                                <button type="button" class="btn btn-primary btn-user btn-block" @click="updateSurname()">Aggiorna Cognome</button>
                                            </div>
                                        </div>
                                        <!-- Surname Alerts -->
                                        <div class="form-group" v-if="surname_success || surname_error">
                                            <div class="alert alert-success btn-user btn-block" v-if="surname_success" role="alert">
                                            Cognome cambiato con successo
                                            </div>
                                        </div>
                                        <div>
                                            <div class="alert alert-danger btn-user btn-block" v-if="surname_error" role="alert">
                                            Errore, riprova!
                                            </div>
                                        </div>
                                        <!-- Pwd -->
                                        <div class="form-group row">
                                            <div class="col-sm-6 mb-sm-2">
                                                <input type="password" class="form-control form-control-user" v-model="old_pwd" placeholder="Password Corrente" @click="this.general_pwd_error=false; this.pwd_success=false; this.old_pwd_error=false">
                                            </div>
                                            <div class="col-sm-6 mb-sm-2">
                                                <input type="password" class="form-control form-control-user" v-model="new_pwd" placeholder="Nuova Password" @click="this.general_pwd_error=false; this.pwd_success=false; this.old_pwd_error=false">
                                            </div>
                                            <div class="col-sm-12 mb-sm-2">
                                                <button type="button" class="btn btn-warning btn-user btn-block" @click="updatePwd()">Cambia Password</button>
                                            </div>
                                        </div>
                                        <!-- Pwd Alerts -->
                                        <div class="form-group" v-if="general_pwd_error || pwd_success || old_pwd_error">
                                            <div class="alert alert-success btn-user btn-block" v-if="pwd_success" role="alert">
                                            Password cambiata con successo
                                            </div>
                                        </div>
                                        <div>
                                            <div class="alert alert-danger btn-user btn-block" v-if="general_pwd_error" role="alert">
                                            Errore, riprova!
                                            </div>
                                        </div>
                                        <div>
                                            <div class="alert alert-danger btn-user btn-block" v-if="old_pwd_error" role="alert">
                                            La password inserita non è valida
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End of Main Content -->

                <!-- Footer -->
                <footer class="sticky-footer bg-white">
                    <div class="container my-auto">
                        <div class="copyright text-center my-auto">
                            <span>Copyright &copy; MyForum 2022</span>
                        </div>
                    </div>
                </footer>
                <!-- End of Footer -->

            </div>
            <!-- End of Content Wrapper -->

        </div>
        <!-- End of Page Wrapper -->

        <!-- Scroll to Top Button-->
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>
    </div>
</template>

<script>
export default {
  name: 'User',
  data(){
      return{
          toggled:true,
          name: '',
          surname: '',
          name_success: false,
          name_error: false,
          surname_success: false,
          surname_error: false,
          old_pwd: '',
          new_pwd: '',
          pwd_success: false,
          general_pwd_error: false,
          old_pwd_error: false

      }
  },
  created(){
      if(localStorage.token != undefined && localStorage.token.length == 128){
        this.axios.get( process.env.VUE_APP_ROOT_API + '/user/auth', { headers: { Authorization: `Bearer ${localStorage.token}` }})
                .catch(() => 
                    {
                        this.$router.push('Login?failed=true')   
                    }
                )
      }else{
          this.$router.push('Login')
      }
  },
  mounted(){
      this.name = localStorage.name
      this.surname = localStorage.surname
  },
  methods: {
      //logout and delete token
      logout(){
          this.axios.delete( process.env.VUE_APP_ROOT_API + '/user/auth', { headers: { Authorization: `Bearer ${localStorage.token}` }})
          localStorage.token = ''
          this.$router.push('login')
      },
      checkSidebar(){
          this.toggled = !this.toggled
      },
      updateName(){
          this.axios({
            method: 'put',
            url:  process.env.VUE_APP_ROOT_API + '/user/name',
            data: {
                    "name": this.name,
            },
            headers: { Authorization: `Bearer ${localStorage.token}` }
            })
            .then((response) => {
                if(response.status==200){
                    this.name_success = true
                    localStorage.name = this.name
                }
                else this.name_error = true
            })
            .catch((error) => {
                if(error) this.name_error = true
            })
      },
      updateSurname(){
          this.axios({
            method: 'put',
            url:  process.env.VUE_APP_ROOT_API + '/user/surname',
            data: {
                    "surname": this.surname,
            },
            headers: { Authorization: `Bearer ${localStorage.token}` }
            })
            .then((response) => {
                if(response.status==200){
                    this.surname_success = true
                    localStorage.surname = this.surname
                }
                else this.surname_error = true
            })
            .catch((error) => {
                if(error) this.surname_error = true
            })
            if(this.surname_success) setTimeout(()=>{this.surname_success=false}, 3000)
            if(this.surname_error) setTimeout(()=>{this.surname_error=false}, 3000)
      },
      updatePwd(){ //check old password and save the new
          this.axios({
            method: 'put',
            url:  process.env.VUE_APP_ROOT_API + '/user/pwd',
            data: {
                    "old_pwd": this.old_pwd,
                    "new_pwd": this.new_pwd
            },
            headers: { Authorization: `Bearer ${localStorage.token}` }
            })
            .then((response) => {
                if(response.status==200) this.pwd_success = true
                else if (response.status == 301) this.old_pwd_error = true
                else this.general_pwd_error = true
            })
            .catch((error) => {
                if(error) this.old_pwd_error = true
            })
            if(this.pwd_success) setTimeout(()=>{this.pwd_success=false}, 3000)
            if(this.old_pwd_error) setTimeout(()=>{this.old_pwd_error=false}, 3000)
            if(this.general_pwd_error) setTimeout(()=>{this.general_pwd_error=false}, 3000)
      }
  }
}
</script>
<style scoped>
    .col-sm-7, .col-sm-6{
        margin-bottom:3px;
    }
    .text-center{
        margin-bottom:20px;
    }
</style>