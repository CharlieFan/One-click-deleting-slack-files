<template lang="html">
    <div class="home">
        <p>Click to Get Started</p>
        <button class="btn-auth" type="button" @click="goToAuth" v-if="!query.code">Get Started</button>
    </div>
</template>

<script>
import TokenIssue from '../utils/issueToken.js'

export default {
    computed: {
        query() {
            return this.$route.query
        }
    },
    methods: {
        goToAuth() {
            let id = 'YOUR TEAM APP ID'
            let redirectUri = encodeURIComponent('http://localhost:8080/#/home')
            window.location.href = `https://slack.com/oauth/authorize?client_id=${id}&scope=files:read files:write:user&redirect_uri=${redirectUri}`
        }
    },
    created() {
        if (this.query.code) {
            console.log('now we can get token')
            let reqData = {
                client_id: 'YOUR TEAM APP client_id',
                client_secret: 'YOUR TEAM APP client_secret',
                code: this.query.code,
            }
            let reqUrl = 'https://slack.com/api/oauth.access'

            TokenIssue(reqUrl, reqData).then((res) => {
                let userId = res.user_id
                res = JSON.stringify(res)
                localStorage.setItem('_delete-slack', res)
                this.$router.push({path: `/user/${userId}`})
            })

        } else {
            console.log('we should let user authorize first')
            return false
        }
    }
}
</script>

<style lang="scss">
.home{
    padding: 30px 0;
    width: 100%;
    position: absolute;

    p {
        font-size: 20px;
        color: #FFF;
    }

    .btn-auth {
        width: 200px;
        height: 200px;
        box-sizing: border-box;
        border: none;
        color: #dcdcdc;
        border-radius: 50%;
        background: #3A3B40;
        cursor: pointer;

        &:hover{
            color: #2aaeff;
            background: #DCDCDC;
        }
    }
}
</style>
