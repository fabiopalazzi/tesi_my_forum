<template>
    <!-- Div class content row -->
    <div class="justify-content-center">
        <!-- Card add post -->
        <div v-for="(p,index) in post" v-bind:key="p.post_id"  class="col-xl-12 col-md-12 mb-12" style="margin-bottom:10px;">
            <div class="card border-left-primary" @mouseover="focus(index)">
                <div class="card-body">
                    <div class="row" style="margin-bottom:10px;">
                        <img src="../assets/undraw_profile.svg" style="vertical-align:middle; margin-right:10px"/>
                        <h1 class="h4 mb-0 text-warning">@</h1>
                        <h1 class="h4 mb-0 text-warning" v-html="p.name"></h1>
                        <h1 class="h4 mb-0 text-warning" v-html="p.surname"></h1>
                    </div>
                    <div class="row">
                        <h1 class="h3 text-gray-800" id="title" v-html="p.title"></h1>
                    </div>
                    <div class="row">
                        <h1 class="h5 mb-0 text-blue-800">#</h1>
                        <h1 class="h5 mb-0 text-blue-800" id="topic" v-html="p.topic"></h1>
                    </div>
                    <hr>
                    <div class="row">
                        <h1 class="h5 mb-2 text-gray-800" v-html="p.description"></h1> <!-- buttarci utente e resto -->
                    </div>
                    <hr>
                    <div class="row">
                        <div class="card border-left-danger">
                            <div class="card-body">
                                <div class="row">
                                    <h2 class="h5 mb-0 text-gray-800" :id="'like_item_' + p.post_id">{{p.like_count}}</h2>
                                    <i class="fas fa-heart" @click="removeLike(p.post_id)" v-if="like[p.post_id] != null"></i>
                                    <i class="far fa-heart" @click="addLike(p.post_id)" v-if="like[p.post_id] == null"></i>
                                </div>
                            </div>
                        </div>
                        <div class="card border-left-warning">  
                            <div class="card-body">
                                <div class="row">
                                    <h2 class="h5 mb-0 text-gray-800">{{p.comment_count}}</h2>
                                    <i class="fas fa-comments" @click="changeCommentVisibility(p.post_id)" v-if="comment[p.post_id]"></i>
                                    <i class="far fa-comments" @click="loadComment(p.post_id)" v-if="!comment[p.post_id]"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="comment[p.post_id]">
                        <hr>
                        <div class="card border-left-success commentLoaded" v-for="c in comments[p.post_id]" :key="c.id">
                            <div class="card-body">
                                <div class="row">
                                    <img src="../assets/undraw_profile.svg" style="vertical-align:middle; margin-right:10px"/>
                                    <h1 class="h4 mb-0 text-warning" v-html="c.name"></h1>
                                    <h1 class="h4 mb-0 text-warning" v-html="c.surname"></h1>
                                </div>
                                <h1 class="h5 mb-2 text-gray-800" v-html="c.description"></h1>
                            </div>
                        </div>
                        <div class="card border-left-info">
                            <div class="card-body">
                                <div class="form-group">
                                    <textarea class="form-control" placeholder="Inserire un commento" :id="'new_comment_' + p.post_id" rows="3"></textarea>
                                    <button class="btn btn-success" id="addComment" @click="addComment(p.post_id)" >Aggiungi Commento</button>
                                </div>
                                <div class="alert alert-danger" v-if="error_request" role="alert">
                                Errore, riprova!
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

