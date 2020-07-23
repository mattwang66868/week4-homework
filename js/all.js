import pagination from './pagination.js';
import modal from './modal.js';
import deletemodal from './deletemodal.js';

Vue.component('pagination',pagination)
Vue.component('modal',modal)
Vue.component('deletemodal',deletemodal)

var app = new Vue({
    el: '#app',
    data:{
        products: [],
        pagination:{},
        tempProduct:{ 
            imageUrl:[]
        },
        api: {
            
            uuid: '71a05497-9279-4af4-a348-48c8c33eca99',
            path:'https://course-ec-api.hexschool.io/api'
        },
        token: '',
        adjustment:'',
        loadingBtn:'',
        status: {
            fileUploading: false,
          },
    },
    methods:{
      
      
        openModal(adjustment,item){     //"建立新產品" "編輯" "刪除"這些按鈕都有綁定此打開bs4 modal監聽事件，有以下三種情況 'new' 'edit' 'delete'
          switch(adjustment){
            case 'new':           //這是建立新產品的情況
            this.adjustment = 'new'
            
              this.tempProduct = {
                imageUrl:[]
              };
              $('#productModal').modal('show');
              break;

            case 'edit':        //這是編輯的情況
              this.adjustment = 'edit';
              
              this.loadingBtn = item.id ; 
              const url=`${this.api.path}/${this.api.uuid}/admin/ec/product/${item.id}`;
              axios.get(url).then(res =>{
                    this.tempProduct = res.data.data;       
                    $('#productModal').modal('show');     
                    this.loadingBtn = '' ;     
                })
              
              break;

            case 'delete':      //這是刪除的情況
                const deleteurl=`${this.api.path}/${this.api.uuid}/admin/ec/product/${item.id}`;
                axios.get(deleteurl).then(res =>{
                    this.tempProduct = res.data.data;       
                    $('#delProductModal').modal('show');     
                        
                })   
                break;

            default:
              break;
          }
          
          
        },
        
        getProducts(num = 1){
            const url = `${this.api.path}/${this.api.uuid}/admin/ec/products?page=${num}`;
            axios.get(url).then(res=>{
               
                this.products = res.data.data;
                this.pagination = res.data.meta.pagination;
                if(this.tempProduct.id){
                    this.tempProduct ={
                        imageUrl:[]
                    };
                    $('#productModal').modal('hide');
                    $('#delProductModal').modal('hide'); 
                }else{
                    this.tempProduct ={
                        imageUrl:[]
                    };
                    $('#productModal').modal('hide');
                }
                
            })
        }
    },
    created(){
        this.token =  document.cookie.replace(/(?:(?:^|.*;\s*)hexHomeToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] =`Bearer ${this.token}`
        this.getProducts();
           
    }
    
});

