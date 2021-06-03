<template>
<div class="products">
    <div class="container">

        <div class="intro h-100">
            <div class="row h-100 align-items-center">
                <div class="col-md-6 ml-3">
                    <h3>Profile settings</h3>

                    <p>
                        Change your profile settings here
                    </p>
                </div>
                <div class="col-md-5">
                    <img src="/img/svg/profile.svg" width="300" alt="" class="img-fluid">
                </div>
            </div>
        </div>

        <div class="profile-content">

            <ul class="nav nav-pills ml-3" id="myTab" role="tablist">

                <li class="nav-item">
                    <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profile</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" id="account-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="false">Account settings</a>
                </li>

            </ul>

            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active pt-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                    <div class="container">
                        <div class="row">

                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" name="" v-model="profile.name" placeholder="Full name" class="form-control">
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" v-model="profile.phone" placeholder="Phone" class="form-control">
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="text" v-model="profile.address" placeholder="Address" class="form-control">
                                </div>
                            </div>

                            <div class="col-md-8">
                                <div class="form-group">
                                    <input type="text" v-model="profile.postCode" placeholder="Postcode" class="form-control">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <input type="submit" @click="updateProfile" value="Save Changes" class="btn btn-primary w-100">
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div class="tab-pane fade pt-3" id="account" role="tabpanel" aria-labelledby="account-tab">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-">
                                <div class="alert alert-info">
                                    Please use the Reset password email button for reseting the password. The form doens't work currently
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" v-model="account.name" placeholder="User name" class="form-control">
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="email" v-model="account.email" placeholder="Email address" class="form-control">
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="password" v-model="account.password" placeholder="New password" class="form-control">
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="password" v-model="account.confirmPassword" placeholder="Confirm password" class="form-control">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <input type="file" @change="uploadImage" class="form-control">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <input type="submit" value="Save Changes" @click="updateAccount" class="btn btn-primary w-100">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <input type="button" @click="resetPassword" value="Reset password email" class="btn btn-success w-100">
                                </div>
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
// import {
//     Toast
// } from 'bootstrap';
import {
    VueEditor
} from "vue2-editor";
import {
    fb,
    db
} from '../firebase';

export default {
    name: "profile",
    components: {
        VueEditor
    },
    props: {
        msg: String
    },
    data() {
        return {
            profile: {
                name: null,
                phone: null,
                address: null,
                postcode: null
            },
            account: {
                name: null,
                email: null,
                photoUrl: null,
                emailVerified: null,
                password: null,
                confirmPassword: null,
                uid: null
            }
        }
    },
    firestore() {
        let user = fb.auth().currentUser;
        return {
            profile: db.collection('profiles').doc(user.uid),
        }
    },
    methods: {
        resetPassword() {
            const auth = fb.auth();
            auth.sendPasswordResetEmail(auth.currentUser.email).then(() => {
                Toast.fire({
                    icon: 'success',
                    title: 'Email sent'
                })
            }).catch((error) => {
                console.log(error);
            });
        },
        updateProfile() {
            this.$firestore.profiles.update(this.profile)
                .then(() => {
                    Toast.fire({
                        icon: 'success',
                        title: 'updated successfully'
                    })
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        },
        uploadImage() {},
        updateAccount() {
            var user = fb.auth().currentUser;
            console.log(user);

            if (this.account.password !== "" && this.account.password !== null) {
                if (this.account.password == this.account.confirmPassword) {
                    user.updatePassword(this.account.password).then(() => {
                        if (this.account.email !== "" && this.account.email !== null) {
                            user.updateEmail(this.account.email).then(() => {
                                document.getElementsByClassName("user-role")[0].innerHTML = this.account.email;
                                Toast.fire({
                                    icon: 'success',
                                    title: 'email and password updated successfully'
                                })
                            }).catch((error) => {
                                Toast.fire({
                                    icon: 'error',
                                    title: error
                                })
                            });
                        } else {
                            Toast.fire({
                                icon: 'success',
                                title: 'password updated successfully'
                            });
                        }
                    }).catch((error) => {
                        Toast.fire({
                            icon: 'error',
                            title: error
                        })
                    });
                } else {
                    Toast.fire({
                        icon: 'warning',
                        title: 'failed to update: confirmed password does not match new password'
                    });
                }
            } else {
                if (this.account.email !== "" && this.account.email !== null) {
                    user.updateEmail(this.account.email).then(() => {
                        document.getElementsByClassName("user-role")[0].innerHTML = this.account.email;
                        Toast.fire({
                            icon: 'success',
                            title: 'email updated successfully'
                        })
                    }).catch((error) => {
                        Toast.fire({
                            icon: 'error',
                            title: error
                        })
                    });
                }
            }

            // user = fb.auth().currentUser;

            // if (this.account.email !== "" && this.account.email !== null) {
            //     user.updateEmail(this.account.email).then(() => {
            //         Toast.fire({
            //             icon: 'success',
            //             title: 'email updated successfully'
            //         }) // Update successful.
            //     }).catch((error) => {
            //         // An error happened.
            //         Toast.fire({
            //             icon: 'error',
            //             title: error
            //         })
            //     });
            // }

            // var newPassword = getASecureRandomPassword();

            // user.updateProfile({
            // displayName: "Jane Q. User",
            // photoURL: "https://example.com/jane-q-user/profile.jpg"
            // }).then(function() {
            // // Update successful.
            // }).catch(function(error) {
            // // An error happened.
            // });

        },
    },
    created() {
        // let user = fb.auth().currentUser

        // console.log("user info: ", user, "user uid: ", user.uid);

        // let docRef = db.collection("profiles").doc(user.uid);

        // docRef.get().then((doc) => {
        //     if (doc.exists) {
        //         // console.log("Document data:", doc.data());
        //         this.account.name = doc.data().name;
        //     } else {
        //         // doc.data() will be undefined in this case
        //         console.log("No such document!");
        //     }
        // }).catch((error) => {
        //     console.log("Error getting document:", error);
        // });

        // this.account.email = user.email;
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
</style>