export default{
    data(){
        return{

            post:[],
            comments: [], //array of comments data
            comment: [], //array of boolean to manage button pressed
            like: [], //array boolean to manage like request
            ok_request: false,
            error_request: false,
            show_comment: true, //these two are getting from http request
        }
    },
    props:{
        searchText: String
    },
    watch:{
        searchText : function(){
            this.searchPost(0)
        }
    },
    mounted: function mounted () {
        this.searchPost(0)
    },
    methods:{
        focus(index){
            if(this.post.length % 10 == 0 && index == this.post.length - 1) //load dal penultimo
                this.searchPost(this.post.length)
        },
        searchPost(add_content){
            if(this.searchText==""){ //with empty value
                this.axios({
                    method: 'get',
                    url:  process.env.VUE_APP_ROOT_API + '/post/' + this.post.length,
                    headers: { Authorization: `Bearer ${localStorage.token}` }
                })
                .then((response) => {
                    if(add_content != 0){
                        this.post = this.post.concat(response.data)
                    }else{
                        this.post = response.data
                    }
                    for(var i=0; i<response.data.length; i++){
                        var post_id = response.data[i].post_id
                        this.comment[post_id] = false
                        this.like[post_id]= response.data[i].id_like
                        this.like[post_id]
                    }
                })
                .catch(() => alert("Errore, Riprova!"))
            }else{
                this.axios({
                    method: 'get',
                    url:  process.env.VUE_APP_ROOT_API + '/post/' + this.post.length + '/' +this.searchText,
                    headers: { Authorization: `Bearer ${localStorage.token}` }
                })
                .then((response) => {
                        if(add_content != 0){
                            this.post = this.post.concat(response.data)
                        }else{
                            this.post = response.data
                        }
                    for(var i=0; i<response.data.length; i++){
                        var post_id = response.data[i].post_id
                        this.comment[post_id] = false
                        this.like[post_id]= response.data[i].id_like
                    }
                })
            }
        },
        addComment(post_id){
            var description = document.getElementById('new_comment_' + post_id).value
            this.axios({
            method: 'post',
            url:  process.env.VUE_APP_ROOT_API + '/comment',
            data: {
                    "post_id": post_id,
                    "description": description
            },
            headers: { Authorization: `Bearer ${localStorage.token}` }
            })
            .then((response) => {
                if(response.status==200){
                    this.comments[post_id].push({
                        "name": localStorage.name,
                        "surname": localStorage.surname,
                        "description": description,
                        "id":99999,
                        "post_id": post_id
                    })
                document.getElementById('new_comment_' + post_id).value=''
                }
                else
                    this.error_request = true
            })
            .catch(() => this.error_request = true)

            //hide message
            if(this.error_request)
                setTimeout(()=>{
                    this.error_request = false
                }, 2000)
        },
        loadComment(post_id){
            this.axios({
            method: 'get',
            url:  process.env.VUE_APP_ROOT_API + '/comment/' + post_id,
            headers: { Authorization: `Bearer ${localStorage.token}` }
            })
            .then((response) => {
                if(response.status==200){
                    this.comments[post_id] = response.data
                    this.comment[post_id] = !this.comment[post_id]
                }
                else alert("Errore, Riprova")
            })
            .catch(() => alert("Errore, Riprova!"))
        },
        changeCommentVisibility(post_id){
            this.comment[post_id] = !this.comment[post_id]
        },
        addLike(post_id){
            this.axios({
                method: 'post',
                url:  process.env.VUE_APP_ROOT_API + '/like',
                data: {
                        "post_id": post_id
                },
                headers: { Authorization: `Bearer ${localStorage.token}` }
            })
            .then((response) => {
                if(response.status==200){
                    this.like[post_id] = response.data.insertId //salvo id 
                    var counter_like = document.getElementById('like_item_' + post_id)
                    counter_like.innerHTML = parseInt(counter_like.innerHTML) + 1
                }else{
                    alert("Errore, Riprova!")
                }
            })
            .catch(() => alert("Errore, Riprova"))
                
            setTimeout(()=>{
                this.error_request = false,
                this.ok_request = false
            }, 2000)   
        },
        removeLike(post_id){
            this.axios({
                method: 'delete',
                url:  process.env.VUE_APP_ROOT_API + '/like',
                data: {
                        "like_id": this.like[post_id]
                },
                headers: { Authorization: `Bearer ${localStorage.token}` }
            })
            .then((response) => {
                if(response.status==200){
                    this.like[post_id] = null //salvo id 
                    var counter_like = document.getElementById('like_item_' + post_id)
                    counter_like.innerHTML = parseInt(counter_like.innerHTML) - 1
                }
            })
            .catch(() => alert("Errore, Riprova"))        
        }
    }
}

</script>

<style scoped>
    hr{
        border: 1px solid gray;
        border-radius: 2px;
    }
    .d-flex{
        margin-top: 20px;
    }
    img{
        width:30px;
    }
    .card-body{
        margin-left:3px;
        margin-right:3px;
    }
    .commentLoaded{
        margin-bottom:3px;
    }
    .border-left-info{
        margin-top:10px;
    }
    h1{
        text-align:left;
        vertical-align:middle;
    }
    #topic{
        margin-left: 5px;
    }
    i{
        margin: 5px;
        vertical-align:middle;
    }
    .border-left-danger{
        margin-right: 10px;
    }
    #addComment{
        margin: 5px;
    }
</style>