import $ from 'jquery'
import Api from './api.js'
const mmfTokens = [
    'YOUR TOKEN HERE'
]

function getUserId (data) {
    let promise = new Promise((resolve, reject) => {
        $.get(Api.getIdByToken, data, function(res) {
            if (res) {
                resolve(res.user_id)
            } else {
                reject(new Error('Failed'))
            }
        })
    })

    return promise
}

function getFiles (data) {
    return new Promise((resolve, reject) => {
        $.get(Api.getFileList, data, function(res) {
            if (res) {
                let fileIds = []
                res.files.forEach((v) => {
                    fileIds.push(v.id)
                })
                resolve(fileIds)
            } else {
                reject(new Error('Failed'))
            }
        })
    })
}

function delteAll () {
    mmfTokens.forEach((v) => {
        let data = {
            token: v
        }
        getUserId(data).then((res) => {
            data.user = res
            getFiles(data).then((res) => {
                console.log('files', res)
                res.forEach((v) => {
                    let info = {
                        token: data.token,
                        file: v
                    }
                    $.post(Api.deleteFile, info, function(res) {
                        console.log(res)
                    })
                })
            })
        })
    })
}

$('#delete').on('click', function(event) {
    delteAll()
})
