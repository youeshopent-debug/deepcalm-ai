const auth = require('fs').readFileSync('C:\\Users\\User\\code\\deepcalm-ai\\.vercel\\auth.json', 'utf8')
const token = JSON.parse(auth).token

fetch('https://api.vercel.com/v1/projects/prj_QNDXsZkHofsElhcxKFr2RDmZUUnl/env/dHRF8KkGDaJDIgAh', {
  method: 'GET',
  headers: {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
})
.then(r => r.text())
.then(body => console.log('RESULT:', body.slice(0, 1000)))
.catch(e => console.error('ERROR:', e.message))
