<template lang="html">
    <div class="user-view">
        <h2>File Viewer</h2>
        <ul>
            <li class="" v-for="(v,k) in filesObj.files">
                <label>
                    <input type="checkbox" :value="v.id" v-model="selectedFiles">
                    <span>{{v.name}}</span>
                </label>
            </li>
        </ul>

        <button v-on:click="selectAll">{{toggleFlag ? 'Unselect All': 'Select All'}}</button>
        <button v-on:click="deleteFiles">Delete</button>
    </div>
</template>

<script>
import Jquery from 'jquery'

function getData() {
    let userInfo = JSON.parse(localStorage['_delete-slack'])
    let reqData = {
        token: userInfo.access_token,
        user: userInfo.user_id
    }
    let url = 'https://slack.com/api/files.list'
    return new Promise((resolve, reject) => {
        Jquery.post(url, reqData, function(res) {
            if (res.ok) {
                resolve(res)
            } else {
                reject(res.error)
            }
        })
    })
}

export default {
    data() {
        return {
            filesObj: {},
            id: this.$route.params.id,
            selectedFiles: [],
            token: '',
            toggleFlag: false
        }
    },
    methods: {
        deleteFiles() {
            if (this.selectedFiles.length == 0) return false
            this.selectedFiles.forEach(v => {
                let data = {
                    file: v,
                    token: this.token
                }
                new Promise((resolve, reject) => {
                    Jquery.post('https://slack.com/api/files.delete', data, (res) => {
                        if (res) {
                            resolve('Delete Successfully!')
                        } else {
                            reject(new Error('Failed'))
                        }
                    })

                }).then(res => {
                    getData().then(res => {
                        this.filesObj = res
                    })
                })
            })
        },
        selectAll() {
            this.toggleFlag = !this.toggleFlag
            if (this.toggleFlag === false) {
                this.selectedFiles = []
            } else {
                this.filesObj.files.forEach(v => {
                    this.selectedFiles.push(v.id)
                })
            }
        }
    },
    watch: {
        '$route': function(to, from) {
            this.id = to.params.id
        }
    },
    mounted() {
        this.token = JSON.parse(localStorage['_delete-slack']).access_token
        getData().then((res) => {
            this.filesObj = res
        })

    }
}
</script>

<style lang="scss" scoped>
.user-view{
    ul {
        list-style: none;
        padding: 0;
        margin: 0 auto;
        width: 500px;
        li {
            color: #2aaeff;
            border: 1px solid #FFF;
            background: #FFF;
            border-radius: 5px;
            margin-bottom: 5px;
            label {
                display: flex;
                input {
                    flex: 1;
                    margin-left: 20px;
                }
                span {
                    flex: 7;
                }
            }
        }
    }
}
</style>
