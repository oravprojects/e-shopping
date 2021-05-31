<template>
<div class="products">
    <div class="container h-100">
        <div class="intro h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-md-6">
                    <h3>Products Page</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                        incidunt sed dignissimos quasi sunt! Molestiae, ipsam, reiciendis
                        obcaecati soluta porro minima qui unde sed deleniti nesciunt enim
                        velit tempora maiores.
                    </p>
                </div>
                <div class="col-md-6">
                    <img src="/img/svg/products.svg" alt="" class="img-fluid" />
                </div>
            </div>
        </div>
        <div class="products-test">
            <hr>
            <h3 class="d-inline-block">product list</h3>
            <button @click="addNew()" class="btn btn-primary float-right">add products</button>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>price</th>
                            <th>modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" v-bind:key="product.id">
                            <td>
                                {{product.name}}
                            </td>
                            <td>
                                {{product.price}}
                            </td>
                            <td>
                                <button @click="editProduct(product)" class="btn btn-primary">edit</button>
                                <button @click="deleteProduct(product)" class="btn btn-danger">delete</button>
                            </td>
                        </tr>
                        <!-- <tr v-for="product in products" :key="product.id">
                            <td>{{product.data().name}}</td>
                            <td>{{product.data().price}}</td>
                            <td>
                                <button @click="editProduct(product)" class="btn btn-primary">edit</button>
                                <button @click="deleteProduct(product.id)" class="btn btn-danger">delete</button>
                            </td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editLabel">Edit Product</h5>
                    <button @click="closeModal('#product')" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <div class="row">
                        <!-- main product -->
                        <div class="col-md-8">
                            <div class="form-group">
                                <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                            </div>

                            <!-- <div class="form-group">
                                <textarea name="description" class="form-control" v-model="product.description" placeholder="product description"></textarea>
                            </div> -->

                            <div class="form-group">
                                <vue-editor v-model="product.description"></vue-editor>
                            </div>
                        </div>
                        <!-- product sidebar -->
                        <div class="col-md-4">
                            <h4 class="display-6">Product Details</h4>
                            <hr>

                            <div class="form-group">
                                <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                            </div>

                            <div class="form-group">
                                <div class="tag" v-for="(tag, index) in product.tags" :key="'tag'+index">
                                    <span v-if="activeTag !== index" @click="activeTag = index">{{tag}}</span>
                                    <input v-else v-model="product.tags[index]" v-focus :style="{'width': tag.length + 'ch'}" @keyup.enter="activeTag = null" @blur="activeTag = null" />
                                    <span @click="removeTag(index)"><i class="fas fa-times-circle"></i></span>
                                </div>
                                <input type="text" @keydown.enter="addTag" placeholder="Product tags" v-model="tag" class="form-control">
                            </div>

                            <!-- <div class="form-group">
                                <input type="text" @keyup.188="addTag" placeholder="Product tags" v-model="tag" class="form-control">

                                <div class="d-flex">
                                    <p v-for="tag in product.tags" v-bind:key="tag.id">
                                        <span class="p-1">{{tag}}</span>
                                    </p>

                                </div>
                            </div> -->

                            <div class="form-group">
                                <label for="product_image">Product Images</label>
                                <input type="file" @change="uploadImage" class="form-control">
                            </div>

                            <div class="form-group d-flex img-container">
                                <div class="p-2" v-for="(image, index) in product.images" :key="index">
                                    <div class="img-wrap">
                                       <img :src="image" alt="" width="80px">
                                        <span class="delete-img" @click="removeImage(image, index)"><i class="fas fa-times-circle"></i></span> 
                                    </div>
                                </div>
                            </div>

                            <!-- <div class="form-group d-flex">
                                <div class="p-1" v-for="(image, index) in product.images" v-bind:key="index.id">
                                    <div class="img-wrapp">
                                        <img :src="image" alt="" width="80px">
                                        <span class="delete-img" @click="deleteImage(image,index)">X</span>
                                    </div>
                                </div>
                            </div> -->

                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button @click="closeModal('#product')" type="button" class="btn btn-secondary">close</button>
                    <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">save changes</button>
                    <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">apply changes</button>
                    <!-- <button @click="updateProduct()" type="button" class="btn btn-primary">Apply changes</button> -->
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <!-- <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="productTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="productLongTitle">Edit Product</h5>
                    <button @click="closeModal('#editProduct')" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <input type="text" placeholder="product name" v-model="product.name" class="form-control" />
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="price" v-model="product.price" class="form-control" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal('#product')">Close</button>
                    <button @click="updateProduct()" type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div> -->
</div>
</template>

<script>
import {
    VueEditor
} from "vue2-editor";
import {
    fb,
    db
} from "../firebase";

