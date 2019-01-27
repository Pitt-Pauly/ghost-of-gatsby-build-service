const express = require('express')
const fs = require('fs')
const sys = require('util')
const execSync = require('child_process').execSync
const app = express()
const port = 3000

const ghostBaseURL = "http://localhost";
const ghostPort = "2369"

const gitRepoURL = "git@github.com:Pitt-Pauly/spoonseeker.git"

app.post(
    '/build', 
    (req, res) => {
        console.log(`Collecting data from local Ghost instance on ${ghostBaseURL}:${ghostPort}`)
        let buildcmd = execSync("cd /home/pitt/dev/spoonseeker/gatsby; npm run build;", function(err, stdout, stderr) {
            if (err) {
                // should have err.code here?
                console.log("Failed to build Gatsby pages. Error code: ", code);
                res.send('Failed to build Gatsby pages')
              }
              console.log(stdout);
              //res.send('Building website using Gatsby.js')
        })
        res.send('Finished building Gatsby site. Ready for deployment!')
    }
)

app.post(
    '/buildnupdate', 
    (req, res) => {
        console.log(`Collecting data from local Ghost instance on ${ghostBaseURL}:${ghostPort}`)
        let buildcmd = execSync("cd /home/pitt/dev/spoonseeker/gatsby; npm run build;", function(err, stdout, stderr) {
            if (err) {
                console.log("Failed to build Gatsby pages. Error code: ", code);
                res.send('Failed to build Gatsby pages')
              }
              console.log(stdout);
        })
        console.log('Finished building Gatsby site.')

        let gitUpdate = execSync("cd /home/pitt/dev/spoonseeker/gatsby; git add .; git commit -m 'ghost of gatsby updating pages'; git push -f origin master", function(err, stdout, stderr){
            if (err) {
                console.log("Failed to push updated files to repository. Error code: ", code);
                res.send('Failed to push Gatsby pages')
              }
              console.log(stdout);
        })
        console.log('Finished pushing Gatsby site to git repository! Netlify will take over from here.')
        res.send('Successfully updated Gatsby repository!')
    }
)

app.listen(port, () => console.log(`Ghost of Gatsby - website builder listening on port ${port}!`))