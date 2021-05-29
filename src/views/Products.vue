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
                                <input type="text" placeholder="Product tags" v-model="product.tag" class="form-control">
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
                                <input type="file" @change="uploadImage()" class="form-control">
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
                tag: null,
                image: null
            },
            activeItem: null,
            modal: null
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
            let id = (doc[".key"]);
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
                tags: null,
                images: null
                // tags: [],
                // images: []
            }
        }
    },
    created() {
        // this.readData();
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.container {
    text-align: left;
}
</style>
