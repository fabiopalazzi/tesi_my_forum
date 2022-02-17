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
                <li class="nav-item  active">
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
                <li class="nav-item">
                    <a class="nav-link" @click="this.$router.push('Profile')">
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
                                    <span class="mr-2 d-lg-inline text-gray-600 small">{{name}} {{surname}}</span>
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

                            <!-- Import here Search post component-->
                            <div class="input-group mb-3 col-xl-12 col-md-12 mb-12">
                                <input type="text" v-model.lazy="searchedText" class="form-control" placeholder="Filtra per categoria, utente, post" aria-label="" aria-describedby="basic-addon1">
                                <div class="input-group-prepend">
                                    <button class="btn btn-success" type="button">Cerca</button>
                                </div>
                            </div>
                        </div>

                        <!-- Begin Post Content -->
                        <postsection v-bind:searchText="searchedText"></postsection>
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
import Post from '@/components/Post'
export default {
  name: 'User',
  data(){
      return{
          toggled:true,
          name: '',
          surname: '',
          searchedText: ''
      }
  },
  created(){
      if(localStorage.token.length == 128){
        this.axios.get('http://localhost:3000/api/user/auth', { headers: { Authorization: `Bearer ${localStorage.token}` }})
                    .catch(() => 
                        {
                            this.$router.push('Login?failed=true')   
                        }
                    )
      }else{
          this.$router.push('Login?failed=true')
      }

  },
  mounted(){
      this.name = localStorage.name
      this.surname = localStorage.surname
  },
  methods: {
      //logout and delete token
    logout(){
        this.axios.delete('http://localhost:3000/api/user/auth', { headers: { Authorization: `Bearer ${localStorage.token}` }})
        localStorage.token = ''
        this.$router.push('login')
    },
    checkSidebar(){
        this.toggled = !this.toggled
    }
  }, 
  components:{
      postsection : Post
  }
}
</script>