export default {
    name: "products",
    components: {
        VueEditor
    },
    props: {
        msg: String,
    },
    data() {
        return {
            products: [],
            product: {
                name: null,
                price: null,
                description: null,
                tags: [],
                images: []
            },
            activeItem: null,
            modal: null,
            tag: null,
            activeTag: null
        };
    },
    firestore() {
        return {
            products: db.collection('products'),
        }
    },
    methods: {
        closeModal(name) {
            $(name).modal('hide');
        },
        addTag() {
            if (!this.tag == "" || !this.tag == null) {
                this.product.tags.push(this.tag);
                this.tag = "";
                console.log(this.product.tags);
            }
        },
        removeTag(index) {
            this.product.tags.splice(index, 1);
        },
        addNew() {
            this.reset();
            this.modal = 'new';
            $('#product').modal('show');
        },
        // watcher() {
        //     db.collection("products").onSnapshot((querySnapshot) => {
        //         this.products = [];
        //         querySnapshot.forEach((doc) => {
        //             this.products.push(doc);
        //         });
        //         // console.log("Current products: ", products.join(", "));
        //     });
        // },
        editProduct(product) {
            this.modal = 'edit';
            // console.log(product);
            this.product = product;
            $('#product').modal('show');
        },
        updateProduct() {
            this.$firestore.products.doc(this.product.id).update(this.product);
            this.closeModal("#product");
            this.reset();
            Toast.fire({
                icon: 'success',
                title: 'updated successfully'
            })
            // var doc = db.collection("products").doc(this.activeItem);

            // // Set the "capital" field of the city 'DC'
            // return doc.update(this.product)
            //     .then(() => {
            //         console.log("Document successfully updated!");
            //         this.closeModal("#product");
            //         this.watcher();
            //         this.reset();
            //     })
            //     .catch((error) => {
            //         // The document probably doesn't exist.
            //         console.error("Error updating document: ", error);
            //         this.closeModal("#editProduct");
            //     });
        },
        deleteProduct(doc) {
            let id = (doc.id);
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                this.$firestore.products.doc(id).delete();
                if (result.isConfirmed) {
                    Toast.fire({
                        icon: 'success',
                        title: 'deleted successfully'
                    })
                    // Swal.fire(
                    //     'Deleted!',
                    //     'Your file has been deleted.',
                    //     'success'
                    // )
                }
            })
            // if (confirm("Are you sure?")) {
            //     db.collection("products").doc(doc).delete().then(() => {
            //         console.log("Document successfully deleted!");
            //         this.watcher();
            //     }).catch((error) => {
            //         console.error("Error removing document: ", error);
            //     });
            // }
        },
        readData() {
            // this.products = [];
            // db.collection("products").get().then((querySnapshot) => {
            //     querySnapshot.forEach((doc) => {
            //         // doc.data() is never undefined for query doc snapshots
            //         console.log(doc.id, " => ", doc.data());
            //         this.products.push(doc);
            //     });
            // });
        },
        addProduct() {
            this.$firestore.products.add(this.product);
            this.closeModal('#product');
            Toast.fire({
                icon: 'success',
                title: 'created successfully'
            })
        },
        reset() {
            // Object.assign(this.$data, this.$options.data.apply(this));
            this.product = {
                name: null,
                description: null,
                price: null,
                tags: [],
                images: []
                // tags: [],
                // images: []
            }
        },
        uploadImage(e) {
            if(e.target.files[0]){
                let file = e.target.files[0];
            var storageRef = fb.storage().ref('products/' + new Date().getTime() + '_' + file.name);
            let uploadTask = storageRef.put(file);
            uploadTask.on('state_changed',
                (snapshot) => {},
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        this.product.images.push(downloadURL);
                        console.log('File available at', downloadURL);
                    });
                }
            );

            // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            //     console.log('File available at', downloadURL);
            // });
            // storageRef.put(file).then((snapshot) => {
            //   console.log("this is snapshot: ", snapshot);
            // });
            // console.log(file);
            }          
        },
        removeImage(img, index) {
            let image = fb.storage().refFromURL(img);

            this.product.images.splice(index, 1);
            image.delete().then(function(){
                console.log("image deleted");
            }).catch(function(error){
                console.log("an error occurred");
            });
        }
    },
    created() {
        // this.readData();
    },
    directives: {
        focus: {
            inserted: (el) => {
                el.focus()
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.container {
    text-align: left;
}

.tag {
    float: left;
    padding: 3px 5px;

    display: flex;
    justify-content: center;
    cursor: pointer;

    &:hover {
        background-color: #baf8ab;
        border-radius: 5px;
    }

    span:first-child {
        margin-right: 3px;
    }

    i {
        color: #666;

        &:hover {
            color: #333;
        }
    }

    input {
        width: 100%;
        padding: 0;
        margin: 0;
        border: 0;
        outline: none;
        background-color: transparent;
    }
}

.img-container {
    display: flex;
    flex-wrap: wrap;
}
.img-wrap {
    position: relative;
    i {
        color: #666;

        &:hover {
            color: #333;
        }
    }
}
.img-wrap span.delete-img {
    position: absolute;
    top: -14px;
    // left: -2px;
}
.img-wrap span.delete-img:hover {
    cursor: pointer;
}
</style>
