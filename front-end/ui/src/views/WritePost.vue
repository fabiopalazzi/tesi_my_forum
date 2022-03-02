<template>
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
            <li class="nav-item">
                <a class="nav-link" @click="this.$router.push('User')">
                    <i class="fas fa-paper-plane"></i>
                    <span>My Forum</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item active">
                <a class="nav-link">
                    <i class="fas fa-pencil-alt"></i>
                    <span>Crea Post</span></a>
            </li>
            <!-- Nav Item - Profile -->
            <li class="nav-item">
                <a class="nav-link" @click="this.$router.push('Profile')" >
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
                    <div class="center">
                        <!-- Content Row -->                        
                        <div class="d-flex justify-content-center">

                            <!-- Card add post -->
                            <div class="col-xl-8 col-md-9 mb-10">
                                <div class="card border-left-primary">
                                    <div class="card-header">
                                        Crea Post
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group">
                                            <input v-model.lazy="title" @click="resetAlert" type="text" class="form-control form-control-user" aria-describedby="titolo" placeholder="Inserire il titolo">
                                        </div>
                                        <div class="form-group">
                                            <select class="custom-select mr-sm-2" @click="resetAlert" v-model="topic">
                                                <option v-for="topic in topics" :key="topic" :value="topic.en">
                                                    {{topic.ita}}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <textarea class="form-control form-control-user" @click="resetAlert" v-model="content" rows="8" placeholder="Inserire la descrizione"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <button class="btn btn-primary" @click="addPost">
                                                Aggiungi Post
                                            </button>
                                        </div>
                                        <div class="form-group">
                                            <div v-if="ok_request" class="alert alert-success" role="alert">
                                            Post aggiunto con successo!
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div v-if="error_request" class="alert alert-danger" role="alert">
                                            {{error_message}}
                                        </div>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            <!-- End of Footer -->
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
        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->
</template>


<script>
export default {
    name: 'WritePost',
    data(){
        return{
            name: '',
            surname: '',
            message: '',
            toggled: true,
            ok_request : false,
            error_request : false,
            error_message: '',
            title: '',
            content: '',
            topic: '',
            topics: [
                {en:'Music', ita:'Musica'},
                {en:'Work',ita:'Lavoro'},
                {en:'Food',ita:'Cibo'},
                {en:'Love', ita:'Amore'}, 
                {en:'Nature', ita:'Natura'},
                {en:'Sport', ita:'Sport'},
                {en:'Money',ita:'Soldi'},
                {en:'Shopping', ita:'Shopping'},
                {en:'Television', ita: 'Televisione'}
            ]
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
                this.$router.push('Login?failed=true')
            }
        this.surname = localStorage.surname
        this.name = localStorage.name
    },
    methods:{
        logout(){
            this.axios.delete( process.env.VUE_APP_ROOT_API + '/user/auth', { headers: { Authorization: `Bearer ${localStorage.token}` }})
            localStorage.token = ''
            this.$router.push('login')
        },
        resetAlert(){
            this.ok_request = false
            this.error_request = false
        },
        checkSidebar(){
          this.toggled = !this.toggled
        },
        addPost(){
            this.axios({
                method: 'post',
                url:  process.env.VUE_APP_ROOT_API + '/post',
                headers: { Authorization: `Bearer ${localStorage.token}` },
                data: {
                    "title": this.title,
                    "topic": this.topic,
                    "description": this.content
                }
            })
            .then((response) => {
                if(response.status==200)
                    this.ok_request = true
            })
            .catch((error) => {
                this.error_request = true
                this.error_message = error.response.data.message  
            })
        }
    }
}
</script>

<style scoped>
    .card-header{
        background-color: #2c9cff
    }
</style>