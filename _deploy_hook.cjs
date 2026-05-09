const fs = require('fs')
const token = JSON.parse(fs.readFileSync('C:\\Users\\User\\AppData\\Roaming\\com.vercel.cli\\Data\\auth.json', 'utf8')).token
const teamId = 'team_wd1Nu0AiG4O1VLaFe8Puglm4'

fetch('https://api.vercel.com/v1/projects/prj_QNDXsZkHofsElhcxKFr2RDmZUUnl/hooks?teamId=' + teamId, {
  method: 'POST',
  headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'deploy-hook-auto', ref: 'main' })
}).then(r => r.text()).then(body => {
  console.log('RESULT:', body.slice(0, 1000))
}).catch(e => console.error('ERROR:', e.message))
