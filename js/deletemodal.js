export default{
    template:`<div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 id="exampleModalLabel" class="modal-title">
                            <span>刪除產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除
                        <strong class="text-danger" >{{delProduct.title}}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                            取消
                        </button>
                        <button type="button" class="btn btn-danger" @click="deleteProduct">
                            確認刪除
                        </button>
                    </div>
                </div>
            </div>`,
    props:['delProduct','user'],
    data(){
        return{
        
        }
    },
    methods:{
    deleteProduct(){
        
        let url = `${this.user.path}/${this.user.uuid}/admin/ec/product/${this.delProduct.id}`
        axios.delete(url).then()
        this.$emit("update")
    }
}
}