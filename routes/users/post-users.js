const formidable = require('formidable');
const detect = require("detect-file-type");
const { v1: uuidv1 } = require('uuid')
const fs =  require('fs');
const path = require('path');
const { Db } = require('mongodb');

module.exports = (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        // console.log(`Name: ${fields.name}`)
        // console.log(`Last name: ${fields.lastName}`)
        // console.log(`Picture ${files.picture.name}`);
        // console.log(`Path ${files.picture.path}`);

        if (err) {
            return res.send('File error');
        }
        detect.fromFile(files.picture.path, (err, result) => {
            // console.log(`Result ${result.ext}`); // jpg
            const pictureName = uuidv1() + '.' + result.ext;
            const allowedImageTypes = ['jpg', 'jpeg', 'png'];  
            if(!allowedImageTypes.includes(result.ext)){
                return res.send('Image is not allowed');
            }
            
            const oldPath = files.picture.path;
            const newPath = path.join(__dirname, '..', '..', 'uploads', pictureName);
            fs.rename(oldPath, newPath, err => {
                if(err) { console.log('Can not move file.')}
                const user = {'name': fields.name, 'lastName': fields.lastName, 'picture': pictureName};
                try {
                db.collection('users').insertOne(user, (err, dbResponse) => {
                    if(err) { return res.send('Mongo cannot create user')}
                    return res.send('ok.');
                })} catch (err){
                    return res.status(500).send(err.message);
                }
            })
        })
    })
}