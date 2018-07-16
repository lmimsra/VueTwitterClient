<template>
    <div class="authentication">
        <!--<img src="../assets/logo.png">-->
        <div v-if="userData.name !==''" class="authentication__info">
            <div class="image"><img v-bind:src="userData.image"/></div>
            <div class="name">{{userData.name+"がログインしています"}}</div>
        </div>
        <button class="login" @click="login">ログイン</button>
    </div>
</template>

<script>
    // @ is an alias to /src
    import firebase from 'firebase'
    import setting from '../library/secret-keys'


    export default {
        name: 'home',
        data() {
            return {
                userData: {
                    name: '',
                    image: '',
                },
            }
        },
        methods: {
            login() {
                //ブラウザが瞬時のポップアップをブロックしてきた時、ログイン処理を行う
                //TODO:後ほどこの辺の処理は外部ライブラリ化させたい
                const provider = new firebase.auth.TwitterAuthProvider();
                firebase.auth().signInWithPopup(provider).then((result) => {
                    localStorage.setItem("TwimaUser",JSON.stringify(result));
                    this.userData.name = result.additionalUserInfo.profile.name;
                    this.userData.image = result.additionalUserInfo.profile.profile_image_url;
                }).catch((error) => {
                    console.log(error);

                });
            },
        },
        created: function () {
            if (!firebase.apps.length) {
                //firebaseインスタンスが存在しない場合画面起動時に作成
                firebase.initializeApp(setting);
                console.log("create fire base");
            }
            //念のため毎度コンソールにJsonは吐くようにしておく
            console.log(JSON.parse(localStorage.getItem("TwimaUser")));
            this.$store.dispatch('initializeUser');
            if (this.$store.getters.getUser == null) {
                //ユーザ情報の初期化に失敗した時は
                const provider = new firebase.auth.TwitterAuthProvider();
                firebase.auth().signInWithPopup(provider).then((result) => {
                    localStorage.setItem("TwimaUser",JSON.stringify(result));
                    this.$store.dispatch('setUser',result);
                    this.userData.name = result.additionalUserInfo.profile.name;
                    this.userData.image = result.additionalUserInfo.profile.profile_image_url;
                }).catch((error) => {
                    console.log(error);

                });
            }else {
                this.userData.name = this.$store.getters.getUser.name;
                this.userData.image = this.$store.getters.getUser.profile_image_url;
                console.log(this.$store.getters.getAccessKeys);
            }
        }
    }
</script>

<style scoped>
    .authentication {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .authentication__info {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }

    .image {
        margin-bottom: 20px;
    }

    .image img {
        border-radius: 50%;
    }

    .name {
        font-size: 14px;
    }

    button {
        appearance: none;
        border: none;
        margin: 0;
        padding: 0;
        background: transparent;
        cursor: pointer;
        outline: none;
    }

    .login {
        display: flex;
        justify-content: center;
        width: 150px;
        margin: 0px auto;
        padding: 10px 0;
        border: 1px solid #000000;
        transition: 0.3s;
    }

    .login:hover {
        border: 1px solid #FF0000;
        transition: 0.3s;
    }
</style>
