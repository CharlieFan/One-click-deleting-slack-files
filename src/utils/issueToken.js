import Jquery from 'jquery'
export default function(url, data) {
    return new Promise((resolve, reject) => {
        Jquery.post(url, data, function(res) {
            if (res.ok) {
                res = {
                    access_token: res.access_token,
                    team_id: res.team_id,
                    team_name: res.team_name,
                    user_id: res.user_id,
                }
                resolve(res)
            } else {
                reject(res.error)
            }
        })
    })
}
